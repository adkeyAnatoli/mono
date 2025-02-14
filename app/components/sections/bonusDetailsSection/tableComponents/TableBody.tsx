'use client';

import React, { FC, useState } from 'react';
import Image from 'next/image';
import style from './styles/tableBody.module.css';
import { ITableBonusDetailsProps } from '@/app/interfaces/tableBonusDetailsProps';
import ButtonLink from '@/app/components/buttons/ButtonLink';

const TableBody: FC<ITableBonusDetailsProps> = ({ offers }) => {
  const [expandedOffers, setExpandedOffers] = useState<Record<number, boolean>>(
    {}
  );

  const toggleAccordion = (id: number) => {
    setExpandedOffers((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  return (
    <>
      {offers.map((offer) => (
        <React.Fragment key={offer.id}>
          <div className="row">
            <div className="cell">
              <Image
                className={style.img}
                src={`https://api.adkey-seo.com/storage/images/offers/${offer.logo}`}
                width={140}
                height={56}
                alt={`${offer.name}`}
              />
            </div>
            <div className="cell hide-1000">
              <p>Welcome Bonus</p>
            </div>
            <div className="cell">
              {offer.bonuses.rate === '' ? (
                <p>—</p>
              ) : (
                <p>{offer.bonuses.rate}</p>
              )}
            </div>
            <div className="cell">
              {offer.bonuses.free_spins === '' ? (
                <p>—</p>
              ) : (
                <p>{offer.bonuses.free_spins} FS</p>
              )}
            </div>
            <div className="cell">
              <button
                className="button"
                onClick={() => toggleAccordion(offer.id)}
              >
                <Image className='info' src="/svg/info.svg" height={24} width={24} alt="Info" />
              </button>
            </div>
            <div className="cell last hide-850">
              <ButtonLink
                text="Get the bonus"
                id={offer.id}
                link={offer.link}
                classes="button-secondary"
              />
            </div>
          </div>
          {expandedOffers[offer.id] && (
            <div className={style.accordion}>
              <div className={style.accordion_block}>
                <p>Maximum amount:</p>
                <p className={style.last}>{offer.bonuses.amount}</p>
              </div>
              <div className={style.accordion_block}>
                <p>Wager:</p>
                <p className={style.last}>{offer.wager ? offer.wager : '—'}</p>
              </div>
              <div className={style.accordion_block}>
                <p>Bonus Code:</p>
                <p className={style.last}>
                  {offer.bonus_code ? offer.bonus_code : '—'}
                </p>
              </div>
              <div className={`${style.lastButton} cell last show-850`}>
                <ButtonLink
                  id={offer.id}
                  text="Get the bonus"
                  link={offer.link}
                  classes="button-secondary"
                />
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default TableBody;
