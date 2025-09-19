import Image from "next/image";
import supportPic from "../../../../public/images/support.webp";
import styles from "./support.module.css";

export default function Support() {
  return (
    <section className={styles.support}>
      <div className={`${styles.supportBlock} block`}>
        <div className={styles.supportGroup}>
          <div className={styles.supportColumn}>
            <h2 className={`${styles.supportTitle} title`}>
              <span>Coral Casino Contact Number Support</span>
            </h2>
            <p className={styles.supportDescription}>
              The Coral Online website and app have a dedicated help section,
              accessible to all users through the profile tab or by searching
              the Internet for &ldquo;Coral Help&ldquo;. There are also
              dedicated FAQ (frequently asked questions) articles covering a
              wide range of questions that users may have, and many of them are
              answered and helped. Main channels for getting help:
            </p>
            <ul className={styles.supportList}>
              <li className={styles.supportItem}>Telephone number.</li>
              <li className={styles.supportItem}>Email.</li>
              <li className={styles.supportItem}>Live chat 24/7.</li>
            </ul>
            <p className={styles.supportDescription}>
              If you still have questions that need answering, you can contact
              us via Live Chat, Twitter or Facebook. If you still need help, you
              can contact them by email or phone, although this may take longer
              to respond to. Coral is committed to providing users with
              excellent customer service and support.
            </p>
          </div>
          <div className={styles.supportColumn}>
            <Image
              className={styles.supportImage}
              src={supportPic}
              alt={"Coral Casino UK Support"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
