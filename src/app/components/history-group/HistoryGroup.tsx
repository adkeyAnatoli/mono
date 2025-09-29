import History from "../history/History";
import styles from "./history-group.module.css";

export default function HistoryGroup() {
  return (
    <div className={styles.historyCircleContainer}>
      <History />
    </div>
  );
}
