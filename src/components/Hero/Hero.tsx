import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/hero.jpg"
        alt="Camper van near the lake"
        fill
        priority
        className={styles.image}
      />

      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>Campers of your dreams</h1>

        <p className={styles.subtitle}>
          You can find everything you want in our catalog
        </p>

        <Link href="/catalog" className={styles.button}>
          View Now
        </Link>
      </div>
    </section>
  );
}