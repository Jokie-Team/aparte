const contentfulManagement = require('contentful-management');
const XLSX = require('xlsx');

// Replace with your credentials
const SPACE_ID = 'g6yml8rro5y7';
const ENVIRONMENT_ID = 'master'; // Typically 'master'
const ACCESS_TOKEN = 'CFPAT-5J5xfpHneg0JOhIw4f6C9tzGil0ZELf3pPIE1cVdWew';

// Content type IDs
const CONTENT_TYPE_ID = 'exhibition';
const ARTIST_CONTENT_TYPE_ID = 'artist';

// Utility to normalize strings (ignore accents, case, etc.)
function normalizeString(str) {
    return str
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase();
}

// Utility to add delay
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Create or find an artist entry
async function findOrCreateArtist(name, environment) {
    const normalizedName = normalizeString(name);
    const entries = await environment.getEntries({
        content_type: ARTIST_CONTENT_TYPE_ID,
        'fields.name[match]': normalizedName,
    });

    if (entries.items.length > 0) {
        console.log(`Found existing artist: ${entries.items[0].sys.id}`);
        return entries.items[0].sys.id;
    } else {
        const entry = await environment.createEntry(ARTIST_CONTENT_TYPE_ID, {
            fields: {
                name: { 'en-US': name },
            },
        });
        console.log(`Created artist: ${entry.sys.id}`);
        return entry.sys.id;
    }
}

// Check for duplicate exhibition
async function findDuplicateExhibition(title, startDate, environment) {
    const normalizedTitle = normalizeString(title);
    const entries = await environment.getEntries({
        content_type: CONTENT_TYPE_ID,
    });

    return entries.items.find((entry) => {
        const entryTitle = normalizeString(entry.fields.title['en-US']);
        const entryDate = entry.fields.startDate['en-US'];
        return entryTitle === normalizedTitle && entryDate === startDate;
    });
}

// Map Excel data to Contentful fields
async function mapExcelToContentfulFields(row, environment) {
    const artistNames = row['Artista(s)']
        ? row['Artista(s)'].split(',').map((name) => name.trim())
        : [];

    // Create or fetch artist entries
    const artistRefs = [];
    for (const name of artistNames) {
        if (name) {
            const artistId = await findOrCreateArtist(name, environment);
            artistRefs.push({ sys: { type: 'Link', linkType: 'Entry', id: artistId } });
        }
    }

    return {
        fields: {
            title: { 'en-US': row['Nome Exposição'] || 'Título não definido' },
            description: { 'en-US': row['Texto'] || '' },
            artists: { 'en-US': artistRefs },
            startDate: {
                'en-US': row['Data de Início']
                    ? new Date(row['Data de Início']).toISOString()
                    : null,
            },
            endDate: {
                'en-US': row['Data de Fim']
                    ? new Date(row['Data de Fim']).toISOString()
                    : null,
            },
        },
    };
}

// Update an existing exhibition
async function updateExhibition(entry, fields, environment) {
    entry.fields.description = fields.fields.description;
    entry.fields.artists = fields.fields.artists;
    try {
        const updatedEntry = await entry.update();
        await updatedEntry.publish();
        console.log(`Updated exhibition: ${updatedEntry.sys.id}`);
    } catch (error) {
        console.error(`Error updating exhibition: ${error.message}`);
    }
}

// Create entry with retry logic for rate limits
async function createEntryWithRetry(environment, fields, retries = 3) {
    let attempts = 0;
    while (attempts < retries) {
        try {
            const entry = await environment.createEntry(CONTENT_TYPE_ID, fields);
            return entry;
        } catch (error) {
            if (error.status === 429) {
                console.warn(`Rate limit hit. Retrying in ${1500 * (attempts + 1)}ms...`);
                await sleep(1500 * (attempts + 1)); // Exponential backoff
                attempts++;
            } else {
                throw error;
            }
        }
    }
    throw new Error('Failed to create entry after multiple attempts due to rate limits.');
}

// Import Excel data to Contentful
async function importExcelToContentful() {
    const client = contentfulManagement.createClient({
        accessToken: ACCESS_TOKEN,
    });

    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT_ID);

    // Read data from Excel file
    const workbook = XLSX.readFile('exhibitions.xlsx');
    const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    console.log('Excel file read completed.');

    const batchSize = 10; // Number of rows per batch
    for (let i = 0; i < rows.length; i += batchSize) {
        const batch = rows.slice(i, i + batchSize);
        for (const row of batch) {
            try {
                const fields = await mapExcelToContentfulFields(row, environment);

                // Check for duplicates before creating a new entry
                const duplicate = await findDuplicateExhibition(
                    fields.fields.title['en-US'],
                    fields.fields.startDate['en-US'],
                    environment
                );
                if (duplicate) {
                    console.log(`Updating existing exhibition: ${fields.fields.title['en-US']}`);
                    await updateExhibition(duplicate, fields, environment);
                    continue;
                }

                const entry = await createEntryWithRetry(environment, fields);
                console.log(`Created exhibition entry: ${entry.sys.id}`);
            } catch (error) {
                console.error('Error creating/updating entry:', error.message);
            }
            // Add delay to avoid rate limit
            await sleep(1500);
        }
        console.log(`Batch ${i / batchSize + 1} processed.`);
        await sleep(5000); // Delay between batches
    }
    console.log('Excel import completed.');
}

// Run the script
importExcelToContentful();
