"use client";

import { FormEvent, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaExclamationCircle, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { LuMap } from "react-icons/lu";

import CamperGallery from "@/components/CamperGallery";
import Loader from "@/components/Loader";
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
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

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

    let hasError = false;

    const fullNameRegex =
      /^[A-Za-zА-Яа-яІіЇїЄєҐґ'-]+\s+[A-Za-zА-Яа-яІіЇїЄєҐґ'-]+$/;

    if (!name.trim() || !fullNameRegex.test(name.trim())) {
      setNameError("Please enter your name.");
      hasError = true;
    } else {
      setNameError("");
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter your email.");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (hasError) return;

    try {
      await createBookingRequest(camperId, { name, email });
      toast.success("Booking request sent successfully");
      setName("");
      setEmail("");
      setNameError("");
      setEmailError("");
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (isLoading) {
    return (
      <Loader
        title="Loading camper..."
        text="Please wait while we fetch camper details."
      />
    );
  }

  if (isError || !camper) {
    return <main className={styles.center}>Camper not found.</main>;
  }

  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.leftColumn}>
          <CamperGallery
            images={camper.gallery}
            fallbackImage={camper.coverImage}
            alt={camper.name}
          />

          <section className={styles.reviewsBlock}>
            <h2 className={styles.reviewsTitle}>Reviews</h2>

            <ul className={styles.reviewsList}>
              {reviews.map((review) => (
                <li key={review.id} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.avatar}>
                      {review.reviewer_name[0]}
                    </div>

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
          </section>

          <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
  <h2>Book your campervan now</h2>
 <p className={styles.formDescription}>
  Stay connected! We are always ready to help you.
</p>

  <div
    className={`${styles.inputWrapper} ${
      nameError ? styles.hasError : ""
    }`}
  >
    {nameError && <span className={styles.inputLabel}>Name*</span>}

    <input
      type="text"
      placeholder="Name*"
      value={name}
      className={nameError ? styles.inputError : ""}
      onChange={(event) => {
        setName(event.target.value);
        setNameError("");
      }}
    />

    {nameError && <FaExclamationCircle className={styles.errorIcon} />}
  </div>

  {nameError && <p className={styles.errorText}>Please enter your name.</p>}

  <div
    className={`${styles.inputWrapper} ${
      emailError ? styles.hasError : ""
    }`}
  >
    {emailError && <span className={styles.inputLabel}>Email*</span>}

    <input
      type="email"
      placeholder="Email*"
      value={email}
      className={emailError ? styles.inputError : ""}
      onChange={(event) => {
        setEmail(event.target.value);
        setEmailError("");
      }}
    />

    {emailError && <FaExclamationCircle className={styles.errorIcon} />}
  </div>

  {emailError && <p className={styles.errorText}>Please enter your email.</p>}

  <button type="submit">Send</button>
</form>
        </div>
      </div>
    </main>
  );
}