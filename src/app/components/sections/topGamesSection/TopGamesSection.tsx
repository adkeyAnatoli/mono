'use client';
import { ITopGamesSectionProps } from '@/src/app/interfaces/topGamesSectionInterface';
import React from 'react';
import style from './topGamesSection.module.css';
import TopGameBlock from './TopGameBlock';
import Button from '../../buttons/ButtonLink';
import { useWebsite } from '@/src/app/context/WebsiteProvider';
import ui from '@/src/app/data/siteUi.json';

const TopGamesSection: React.FC<ITopGamesSectionProps> = ({ data }) => {
  const { website } = useWebsite();
  const offer = website?.offers?.[0];
  if (!website || !offer) {
    return null;
  }

  const games = data.slice(0, 10);

  return (
    <section id="games" className={style.section}>
      <div className="container wrapper">
        <h2 className="title-black">{ui.topGames_section.top_games}</h2>
        <div className={style.games}>
          {games.map((game) => (
            <TopGameBlock
              key={game.id}
              game={game}
              link={offer.link}
              id={offer.id}
            />
          ))}
        </div>
        <Button
          text={ui.topGames_section.all_games}
          id={offer.id}
          link={offer.link}
          classes={`${style.button} button-primary`}
        />
      </div>
    </section>
  );
};

export default TopGamesSection;
