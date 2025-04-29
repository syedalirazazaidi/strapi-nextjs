import { Banner, Feature, StrapiResponse } from "../types/strapi";

export async function fetchFeatures(): Promise<Feature[]> {
  try {
    const response = await fetch(
      `https://abc.pehlighiza.akdndhrc.com/api/features?populate=*`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(process.env.STRAPI_API_TOKEN && {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          }),
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch features");

    const result: StrapiResponse<Feature & { features_name: string }> =
      await response.json();
    return result.data.map((item) => ({
      id: item.id,
      title: item.features_name,
    }));
  } catch (error) {
    console.error("Error fetching features:", error);
    return [];
  }
}

export async function fetchBanner(): Promise<Banner | null> {
  try {
    const response = await fetch(
      `https://abc.pehlighiza.akdndhrc.com/api/banners?populate=*`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(process.env.STRAPI_API_TOKEN && {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          }),
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch banner");

    const result: StrapiResponse<Banner> = await response.json();
    return result.data[0] || null;
  } catch (error) {
    console.error("Error fetching banner:", error);
    return null;
  }
}
