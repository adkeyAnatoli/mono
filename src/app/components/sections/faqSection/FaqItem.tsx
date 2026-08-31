'use client';

import { useState } from 'react';
import Image from 'next/image';
import style from './faqSection.module.css';
import { plainContentText } from '@/app/utils/plainContentText';

interface FaqItemProps {
  title: string;
  text: string;
}

const FaqItem = ({ title, text }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={style.faqBlock}>
      <div onClick={() => setIsOpen(!isOpen)} className={style.faqElement}>
        <span className={style.faqQuestion}>{plainContentText(title)}</span>
        <Image
          width={24}
          height={24}
          src={isOpen ? '/svg/minus.svg' : '/svg/plus.svg'}
          alt={isOpen ? 'Minus icon' : 'Plus icon'}
        />
      </div>
      <div className={`${style.faqText} ${!isOpen ? style.hidden : ''}`}>
        {plainContentText(text)}
      </div>
    </div>
  );
};

export default FaqItem;
