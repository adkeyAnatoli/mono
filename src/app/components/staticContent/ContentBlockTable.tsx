import TableWide from '@/src/app/components/table/TableWide';
import {
  ConsTable,
  ProsTable,
} from '@/src/app/components/table/ProsConsTables';

export default function ContentBlockTable({
  headers,
  rows,
  variant,
  bonusesMobileBg,
}: {
  headers: string[];
  rows: string[][];
  variant?: 'pros' | 'cons';
  bonusesMobileBg?: boolean;
}) {
  const isProsConsVariant =
    (variant === 'pros' || variant === 'cons') && headers.length === 2;

  if (isProsConsVariant) {
    const twoColRows = rows.map((row) => ({
      title: row[0] ?? '',
      description: row[1] ?? '',
    }));

    const titleHeader = headers[0];
    const descriptionHeader = headers[1];

    return variant === 'cons' ? (
      <ConsTable
        rows={twoColRows}
        titleHeader={titleHeader}
        descriptionHeader={descriptionHeader}
      />
    ) : (
      <ProsTable
        rows={twoColRows}
        titleHeader={titleHeader}
        descriptionHeader={descriptionHeader}
      />
    );
  }

  return (
    <TableWide
      columns={headers}
      rows={rows}
      bonusesMobileBg={bonusesMobileBg}
    />
  );
}
