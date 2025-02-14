import { ISoftwareProvidersProps } from '@/app/interfaces/softwareProvidersInterface';
import style from './softwareProvidersSection.module.css';
import Image from 'next/image';
import React from 'react';
import BlockLink from '../../blocksLink/BlockLink';

const SoftwareProvidersSection: React.FC<ISoftwareProvidersProps> = ({
  data,
  offer,
}) => {
  return (
    <section className={style.wrapper}>
      <div className={'wrapper container'}>
        <h2 className="title-black">Software Providers</h2>
        <div className={style.providers}>
          {data.map((provider) => (
            <BlockLink
              link={offer.link}
              id={offer.id}
              classes={style.providerBlock}
              key={provider.id}
            >
              <Image
                src={`https://api.adkey-seo.com/storage/images/providers/${provider.image}`}
                width={140}
                height={56}
                alt={provider.name}
              />
            </BlockLink>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoftwareProvidersSection;
