
"use client";
import { useState, useEffect } from "react";

interface Feature {
  id: number;
  title: string;
}

interface Banner {
  id: number;
  documentId: string;
  text: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export default function Home() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [banner, setBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch(
          `/api/features?populate=*`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(process.env.STRAPI_API_TOKEN && {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
              }),
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch features: ${response.statusText}`);
        }
        const result: StrapiResponse<Feature & { features_name: string }> =
          await response.json();
        const fetchedFeatures = result.data.map((item) => ({
          id: item.id,
          title: item.features_name, 
        }));
        setFeatures(fetchedFeatures);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchFeatures();
  }, []);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch(
          `/api/banners?populate=*`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(process.env.STRAPI_API_TOKEN && {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
              }),
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch banner: ${response.statusText}`);
        }
        const result: StrapiResponse<Banner> = await response.json();
        setBanner(result.data[0] || null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 flex-col">
        <p>Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-pink-800 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (features.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No features available.
      </div>
    );
  }

  const descriptionParagraphs = banner?.description
    ? banner.description.split("\n").filter((line) => line.trim() !== "")
    : [
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Ipsa cupiditate accusantium recusandae soluta explicabo hic!",
      ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {banner?.text}
        </h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">
          {banner?.title}
        </h2>
        <div className="text-gray-500 max-w-4xl mx-auto px-4">
          {descriptionParagraphs.map((paragraph, index) => (
            <p key={index} className="mb-2">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-60">
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          <div className="absolute top-10 left-0 w-48 h-48 md:w-80 md:h-80 z-50 bg-pink-900 opacity-70 rounded-full flex flex-col items-center justify-center p-4">
            <p className="text-white text-md font-semibold text-center">
              INDUSTRY EXPERTS
            </p>
            <p className="text-white text-sm text-start mt-2">
              Lorem ipsum dolor sit amet adipiscing elit. Quas dolores nam ipsum
              odit quod fuga numquam hic quol!
            </p>
          </div>
          <div className="absolute top-10 left-24 md:left-40 w-48 h-48 md:w-80 md:h-80 z-40 bg-gray-300 opacity-50 rounded-full"></div>
        </div>

        <div className="flex flex-col gap-6 mt-4 items-center justify-center h-auto md:h-80">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`flex items-center px-6 py-2 rounded-full cursor-pointer w-72 md:w-96 ${
                index === currentFeature
                  ? "bg-pink-800 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setCurrentFeature(index)}
            >
              <button
                onClick={prevFeature}
                className="text-xl"
                disabled={index !== currentFeature}
              >
                {"<"}
              </button>
              <div className="flex-1 flex justify-end items-center gap-2">
                <span className="text-md font-bold">{feature.title}</span>
                <button
                  onClick={nextFeature}
                  className="text-xl"
                  disabled={index !== currentFeature}
                >
                  {">"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}