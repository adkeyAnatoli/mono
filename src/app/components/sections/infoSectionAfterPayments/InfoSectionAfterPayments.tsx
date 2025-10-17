import React from 'react';
import style from './infoSectionAfterPayments.module.css';
import data from '@/src/app/data/dataAfterPayments.json';
import { ContentItem } from '@/src/app/interfaces/dataInterface';
// import Image from 'next/image';

const newData = data as {
  sections: [
    {
      heading: string;
      content: ContentItem[];
    },
  ];
};

const InfoSectionAfterPayments = () => {
  // const WIDTH_IMG = 354;
  // const HEIGHT_IMG = 202;
  return (
    <section className={style.section}>
      <div className={`${style.wrapper} container`}>
        <h3 className="title-white title-small">
          About Ripper Casino Login Australia
        </h3>
        <div className={`${style.block}`}>
          <p className="text">
            Ripper Casino, known for its engaging and diverse gaming portfolio,
            offers an exciting online gambling experience. This casino platform
            features an array of games, including popular slots, classic table
            games like blackjack and roulette, and various forms of video poker.
            The platform is designed with a focus on user-friendliness, ensuring
            that both new and seasoned participants can navigate easily. Ripper
            Casino also prioritizes the security and privacy of its users,
            implementing advanced security measures to safeguard player
            information and transactions.
          </p>
          <p className="text">
            Regarding the Ripper Casino login procedure, it is straightforward
            and user-centric. New users are required to create an account by
            providing basic personal information like name, email address, and
            age to ensure they meet the legal gambling age. Once the account is
            set up, users can log in by entering their username and password on
            the Ripper Casino website. The platform may also offer features like
            password recovery and two-factor authentication for added security.
            This login process is designed to be quick and secure, allowing
            participants immediate access to their favorite games and the
            casino&apos;s features.
          </p>
          {/* <div className={style.imgBlock}>
            <Image
              src="/sectionImg/license.webp"
              width={WIDTH_IMG}
              height={HEIGHT_IMG}
              alt="License"
            />
          </div> */}
        </div>

        <div className={`lastBlock gap-64`}>
          {newData['sections'].map((section, index) => (
            <div className={'lastBlockElement'} key={index}>
              <h3 className="title-white title-small">{section.heading}</h3>
              {section.content.map((item, idx) => {
                if (item.type === 'paragraph') {
                  return (
                    <p className="text" key={idx}>
                      {item.text}
                    </p>
                  );
                } else if (item.type === 'list-number') {
                  return (
                    <ol key={idx}>
                      {item.items!.map((listItem, liIndex) => (
                        <li className="text" key={liIndex}>
                          {listItem}
                        </li>
                      ))}
                    </ol>
                  );
                } else if (item.type === 'list-dotted') {
                  return (
                    <ul key={idx}>
                      {item.items!.map((listItem, liIndex) => (
                        <li className="text" key={liIndex}>
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSectionAfterPayments;
