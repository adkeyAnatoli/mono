import styles from './table.module.css';

interface TableWideProps {
  columns: string[];
  rows: string[][];
  bonusesMobileBg?: boolean;
}

export default function TableWide({
  columns,
  rows,
  bonusesMobileBg = false,
}: TableWideProps) {
  const otherColumns = columns.slice(1);

  const zebraDesktop = columns.length >= 3;

  return (
    <>
      <table
        className={`${styles.table} ${styles.tableWide} ${styles.desktopWide}${
          zebraDesktop ? ` ${styles.tableWideZebra}` : ''
        }`}
      >
        <thead>
          <tr className={`${styles.tableRow} ${styles.tableHeadRow}`}>
            {columns.map((column, ci) => (
              <th
                className={`${styles.tableCell} ${styles.tableHeadCell}`}
                key={`h-${column}-${ci}`}
                scope="col"
              >
                <p className={styles.tableText}>{column}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr className={styles.tableRow} key={`row-${index}`}>
              {columns.map((column, ci) => (
                <td className={styles.tableCell} key={`cell-${column}-${ci}`}>
                  <p className={styles.tableText}>{row[ci] ?? ''}</p>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.mobileWide}>
        {rows.map((row, index) => (
          <div
            className={styles.mobileWideRow}
            key={`${row[0] ?? ''}-mobile-${index}`}
          >
            <div className={styles.mobileWideMethod}>
              <p className={styles.tableText}>{row[0] ?? ''}</p>
            </div>
            {otherColumns.map((column, oci) => {
              const ci = oci + 1;
              const cellItemClass = bonusesMobileBg
                ? `${styles.mobileWideItem} ${styles.mobileWideItemBonuses}`
                : styles.mobileWideItem;

              return (
                <div
                  className={cellItemClass}
                  key={`m-${column}-${ci}-${index}`}
                >
                  <span className={styles.mobileWideLabel}>{column}</span>
                  <p
                    className={`${styles.tableText} ${styles.mobileWideValue}`}
                  >
                    {row[ci] ?? ''}
                  </p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
