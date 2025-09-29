import React from "react";
import styles from "../history/history.module.css";
import { CommonSectionProps } from "@/app/utils/interfaces";

const CommonSection: React.FC<CommonSectionProps> = ({ data }) => {
  return (
    <section className={`${styles.history} commonSection`}>
      <div className={`${styles.historyBlock} block`}>
        <h1 className={`${styles.historyTitle} title`}>{data.title}</h1>
        <div className={`${styles.block}`}>
          {data.content.map((item, idx) => {
            if (item.type === "paragraph") {
              return (
                <p className={styles.historyDescription} key={idx}>
                  {item.text}
                </p>
              );
            } else if (item.type === "list-dotted") {
              return (
                <ul
                  key={idx}
                  className={`${styles.historyList} ${styles.historyDescription}`}
                >
                  {item.items.map((listItem, liIndex) => (
                    <li className={styles.historyItem} key={liIndex}>
                      {listItem}
                    </li>
                  ))}
                </ul>
              );
            } else if (item.type === "list-number") {
              return (
                <ol
                  key={idx}
                  className={`${styles.historyList} ${styles.historyDescription}`}
                >
                  {item.items.map((listItem, liIndex) => (
                    <li className={styles.historyItem} key={liIndex}>
                      {listItem}
                    </li>
                  ))}
                </ol>
              );
            } else {
              return null;
            }
          })}
        </div>
        <div
          className={`${styles.lastBlock} ${data.sections.length > 1 ? "listBlock" : ""} lastBlock gap-64`}
        >
          {data.sections.map((elem, index) => (
            <div className={"lastBlockElement"} key={index}>
              <h2 className={`${styles.historyTitle} title`}>{elem.heading}</h2>
              {elem.content.map((item, idx) => {
                if (item.type === "paragraph") {
                  return (
                    <p className={styles.historyDescription} key={idx}>
                      {item.text}
                    </p>
                  );
                } else if (item.type === "list-dotted") {
                  return (
                    <ul
                      key={idx}
                      className={`${styles.historyList} ${styles.historyDescription}`}
                    >
                      {item.items.map((listItem, liIndex) => (
                        <li className={styles.historyItem} key={liIndex}>
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  );
                } else if (item.type === "list-number") {
                  return (
                    <ol
                      key={idx}
                      className={`${styles.historyList} ${styles.historyDescription}`}
                    >
                      {item.items.map((listItem, liIndex) => (
                        <li className={styles.historyItem} key={liIndex}>
                          {listItem}
                        </li>
                      ))}
                    </ol>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommonSection;
