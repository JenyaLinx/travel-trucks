import Image from "next/image";
import Link from "next/link";
import { FaCogs, FaGasPump, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { BsGrid1X2Fill } from "react-icons/bs";
import type { CamperListItem } from "@/types/camper";
import styles from "./CamperCard.module.css";

type CamperCardProps = {
  camper: CamperListItem;
};

export default function CamperCard({ camper }: CamperCardProps) {
  const detailsUrl = `/catalog/${camper.id}`;

  return (
    <li className={styles.card}>
      <Image
        src={camper.coverImage}
        alt={camper.name}
        width={292}
        height={219}
        className={styles.image}
      />

      <div className={styles.content}>
        <div className={styles.top}>
          <Link href={detailsUrl} className={styles.titleLink}>
            <h2 className={styles.title}>{camper.name}</h2>
          </Link>

          <p className={styles.price}>€{camper.price}</p>
        </div>

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

        <p className={styles.description}>
          The pictures shown here are example vehicles of the respective...
        </p>

        <ul className={styles.badges}>
          <li>
            <FaGasPump />
            {camper.engine}
          </li>

          <li>
            <FaCogs />
            {camper.transmission}
          </li>

          <li>
            <BsGrid1X2Fill />
            {camper.form}
          </li>
        </ul>

        <Link href={detailsUrl} className={styles.button}>
          Show more
        </Link>
      </div>
    </li>
  );
}