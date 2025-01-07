"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ArtistPage = () => {
  const params = useParams();
  const artistId = params.artistId as string;
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    if (artistId) {
      const fetchArtist = async () => {
        // Your fetch logic here
      };

      fetchArtist();
    }
  }, [artistId]);

  if (!artist) return <div>Loading...</div>;

  return (
    <div>
      <h1>{"artist.name"}</h1>
      <p>{"artist.bio"}</p>
    </div>
  );
};

export default ArtistPage;
