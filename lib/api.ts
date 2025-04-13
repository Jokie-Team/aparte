export async function fetchGraphQL(
  query: string,
  preview = false,
  variables?: Record<string, any>
): Promise<any> {
  const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const token = preview
    ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

  if (!spaceId) {
    console.error('Environment variables:', {
      spaceId: !!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
      hasAccessToken: !!process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
      hasPreviewToken: !!process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
    });
    throw new Error('Contentful Space ID is not available');
  }

  if (!token) {
    console.error('Environment variables:', {
      spaceId: !!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
      hasAccessToken: !!process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
      hasPreviewToken: !!process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
    });
    throw new Error('Access token is not available');
  }

  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${spaceId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables }),
    }
  ).then((response) => response.json());
}
