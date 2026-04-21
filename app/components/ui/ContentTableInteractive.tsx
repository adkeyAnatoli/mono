'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import tableStyles from './contentTable.module.css';
import styles from './contentTableInteractive.module.css';
import 'swiper/css';

const MOBILE_MQ = '(max-width: 768px)';
const COLLAPSE_ROW_THRESHOLD = 3;

type Props = {
  headers: string[];
  rows: string[][];
  tableVariant?: 'twoColumn' | 'multiColumn';
};

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return isMobile;
}

function RowSlide({ row, headers }: { row: string[]; headers: string[] }) {
  if (row.length === 2) {
    return (
      <div className={styles.slideCard}>
        <div className={styles.slideTab}>{row[0]}</div>
        <div className={styles.slideBody}>{row[1]}</div>
      </div>
    );
  }

  if (row.length === 1) {
    return (
      <div className={styles.slideCard}>
        <div className={styles.slideBody}>{row[0]}</div>
      </div>
    );
  }

  return (
    <div className={styles.slideCard}>
      <div className={styles.slideTab}>{row[0]}</div>
      <div className={styles.slideStack}>
        {row.slice(1).map((cell, i) => (
          <div key={i} className={styles.slideStackRow}>
            {headers[i + 1] ? (
              <div className={styles.slideLabel}>{headers[i + 1]}</div>
            ) : null}
            <div className={styles.slideValue}>{cell}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContentTableInteractive({
  headers,
  rows,
  tableVariant,
}: Props) {
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);
  const resolvedTableVariant =
    tableVariant ?? (headers.length === 2 ? 'twoColumn' : 'multiColumn');
  const tableVariantClass =
    resolvedTableVariant === 'twoColumn'
      ? tableStyles.tableTwoColumn
      : tableStyles.tableMultiColumn;

  const needsCollapse = rows.length > COLLAPSE_ROW_THRESHOLD;
  const visibleRows =
    needsCollapse && !expanded ? rows.slice(0, COLLAPSE_ROW_THRESHOLD) : rows;

  if (isMobile) {
    return (
      <div className={styles.carouselWrap}>
        <Swiper
          className={styles.swiper}
          watchOverflow
          loop={false}
          rewind={false}
          spaceBetween={12}
          slidesPerView="auto"
        >
          {rows.map((row, rIdx) => (
            <SwiperSlide key={rIdx} className={styles.slide}>
              <RowSlide row={row} headers={headers} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  return (
    <div className={tableStyles.wrap}>
      <table className={`${tableStyles.table} ${tableVariantClass}`}>
        <thead>
          <tr>
            {headers.map((h, hIdx) => (
              <th key={hIdx}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map((cell, cIdx) => (
                <td key={cIdx}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {needsCollapse ? (
        <button
          type="button"
          className={`${styles.toggleBtn}${expanded ? ` ${styles.toggleBtnExpanded}` : ''}`}
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
        >
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      ) : null}
    </div>
  );
}
