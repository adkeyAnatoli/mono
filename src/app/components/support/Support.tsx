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
              <span>Support: Crown Casino News and Updates</span>
            </h2>
            <p className={styles.supportDescription}>
              Crown Casino offers a plethora of client support options to help
              users with any questions or issues they may encounter on the
              service. Crown Casino offers a live talk feature that allows users
              to chat with client support agents in real time. This feature is
              available 24/7 and is the quickest and most efficient way to get
              help. users can also contact client support via email. The client
              support team aims to respond to all emails within 24 hours. Crown
              Casino also offers a phone support option for users. The phone
              number for client support can be found on the service&apos;s
              &ldquo;Contact Us&ldquo; page. The service also has a
              comprehensive FAQ section that provides answers to commonly asked
              questions about the service, like topics such as profile
              registration, deposits and withdrawals, and game rules.
            </p>
          </div>
          <div className={styles.supportColumn}>
            <Image
              className={styles.supportImage}
              src={supportPic}
              alt={"Crown Casino Melbourne Online Support"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
