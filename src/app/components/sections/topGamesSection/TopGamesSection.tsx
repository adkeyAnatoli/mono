'use client';
import { ITopGamesSectionProps } from '@/src/app/interfaces/topGamesSectionInterface';
import React from 'react';
import style from './topGamesSection.module.css';
import TopGameBlock from './TopGameBlock';
import Button from '../../buttons/ButtonLink';
import { useWebsite } from '@/src/app/context/WebsiteProvider';

const TopGamesSection: React.FC<ITopGamesSectionProps> = ({ data }) => {
  const { website } = useWebsite();
  if (!website) return;
  const offer = website.offers[0];
  return (
    <section id="games" className={style.section}>
      <div className="container wrapper">
        <h2 className="title-black">Top games</h2>
        <div className={style.games}>
          {data.map((game) => (
            <TopGameBlock
              key={game.id}
              game={game}
              link={offer.link}
              id={offer.id}
            />
          ))}
        </div>
        <Button
          text="All games"
          id={offer.id}
          link={offer.link}
          classes={`${style.button} button-primary`}
        />
      </div>
    </section>
  );
};

export default TopGamesSection;
