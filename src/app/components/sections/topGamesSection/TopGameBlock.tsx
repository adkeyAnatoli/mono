import { ITopGameProps } from '@/app/interfaces/topGamesSectionInterface';
import Image from 'next/image';
import style from './topGamesSection.module.css';
import React from 'react';
import BlockLink from '../../blocksLink/BlockLink';
import { apiGameImageUrl } from '@/app/utils/apiUrl';

const TopGameBlock: React.FC<ITopGameProps> = ({ game, link, id }) => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  return (
    <BlockLink classes={style.gameBlock} link={link} id={id}>
      <Image
        width={200}
        height={300}
        className={style.gameImage}
        sizes="(max-width: 760px) 160px, 200px"
        src={apiGameImageUrl(game)}
        alt={`${game.name} in ${siteName}`}
        title={`${game.name} in ${siteName}`}
      />
      <div className={style.gameGradientLayer}>
        <h3>{game.name}</h3>
        <p className={style.gameBlock_text}>Play Now</p>
      </div>
    </BlockLink>
  );
};

export default TopGameBlock;
