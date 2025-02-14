import React from 'react';
import style from './supportSection.module.css';
import Image from 'next/image';

const SupportSection = () => {
  return (
    <section className={style.section}>
      <div className={`${style.wrapper} container`}>
        <div className={style.leftBlock}>
          <h2 className="title-black">
            Support
          </h2>
          <div>

            <p className={`${style.text} text`}>
              You can contact support through several communication channels:
            </p>
            <ul>
              <li className='text'>Online chat;</li>
              <li className='text'>Email;</li>
              <li className='text'>Help center;</li>
              <li className='text'>FAQ.</li>
            </ul>
            <p className={`${style.text} text`}>
              The chat works around the clock and in several languages.
            </p>
          </div>
        </div>
        <div>
          <Image src="/sectionImg/slot5.webp" width={459} height={384} alt="Support" />
        </div>

      </div>
    </section>
  );
};

export default SupportSection;
