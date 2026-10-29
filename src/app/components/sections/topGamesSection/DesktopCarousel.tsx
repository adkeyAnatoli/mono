'use client';

import React from 'react';
import type { IGame } from '@/app/interfaces/mainInterfaces';
import TopGameBlock from './TopGameBlock';
import style from './topGamesSection.module.css';

const COL_WIDTH = 200;
const COL_GAP = 30;

type Props = {
  columns: IGame[][];
  visibleColumns: number;
  index: number;
  link: string;
  offerId: number;
};

export function DesktopCarousel({
  columns,
  visibleColumns,
  index,
  link,
  offerId,
}: Props) {
  const viewportWidth =
    visibleColumns * COL_WIDTH + (visibleColumns - 1) * COL_GAP;
  const shift = index * (COL_WIDTH + COL_GAP);

  return (
    <div
      className={style.desktopCarouselViewport}
      style={
        {
          '--top-games-carousel-viewport-w': `${viewportWidth}px`,
          '--top-games-carousel-shift': `${shift}px`,
        } as React.CSSProperties
      }
    >
      <div className={style.desktopCarouselTrack}>
        {columns.map((columnGames, columnIndex) => (
          <div className={style.desktopCol} key={columnIndex}>
            {columnGames.map((game) => (
              <TopGameBlock
                key={game.id}
                game={game}
                link={link}
                id={offerId}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
