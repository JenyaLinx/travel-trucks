import styles from "./Loader.module.css";

type LoaderProps = {
  title?: string;
  text?: string;
};

export default function Loader({
  title = "Loading tracks...",
  text = "Please wait while we fetch the best travel trucks for you",
}: LoaderProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <div className={styles.spinner}></div>

        <p className={styles.title}>{title}</p>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
}