import Image from 'next/image';
import style from './styles/header.module.css';
import LinkToElement from '../links/LinkToElement';
import Link from 'next/link';
import { IHeader } from '@/app/interfaces/headerInterface';
import ButtonLinkFirstOffer from '../buttons/ButtonLinkFirstOffer';

const Header: React.FC<IHeader> = ({ isHomePage = false }) => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  // const firstButton = 'Play Now';
  const secondButton = 'Play Now';
  const WIDTH_LOGO = 172;
  const HEIGHT_LOGO = 46;
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
                alt={`${siteName} Logo`}
                title={`${siteName} Logo`}
                priority
              />
            </LinkToElement>
            <div className={style.headerButtonBlock}>
              <ButtonLinkFirstOffer
                text={secondButton}
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
                alt="Logo"
                priority
              />
            </Link>
            <div className={style.headerButtonBlock}>
              <ButtonLinkFirstOffer
                text={secondButton}
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
