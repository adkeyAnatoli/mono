import Image from 'next/image';
import style from './styles/header.module.css';
import LinkToElement from '../links/LinkToElement';
import Link from 'next/link';
import { IHeader } from '@/app/interfaces/headerInterface';
import ButtonLinkFirstOffer from '../buttons/ButtonLinkFirstOffer';
import { uiPhrases } from '@/app/data/uiPhrases';

const Header: React.FC<IHeader> = ({ isHomePage = false }) => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  const WIDTH_LOGO = 197;
  const HEIGHT_LOGO = 47;
  return (
    <header className={style.header}>
      <div className={`${style.wrapper} container`}>
        {isHomePage ? (
          <>
            <LinkToElement data={{ href: 'main', title: '', key: 1 }}>
              <Image
                src="/svg/logo.svg"
                width={WIDTH_LOGO}
                height={HEIGHT_LOGO}
                alt={`${siteName} logo`}
                title={`${siteName} logo`}
                priority
              />
            </LinkToElement>
            <div className={style.headerButtonBlock}>
              <ButtonLinkFirstOffer
                text={uiPhrases.playNow}
                classes={style.register}
              />
            </div>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                src="/svg/logo.svg"
                width={WIDTH_LOGO}
                height={HEIGHT_LOGO}
                alt={'logo'}
                priority
              />
            </Link>
            <div className={style.headerButtonBlock}>
              <ButtonLinkFirstOffer
                text={uiPhrases.playNow}
                classes={style.register}
              />
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
