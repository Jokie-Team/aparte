import React from "react";
import Carousel from "@/src/components/carousel";
import { getTranslations } from "next-intl/server";

const Exhibitions = async () => {
  const t = await getTranslations("exhibitions");

  const images = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ];

  return (
    <div>
      <h1>{t("title")}</h1>
      <Carousel images={images} visibleCount={6} />
    </div>
  );
};

export default Exhibitions;
