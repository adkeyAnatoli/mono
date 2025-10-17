import Image from 'next/image';
import style from './styles/header.module.css';
import LinkToElement from '../links/LinkToElement';
// import { usePathname } from 'next/navigation';
import Link from 'next/link';
// import ButtonLink from '../buttons/ButtonLink';
// import { IHeader } from '@/src/app/interfaces/headerInterface';
// import NavBlock from '../navBlock/NavBlock';
// import { useWebsite } from '../../context/WebsiteProvider';
import { ClientHamburger } from './headerHamburger';
import ButtonLinkFirstOffer from '../buttons/ButtonLinkFirstOffer';
import NavBlock from '../navBlock/NavBlock';

interface HeaderProps {
  isHomePage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isHomePage = false }) => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  // const isHomePage = router === '/';
  // const firstButton = 'Log In';
  const secondButton = 'Play Now';
  const WIDTH_LOGO = 97;
  const HEIGHT_LOGO = 53;
  // const router = usePathname();
  // const { website } = useWebsite();
  // if (!website) return null;
  // const offer = website.offers[0];

  return (
    <header className={style.header}>
      <div className={`${style.wrapper} container`}>
        {isHomePage ? (
          <>
            <div className={style.logoBlock}>
              <ClientHamburger />
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
            </div>
            <div className={style.headerButtonBlock}>
              <NavBlock open={false} />
              <ButtonLinkFirstOffer
                text={secondButton}
                classes={style.register}
              />
            </div>
          </>
        ) : (
          <>
            <div className={style.logoBlock}>
              <ClientHamburger />
              <Link href="/">
                <Image
                  src="/svg/logo.svg"
                  width={WIDTH_LOGO}
                  height={HEIGHT_LOGO}
                  alt={`${siteName} Logo`}
                  title={`${siteName} Logo`}
                  priority
                />
              </Link>
            </div>
            <div className={style.headerButtonBlock}>
              <NavBlock open={false} />
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
