'use client';

import type { IGame } from '@/app/interfaces/mainInterfaces';
import React, { useEffect, useMemo, useState } from 'react';
import style from './topGamesSection.module.css';
import Button from '../../buttons/ButtonLink';
import { useFirstOffer } from '@/app/hooks/useFirstOffer';
import { chunk } from '@/app/utils/chunk';
import { DesktopCarousel } from './DesktopCarousel';
import { MobilePager } from './MobilePager';

const DESKTOP_BREAKPOINT = 768;

function getVisibleColumns(width: number) {
  if (width >= 1360) return 5;
  if (width >= 1120) return 4;
  return 3;
}

type Props = {
  data: IGame[];
};

const TopGamesSection: React.FC<Props> = ({ data }) => {
  const offer = useFirstOffer();
  const [viewportWidth, setViewportWidth] = useState(1280);
  const [desktopIndex, setDesktopIndex] = useState(0);

  useEffect(() => {
    const syncWidth = () => setViewportWidth(window.innerWidth);
    syncWidth();
    window.addEventListener('resize', syncWidth);
    return () => window.removeEventListener('resize', syncWidth);
  }, []);

  const columns = useMemo(() => chunk(data, 2), [data]);

  if (!offer) return null;

  const isMobile = viewportWidth < DESKTOP_BREAKPOINT;
  const visibleColumns = getVisibleColumns(viewportWidth);
  const maxIndex = Math.max(0, columns.length - visibleColumns);
  const index = Math.min(desktopIndex, maxIndex);

  return (
    <section id="games" className={style.section}>
      <div className="container">
        <div className={style.headerRow}>
          <h2 className="title-white">Top Games</h2>
          <div className={style.navBtns}>
            <button
              type="button"
              className={`${style.navBtn} ${index === 0 ? style.navBtnDisabled : ''}`}
              onClick={() => setDesktopIndex(Math.max(0, index - 1))}
              disabled={index === 0 || isMobile}
              aria-label="Previous games"
            />
            <button
              type="button"
              className={`${style.navBtn} ${index >= maxIndex ? style.navBtnDisabled : ''}`}
              onClick={() => setDesktopIndex(Math.min(maxIndex, index + 1))}
              disabled={index >= maxIndex || isMobile}
              aria-label="Next games"
            />
          </div>
        </div>

        {isMobile ? (
          <MobilePager games={data} link={offer.link} offerId={offer.id} />
        ) : (
          <DesktopCarousel
            columns={columns}
            visibleColumns={visibleColumns}
            index={index}
            link={offer.link}
            offerId={offer.id}
          />
        )}

        <Button
          text="All Games"
          id={offer.id}
          link={offer.link}
          classes={`${style.button} button-primary`}
        />
      </div>
    </section>
  );
};

export default TopGamesSection;
