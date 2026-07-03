import { FaStar, FaMapMarkerAlt, FaGasPump, FaCogs } from "react-icons/fa";
import { BsGrid1X2Fill } from "react-icons/bs";
import type { CamperListItem } from "@/types/camper";
import styles from "./CamperCard.module.css";

type CamperCardProps = {
  camper: CamperListItem;
};

export default function CamperCard({ camper }: CamperCardProps) {
  const detailsUrl = `/catalog/${camper.id}`;

  return (
    <article className={styles.card}>
      <img src={camper.coverImage} alt={camper.name} className={styles.image} />

      <div className={styles.content}>
        <div className={styles.top}>
          <a
  href={detailsUrl}
  target="_blank"
  rel="noopener noreferrer"
  className={styles.titleLink}
>
  <h2 className={styles.title}>{camper.name}</h2>
</a>
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

        <a
          href={detailsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          Show more
        </a>
      </div>
    </article>
  );
}