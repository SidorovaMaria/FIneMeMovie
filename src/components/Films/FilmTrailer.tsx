import React, { useEffect, useState } from "react";

// Function to fetch trailer data from the Kinopoisk API
const fetchTrailerUrl = async (filmId: string): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}/videos`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": "bb37148a-7984-45c1-8c5b-2cc68fab3072", // Replace with your API key
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data.items);

    // Look for trailer URLs in the API response
    const trailer = data.items?.[2]?.url;
    console.log(trailer); // Get the first trailer URL
    return trailer || null; // Return null if no trailer is found
  } catch (error) {
    console.error("Error fetching trailer data:", error);
    return null;
  }
};

const TrailerWidget = ({ filmId }: { filmId: string }) => {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch trailer URL when the component mounts or when filmId changes
  useEffect(() => {
    const getTrailer = async () => {
      const url = await fetchTrailerUrl(filmId);
      setTrailerUrl(url);
      setLoading(false);
    };

    getTrailer();
  }, [filmId]);

  // Render loading state while waiting for the trailer URL
  if (loading) {
    return <div>Loading trailer...</div>;
  }

  // Render iframe with the trailer URL, if found
  if (!trailerUrl) {
    return <div>No trailer found for this film.</div>;
  }

  // Dynamically render the iframe based on the trailer URL type
  return (
    <div>
      {trailerUrl.includes("youtube.com") ? (
        <iframe
          width="500"
          height="500"
          src={trailerUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={`Trailer for film ${filmId}`}
        />
      ) : trailerUrl.includes("kinopoisk.ru") ? (
        <iframe
          is="x-frame-bypass"
          src="https://widgets.kinopoisk.ru/discovery/trailer/167560?onlyPlayer=1&autoplay=1&cover=1"
          width="500"
          height="500"
          title={`Trailer for film ${filmId}`}
        />
      ) : (
        <div>Unsupported trailer URL format</div>
      )}
    </div>
  );
};

export default TrailerWidget;
