import Image from 'next/image';
import Link from 'next/link';
import style from './styles/header.module.css';
import LinkToElement from '../links/LinkToElement';
import ButtonLinkFirstOffer from '../buttons/ButtonLinkFirstOffer';
import NavBlock from './navBlock/NavBlock';
import { ClientHamburger } from './headerHamburger';

type Props = {
  isHomePage?: boolean;
};

const Header: React.FC<Props> = ({ isHomePage = false }) => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  const secondButton = 'PLAY NOW';
  const WIDTH_LOGO = 79;
  const HEIGHT_LOGO = 64;

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
            <LinkToElement targetId="main">{logo}</LinkToElement>
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
