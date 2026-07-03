"use client";

import { useState } from "react";
import type { CamperImage } from "@/types/camper";
import styles from "./CamperGallery.module.css";

type CamperGalleryProps = {
  images: CamperImage[];
  fallbackImage: string;
  alt: string;
};

export default function CamperGallery({
  images,
  fallbackImage,
  alt,
}: CamperGalleryProps) {
  const gallery = images?.length ? images : [];
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = gallery[activeIndex]?.original || fallbackImage;

  return (
    <div className={styles.gallery}>
      <img src={activeImage} alt={alt} className={styles.mainImage} />

      <ul className={styles.thumbs}>
        {gallery.slice(0, 4).map((image, index) => (
          <li key={image.id}>
            <button
              type="button"
              className={`${styles.thumbButton} ${
                activeIndex === index ? styles.active : ""
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <img src={image.thumb} alt={alt} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}