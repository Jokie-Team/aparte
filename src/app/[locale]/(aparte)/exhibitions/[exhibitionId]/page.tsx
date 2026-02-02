"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const revalidate = 1800;

const ExhibitionPage = () => {
  const params = useParams();
  const exhibitionId = params?.exhibitionId as string;
  const [exhibition, setExhibition] = useState(null);

  useEffect(() => {
    if (exhibitionId) {
      const fetchExhibition = async () => {
        // Your fetch logic here
      };

      fetchExhibition();
    }
  }, [exhibitionId]);

  if (!exhibition) return <div>Loading...</div>;

  return (
    <div>
      <h1>{"exhibition.name"}</h1>
      <p>{"exhibition.description"}</p>
    </div>
  );
};

export default ExhibitionPage;
