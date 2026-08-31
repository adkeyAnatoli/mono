import Image from 'next/image';
import Link from 'next/link';
import style from './styles/header.module.css';
import LinkToElement from '../links/LinkToElement';
import { IHeader } from '@/app/interfaces/headerInterface';
import ButtonLinkFirstOffer from '../buttons/ButtonLinkFirstOffer';
import NavBlock from './navBlock/NavBlock';
import { ClientHamburger } from './headerHamburger';

const Header: React.FC<IHeader> = ({ isHomePage = false }) => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  const secondButton = 'Play Now';
  const WIDTH_LOGO = 119;
  const HEIGHT_LOGO = 35;

  const logo = (
    <Image
      src="/svg/logo.svg"
      width={WIDTH_LOGO}
      height={HEIGHT_LOGO}
      alt={`${siteName} Logo`}
      title={`${siteName} Logo`}
      priority
    />
  );

  return (
    <header className={style.header}>
      <div className={`${style.wrapper} container`}>
        <div className={style.logoBlock}>
          <ClientHamburger />
          {isHomePage ? (
            <LinkToElement data={{ href: 'main', title: '', key: 1 }}>
              {logo}
            </LinkToElement>
          ) : (
            <Link href="/" style={{ height: `${HEIGHT_LOGO}px` }}>
              {logo}
            </Link>
          )}
        </div>
        <div className={style.headerButtonBlock}>
          <NavBlock open={false} />
          <ButtonLinkFirstOffer text={secondButton} classes={style.register} />
        </div>
      </div>
    </header>
  );
};

export default Header;
