export async function fetchGraphQL(
  query: string,
  preview = false,
  variables?: Record<string, any>,
): Promise<any> {
  // For client-side requests, use our API route
  if (typeof window !== "undefined") {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/contentful`;

      console.log("Calling Contentful via API route:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, preview, variables }),
      });

      if (!response.ok) {
        console.error(
          "API response not OK:",
          response.status,
          response.statusText,
        );
        throw new Error(`API response error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error in fetchGraphQL client-side:", error);
      throw error;
    }
  }

  // For server-side requests, use direct Contentful API
  const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const token = preview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

  if (!spaceId) {
    console.error("Environment variables:", {
      spaceId: !!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
      hasAccessToken: !!process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
      hasPreviewToken: !!process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    });
    throw new Error("Contentful Space ID is not available");
  }

  if (!token) {
    console.error("Environment variables:", {
      spaceId: !!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
      hasAccessToken: !!process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
      hasPreviewToken: !!process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    });
    throw new Error("Access token is not available");
  }

  console.log(
    "Using token (server-side):",
    token.substring(0, 5) + "..." + token.substring(token.length - 5),
  );

  try {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${spaceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query, variables }),
      },
    );

    if (!response.ok) {
      console.error(
        "Contentful API error:",
        response.status,
        response.statusText,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
