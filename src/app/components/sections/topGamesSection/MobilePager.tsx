'use client';

import React, { useState } from 'react';
import type { IGame } from '@/app/interfaces/mainInterfaces';
import TopGameBlock from './TopGameBlock';
import { useSwipe } from '@/app/hooks/useSwipe';
import { chunk } from '@/app/utils/chunk';
import style from './topGamesSection.module.css';

const PAGE_SIZE = 6;

type Props = {
  games: IGame[];
  link: string;
  offerId: number;
};

export function MobilePager({ games, link, offerId }: Props) {
  const [page, setPage] = useState(0);
  const pages = chunk(games, PAGE_SIZE);
  const lastPage = Math.max(0, pages.length - 1);
  const current = Math.min(page, lastPage);

  const swipeHandlers = useSwipe(
    () => setPage(Math.min(lastPage, current + 1)),
    () => setPage(Math.max(0, current - 1))
  );

  return (
    <>
      <div
        className={style.gamesOuter}
        role="group"
        aria-label="Swipe to change game page"
        {...swipeHandlers}
      >
        <div className={style.gamesContainer}>
          {(pages[current] ?? []).map((game) => (
            <TopGameBlock key={game.id} game={game} link={link} id={offerId} />
          ))}
        </div>
      </div>

      <div className={style.pagination} role="tablist" aria-label="Game pages">
        {pages.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={current === index}
            aria-label={`Page ${index + 1}`}
            className={`${style.paginationBullet} ${current === index ? style.paginationBulletActive : ''}`}
            onClick={() => setPage(index)}
          />
        ))}
      </div>
    </>
  );
}
