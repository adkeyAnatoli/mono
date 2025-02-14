import { ITopGameProps } from '@/app/interfaces/topGamesSectionInterface';
import Image from 'next/image';
import style from './topGamesSection.module.css';
import React from 'react';
import BlockLink from '../../blocksLink/BlockLink';

const TopGameBlock: React.FC<ITopGameProps> = ({ game, link, id }) => {
  return (
    <BlockLink classes={style.gameBlock} link={link} id={id}>
      <Image
        width={300}
        height={200}
        src={`https://api.adkey-seo.com/storage/images/games/${game.image}`}
        alt={`${game.name}`}
      />
      <div>
        <h3>{game.name}</h3>
        <p className={style.gameBlock_text}>
          <Image src="/svg/icon-play.svg" width={32} height={31} alt="Play" />
          Play Now
        </p>
      </div>
    </BlockLink>
  );
};

export default TopGameBlock;
