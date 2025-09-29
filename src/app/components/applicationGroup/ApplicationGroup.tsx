import License from "../license/License";
import styles from "./application-group.module.css";

export default function ApplicationGroup() {
  return (
    <div className={styles.applicationCircleContainer}>
      <License />
    </div>
  );
}
