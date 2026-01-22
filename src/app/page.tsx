import styles from "./page.module.css";
import en from "../locales/en.json";

export default function Home() {
  return <div className={styles.profile}>{en.profile.content}</div>;
}
