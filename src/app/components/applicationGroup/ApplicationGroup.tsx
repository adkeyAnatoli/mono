import Application from "../application/Application";
import styles from "./application-group.module.css";

export default function ApplicationGroup() {
  return (
    <div className={styles.applicationCircleContainer}>
      <Application />
    </div>
  );
}
