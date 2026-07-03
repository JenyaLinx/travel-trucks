"use client";

import { FormEvent, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import {
  createBookingRequest,
  getCamperById,
  getCamperReviews,
} from "@/services/campers";
import styles from "./CamperDetailsPage.module.css";

export default function CamperDetailsPage() {
  const { camperId } = useParams<{ camperId: string }>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { data: camper, isLoading, isError } = useQuery({
    queryKey: ["camper", camperId],
    queryFn: () => getCamperById(camperId),
    enabled: Boolean(camperId),
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["camper-reviews", camperId],
    queryFn: () => getCamperReviews(camperId),
    enabled: Boolean(camperId),
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await createBookingRequest(camperId, { name, email });
      toast.success("Booking request sent successfully");
      setName("");
      setEmail("");
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (isLoading) return <main className={styles.center}>Loading camper...</main>;
  if (isError || !camper) return <main className={styles.center}>Camper not found.</main>;

  const mainImage = camper.gallery?.[0]?.original || camper.coverImage;
  const thumbs = camper.gallery?.slice(0, 4) ?? [];

  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.leftColumn}>
          <section>
            <img src={mainImage} alt={camper.name} className={styles.mainImage} />

            <ul className={styles.thumbs}>
              {thumbs.map((image) => (
                <li key={image.id}>
                  <img src={image.thumb} alt={camper.name} />
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.reviewsBlock}>
            <h2 className={styles.reviewsTitle}>Reviews</h2>

            <ul className={styles.reviewsList}>
              {reviews.map((review) => (
                <li key={review.id} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.avatar}>{review.reviewer_name[0]}</div>

                    <div>
                      <h3>{review.reviewer_name}</h3>
                      <div className={styles.stars}>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <FaStar
                            key={index}
                            className={
                              index < review.reviewer_rating
                                ? styles.starActive
                                : styles.starInactive
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className={styles.comment}>{review.comment}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className={styles.rightColumn}>
          <section className={styles.infoCard}>
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
          </section>

          <section className={styles.vehicleCard}>
            <h2 className={styles.sectionTitle}>Vehicle details</h2>

            <ul className={styles.badges}>
              <li>{camper.transmission}</li>
              <li>AC</li>
              <li>{camper.engine}</li>
              {camper.amenities?.slice(0, 3).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className={styles.table}>
              <p><span>Form</span><span>{camper.form}</span></p>
              <p><span>Length</span><span>{camper.length}</span></p>
              <p><span>Width</span><span>{camper.width}</span></p>
              <p><span>Height</span><span>{camper.height}</span></p>
              <p><span>Tank</span><span>{camper.tank}</span></p>
              <p><span>Consumption</span><span>{camper.consumption}</span></p>
            </div>
          </section>

          <form className={styles.formCard} onSubmit={handleSubmit}>
            <h2>Book your campervan now</h2>
            <p>Stay connected! We are always ready to help you.</p>

            <input
              type="text"
              placeholder="Name*"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <input
              type="email"
              placeholder="Email*"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </main>
  );
}