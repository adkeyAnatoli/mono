import Image from 'next/image';
import styles from '../styles/footer.module.css';

interface ProviderItem {
  name: string;
  file: string;
}

const providers: ProviderItem[] = [
  { name: 'SlotUp', file: 'slotup.svg' },
  { name: 'GamCare', file: 'gamcare.svg' },
  { name: 'Gambling Therapy', file: 'gambling_therapy.svg' },
  { name: 'Gamblers Anonymous', file: 'gamblers_anonymous.svg' },
  { name: '18+', file: '18plus.svg' },
];

export default function Provider({ siteName }: { siteName: string }) {
  return (
    <div className={styles.footerProviderRow}>
      {providers.map((provider) => (
        <div key={provider.file} className={styles.providerBlock}>
          <Image
            className={styles.providerElementColor}
            src={`/footer/provider/${provider.file}`}
            alt={`${provider.name} in ${siteName}`}
            title={`${provider.name} in ${siteName}`}
            width={71}
            height={32}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
