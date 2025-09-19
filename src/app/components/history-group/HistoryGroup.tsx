import Connect from "../connect/Connect";
import History from "../history/History";
import Idioms from "../idiomas/Idioms";
import styles from "./history-group.module.css";

export default function HistoryGroup() {
  return (
    <div className={styles.historyCircleContainer}>
      <History />
      <Idioms />
      <Connect />
    </div>
  );
}
