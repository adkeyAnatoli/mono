'use client';
import { ITopGamesSectionProps } from '@/app/interfaces/topGamesSectionInterface';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import style from './topGamesSection.module.css';
import TopGameBlock from './TopGameBlock';
import Button from '../../buttons/ButtonLink';
import { useWebsite } from '@/app/context/WebsiteProvider';
import { IGame } from '@/app/interfaces/mainInterfaces';
import { uiPhrases } from '@/app/data/uiPhrases';

const DESKTOP_BREAKPOINT = 768;
const DESKTOP_COL_WIDTH = 200;
const DESKTOP_COL_GAP = 30;
const MOBILE_PAGE_SIZE = 6;
const MOBILE_SWIPE_THRESHOLD_PX = 48;

function getVisibleDesktopColumns(width: number) {
  if (width >= 1360) return 5;
  if (width >= 1120) return 4;
  return 3;
}

function chunk<T>(items: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

function toDesktopColumns(games: IGame[]) {
  return chunk(games, 2);
}

const TopGamesSection: React.FC<ITopGamesSectionProps> = ({ data }) => {
  const { website } = useWebsite();
  const offer = website?.offers?.[0];
  const [viewportWidth, setViewportWidth] = useState(1280);
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [mobilePage, setMobilePage] = useState(0);
  const mobileSwipeStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const syncWidth = () => setViewportWidth(window.innerWidth);
    syncWidth();
    window.addEventListener('resize', syncWidth);
    return () => window.removeEventListener('resize', syncWidth);
  }, []);

  const isMobile = viewportWidth < DESKTOP_BREAKPOINT;
  const visibleDesktopColumns = getVisibleDesktopColumns(viewportWidth);

  const desktopColumns = useMemo(() => toDesktopColumns(data), [data]);
  const maxDesktopIndex = Math.max(
    0,
    desktopColumns.length - visibleDesktopColumns
  );
  const desktopShift = desktopIndex * (DESKTOP_COL_WIDTH + DESKTOP_COL_GAP);

  const mobilePages = useMemo(() => chunk(data, MOBILE_PAGE_SIZE), [data]);
  const mobilePageCount = Math.max(1, mobilePages.length);

  const handleMobileSwipePointerDown = useCallback((e: React.PointerEvent) => {
    mobileSwipeStartRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMobileSwipePointerEnd = useCallback(
    (e: React.PointerEvent) => {
      if (!mobileSwipeStartRef.current || mobilePageCount <= 1) {
        mobileSwipeStartRef.current = null;
        return;
      }
      const start = mobileSwipeStartRef.current;
      mobileSwipeStartRef.current = null;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      if (
        Math.abs(dx) < MOBILE_SWIPE_THRESHOLD_PX ||
        Math.abs(dx) <= Math.abs(dy)
      )
        return;
      if (dx < 0) {
        setMobilePage((p) => Math.min(mobilePageCount - 1, p + 1));
      } else {
        setMobilePage((p) => Math.max(0, p - 1));
      }
    },
    [mobilePageCount]
  );

  useEffect(() => {
    setDesktopIndex((prev) => Math.min(prev, maxDesktopIndex));
  }, [maxDesktopIndex]);

  useEffect(() => {
    setMobilePage((prev) => Math.min(prev, mobilePageCount - 1));
  }, [mobilePageCount]);

  if (!website || !offer) return null;

  return (
    <section id="games" className={style.section}>
      <div className="container">
        <div className={style.headerRow}>
          <h2 className="title-black">{uiPhrases.topGames}</h2>
          <div className={style.navBtns}>
            <button
              type="button"
              className={`${style.navBtn} ${desktopIndex === 0 ? style.navBtnDisabled : ''}`}
              onClick={() => setDesktopIndex((i) => Math.max(0, i - 1))}
              disabled={desktopIndex === 0 || isMobile}
              aria-label={uiPhrases.previousGames}
            />
            <button
              type="button"
              className={`${style.navBtn} ${desktopIndex >= maxDesktopIndex ? style.navBtnDisabled : ''}`}
              onClick={() =>
                setDesktopIndex((i) => Math.min(maxDesktopIndex, i + 1))
              }
              disabled={desktopIndex >= maxDesktopIndex || isMobile}
              aria-label={uiPhrases.nextGames}
            />
          </div>
        </div>

        {isMobile ? (
          <>
            <div
              className={style.gamesOuter}
              role="group"
              aria-label={uiPhrases.swipeToChangeGamePage}
              onPointerDown={handleMobileSwipePointerDown}
              onPointerUp={handleMobileSwipePointerEnd}
              onPointerCancel={handleMobileSwipePointerEnd}
            >
              <div className={style.gamesContainer}>
                {(mobilePages[mobilePage] ?? []).map((game) => (
                  <TopGameBlock
                    key={game.id}
                    game={game}
                    link={offer.link}
                    id={offer.id}
                  />
                ))}
              </div>
            </div>

            <div
              className={style.pagination}
              role="tablist"
              aria-label={uiPhrases.gamePages}
            >
              {mobilePages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={mobilePage === index}
                  aria-label={`${uiPhrases.page} ${index + 1}`}
                  className={`${style.paginationBullet} ${mobilePage === index ? style.paginationBulletActive : ''}`}
                  onClick={() => setMobilePage(index)}
                />
              ))}
            </div>
          </>
        ) : (
          <div
            className={style.desktopCarouselViewport}
            style={
              {
                '--top-games-carousel-viewport-w': `${visibleDesktopColumns * DESKTOP_COL_WIDTH + (visibleDesktopColumns - 1) * DESKTOP_COL_GAP}px`,
                '--top-games-carousel-shift': `${desktopShift}px`,
              } as React.CSSProperties
            }
          >
            <div className={style.desktopCarouselTrack}>
              {desktopColumns.map((columnGames, columnIndex) => (
                <div className={style.desktopCol} key={columnIndex}>
                  {columnGames.map((game) => (
                    <TopGameBlock
                      key={game.id}
                      game={game}
                      link={offer.link}
                      id={offer.id}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          text={uiPhrases.allGames}
          id={offer.id}
          link={offer.link}
          classes={`${style.button} button-primary`}
        />
      </div>
    </section>
  );
};

export default TopGamesSection;
