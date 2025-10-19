import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Only allow POST method
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { query, preview = false } = req.body;

        if (!query) {
            return res.status(400).json({ message: 'Query is required' });
        }

        const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
        const token = preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

        if (!spaceId) {
            return res.status(500).json({ message: 'Contentful Space ID is not available' });
        }

        if (!token) {
            return res.status(500).json({ message: 'Access token is not available' });
        }

        const response = await fetch(
            `https://graphql.contentful.com/content/v1/spaces/${spaceId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ query }),
            }
        );

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error('API route error:', error);
        return res.status(500).json({ message: 'Internal server error', error: String(error) });
    }
}
