"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { getCamperById } from "@/services/campers";
import styles from "./CamperDetailsPage.module.css";

export default function CamperDetailsPage() {
  const params = useParams<{ camperId: string }>();
  const camperId = params.camperId;

  const { data: camper, isLoading, isError } = useQuery({
    queryKey: ["camper", camperId],
    queryFn: () => getCamperById(camperId),
    enabled: Boolean(camperId),
  });

  if (isLoading) {
    return <main className={styles.center}>Loading camper...</main>;
  }

  if (isError || !camper) {
    return <main className={styles.center}>Camper not found.</main>;
  }

  return (
    <main className={styles.page}>
      <section className={styles.top}>
        <div className={styles.gallery}>
          {camper.gallery?.slice(0, 4).map((image) => (
            <img
              key={image.id}
              src={image.original}
              alt={camper.name}
              className={styles.galleryImage}
            />
          ))}
        </div>

        <div className={styles.infoCard}>
          <h1 className={styles.title}>{camper.name}</h1>

          <div className={styles.meta}>
            <span className={styles.rating}>
              <FaStar />
              {camper.rating}({camper.totalReviews} Reviews)
            </span>

            <span className={styles.location}>
              <FaMapMarkerAlt />
              {camper.location}
            </span>
          </div>

          <p className={styles.price}>€{camper.price}</p>

          <p className={styles.description}>{camper.description}</p>
        </div>
      </section>

      <section className={styles.detailsSection}>
        <div className={styles.vehicleCard}>
          <h2 className={styles.sectionTitle}>Vehicle details</h2>

          <ul className={styles.badges}>
            <li>{camper.transmission}</li>
            <li>AC</li>
            <li>{camper.engine}</li>
            {camper.amenities?.slice(0, 3).map((amenity) => (
              <li key={amenity}>{amenity}</li>
            ))}
          </ul>

          <div className={styles.table}>
            <p>
              <span>Form</span>
              <span>{camper.form}</span>
            </p>
            <p>
              <span>Length</span>
              <span>{camper.length}</span>
            </p>
            <p>
              <span>Width</span>
              <span>{camper.width}</span>
            </p>
            <p>
              <span>Height</span>
              <span>{camper.height}</span>
            </p>
            <p>
              <span>Tank</span>
              <span>{camper.tank}</span>
            </p>
            <p>
              <span>Consumption</span>
              <span>{camper.consumption}</span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}