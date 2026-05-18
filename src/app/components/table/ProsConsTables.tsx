import styles from './table.module.css';

interface TwoColumnRow {
  title: string;
  description: string;
}

interface ProsConsTableProps {
  titleHeader: string;
  descriptionHeader: string;
  rows: TwoColumnRow[];
}

function TwoColumnTable({
  titleHeader,
  descriptionHeader,
  rows,
}: ProsConsTableProps) {
  return (
    <table className={`${styles.table}`}>
      <thead>
        <tr className={`${styles.tableRow} ${styles.tableHeadRow}`}>
          <th
            className={`${styles.tableCell} ${styles.tableCellInvert} ${styles.tableHeadCell} ${styles.prosAndConsColTitle}`}
            scope="col"
          >
            <p className={styles.tableText}>{titleHeader}</p>
          </th>
          <th
            className={`${styles.tableCell} ${styles.tableCellInvert} ${styles.tableHeadCell} ${styles.prosAndConsColDescription}`}
            scope="col"
          >
            <p className={styles.tableText}>{descriptionHeader}</p>
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr
            className={styles.tableRow}
            key={`${row.title}-${row.description}-${index}`}
          >
            <td
              className={`${styles.tableCell} ${styles.tableCellInvert} ${styles.prosAndConsColTitle}`}
            >
              <p className={styles.tableText}>{row.title}</p>
            </td>
            <td
              className={`${styles.tableCell} ${styles.tableCellInvert} ${styles.prosAndConsColDescription}`}
            >
              <p className={styles.tableText}>{row.description}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function TwoColumnTableCons(props: ProsConsTableProps) {
  return (
    <table className={`${styles.table} ${styles.tableCons}`}>
      <thead>
        <tr className={`${styles.tableRow} ${styles.tableHeadRow}`}>
          <th
            className={`${styles.tableCell} ${styles.tableCellInvert} ${styles.tableHeadCell} ${styles.prosAndConsColTitle}`}
            scope="col"
          >
            <p className={styles.tableText}>{props.titleHeader}</p>
          </th>
          <th
            className={`${styles.tableCell} ${styles.tableCellInvert} ${styles.tableHeadCell} ${styles.prosAndConsColDescription}`}
            scope="col"
          >
            <p className={styles.tableText}>{props.descriptionHeader}</p>
          </th>
        </tr>
      </thead>
      <tbody>
        {props.rows.map((row, index) => (
          <tr
            className={styles.tableRow}
            key={`${row.title}-${row.description}-${index}`}
          >
            <td
              className={`${styles.tableCell} ${styles.tableCellInvert} ${styles.prosAndConsColTitle}`}
            >
              <p className={styles.tableText}>{row.title}</p>
            </td>
            <td
              className={`${styles.tableCell} ${styles.tableCellInvert} ${styles.prosAndConsColDescription}`}
            >
              <p className={styles.tableText}>{row.description}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ProsTable(props: ProsConsTableProps) {
  return (
    <TwoColumnTable
      titleHeader={props.titleHeader}
      descriptionHeader={props.descriptionHeader}
      rows={props.rows}
    />
  );
}

export function ConsTable(props: ProsConsTableProps) {
  return (
    <TwoColumnTableCons
      titleHeader={props.titleHeader}
      descriptionHeader={props.descriptionHeader}
      rows={props.rows}
    />
  );
}
