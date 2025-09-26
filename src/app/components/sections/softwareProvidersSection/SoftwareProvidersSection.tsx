import { ISoftwareProvidersProps } from '@/src/app/interfaces/softwareProvidersInterface';
import style from './softwareProvidersSection.module.css';
import Image from 'next/image';
import React from 'react';
// import BlockLink from '../../blocksLink/BlockLink';

const SoftwareProvidersSection: React.FC<ISoftwareProvidersProps> = ({
  data,
}) => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  return (
    <section className={style.wrapper}>
      <div className={'wrapper container'}>
        <h2 className="title-black">Software Providers</h2>
        <div className={style.providers}>
          {data.map((provider) => (
            <div className={style.providerBlock} key={provider.id}>
              <Image
                src={`https://api.adkey-seo.com/storage/images/providers/${provider.image}`}
                width={140}
                height={56}
                alt={`${provider.name} in ${siteName}`}
                title={`${provider.name} in ${siteName}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoftwareProvidersSection;
