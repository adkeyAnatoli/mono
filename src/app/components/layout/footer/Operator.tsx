import Image from 'next/image';
import styles from '../styles/footer.module.css';

interface OperatorItem {
  name: string;
  file: string;
  hideOnMobile?: boolean;
}

const operators: OperatorItem[] = [
  { name: 'Alt Coins', file: 'alt-coins.svg' },
  { name: 'Apple Pay', file: 'applepay.svg' },
  { name: 'AstroPay', file: 'astropay.svg' },
  { name: 'CoinsPaid', file: 'coinspaid.svg' },
  { name: 'ecoPayz', file: 'ecopayz.svg' },
  { name: 'EPS', file: 'eps.svg' },
  { name: 'Flexepin', file: 'flexepin.svg' },
  { name: 'iDebit', file: 'idebit.svg' },
  { name: 'Interac', file: 'interac.svg' },
  { name: 'Jeton', file: 'jeton.svg' },
  { name: 'MasterCard', file: 'mastercard.svg' },
  { name: 'MuchBetter', file: 'muchbetter.svg' },
  { name: 'Neosurf', file: 'neosurf.svg' },
  { name: 'Neteller', file: 'neteller.svg', hideOnMobile: true },
  {
    name: 'Noda Identity Verification',
    file: 'noda-identity-verification-light.svg',
    hideOnMobile: true,
  },
  { name: 'NodaPay', file: 'nodapay.svg', hideOnMobile: true },
  { name: 'PayID', file: 'payid.svg', hideOnMobile: true },
  { name: 'Paysafecard', file: 'paysafecard.svg', hideOnMobile: true },
  { name: 'Rapid Transfer', file: 'rapidtransfer.svg', hideOnMobile: true },
  { name: 'Siru Mobile', file: 'siru-mobile.svg', hideOnMobile: true },
  { name: 'Skrill', file: 'skrill.svg', hideOnMobile: true },
  { name: 'Stable Coins', file: 'stable-coins.svg', hideOnMobile: true },
  { name: 'Visa', file: 'visa.svg', hideOnMobile: true },
  { name: 'Volt', file: 'volt.svg', hideOnMobile: true },
];

function OperatorImage({
  operator,
  siteName,
}: {
  operator: OperatorItem;
  siteName: string;
}) {
  return (
    <div
      className={`${styles.operatorBlock}${operator.hideOnMobile ? ` ${styles.operatorBlockHiddenMobile}` : ''}`}
    >
      <Image
        className={styles.operatorElementColor}
        src={`/footer/operator/${operator.file}`}
        alt={`${operator.name} in ${siteName}`}
        title={`${operator.name} in ${siteName}`}
        width={98}
        height={32}
        loading="lazy"
      />
    </div>
  );
}

export default function Operator({ siteName }: { siteName: string }) {
  return (
    <div className={styles.footerOperator}>
      {operators.map((operator) => (
        <OperatorImage
          key={operator.file}
          operator={operator}
          siteName={siteName}
        />
      ))}
    </div>
  );
}
