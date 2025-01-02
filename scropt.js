const contentfulManagement = require('contentful-management');
const fs = require('fs');
const csv = require('csv-parser');

// Replace with your credentials
const SPACE_ID = 'g6yml8rro5y7';
const ENVIRONMENT_ID = 'master'; // Typically 'master'
const ACCESS_TOKEN = 'CFPAT-5J5xfpHneg0JOhIw4f6C9tzGil0ZELf3pPIE1cVdWew';

// Content type IDs
const CONTENT_TYPE_ID = 'exhibition';
const ARTIST_CONTENT_TYPE_ID = 'artist';

// Utility to add delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Create or find an artist entry
async function findOrCreateArtist(name, environment) {
    const entries = await environment.getEntries({
        content_type: ARTIST_CONTENT_TYPE_ID,
        'fields.name': name,
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
async function checkDuplicateExhibition(title, startDate, environment) {
    const entries = await environment.getEntries({
        content_type: CONTENT_TYPE_ID,
        'fields.title': title,
        'fields.startDate': startDate,
    });

    return entries.items.length > 0;
}

// Map CSV columns to Contentful fields
async function mapCsvToContentfulFields(row, environment) {
    const artistNames = row['Artista(s)'].split(',').map((name) => name.trim());

    // Create or fetch artist entries
    const artistRefs = [];
    for (const name of artistNames) {
        const artistId = await findOrCreateArtist(name, environment);
        artistRefs.push({ sys: { type: 'Link', linkType: 'Entry', id: artistId } });
    }

    return {
        fields: {
            title: { 'en-US': row['Nome Exposição'] },
            description: { 'en-US': row['Texto'] },
            artists: { 'en-US': artistRefs },
            startDate: { 'en-US': new Date(row['Data de Início']).toISOString() },
            endDate: { 'en-US': new Date(row['Data de Fim']).toISOString() },
        },
    };
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

// Import CSV data to Contentful
async function importCsvToContentful() {
    const client = contentfulManagement.createClient({
        accessToken: ACCESS_TOKEN,
    });

    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT_ID);

    const rows = [];
    fs.createReadStream('exhibitions.csv')
        .pipe(csv())
        .on('data', (row) => {
            rows.push(row);
        })
        .on('end', async () => {
            console.log('CSV file read completed.');

            const batchSize = 10; // Number of rows per batch
            for (let i = 0; i < rows.length; i += batchSize) {
                const batch = rows.slice(i, i + batchSize);
                for (const row of batch) {
                    try {
                        const fields = await mapCsvToContentfulFields(row, environment);

                        // Check for duplicates before creating a new entry
                        const duplicate = await checkDuplicateExhibition(
                            fields.fields.title['en-US'],
                            fields.fields.startDate['en-US'],
                            environment
                        );
                        if (duplicate) {
                            console.log(`Skipping duplicate exhibition: ${fields.fields.title['en-US']}`);
                            continue;
                        }

                        const entry = await createEntryWithRetry(environment, fields);
                        console.log(`Created exhibition entry: ${entry.sys.id}`);
                    } catch (error) {
                        console.error('Error creating entry:', error.message);
                    }
                    // Add delay to avoid rate limit
                    await sleep(1500);
                }
                console.log(`Batch ${i / batchSize + 1} processed.`);
                await sleep(5000); // Delay between batches
            }
            console.log('CSV import completed.');
        });
}

// Run the script
importCsvToContentful();
