'use client';

import { useState } from 'react';
import Image from 'next/image';
import style from './faqSection.module.css';

interface FaqItemProps {
  title: string;
  text: string;
}

const FaqItem = ({ title, text }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${style.faqBlock} ${isOpen ? style.faqBlockOpen : ''}`}>
      <div onClick={() => setIsOpen(!isOpen)} className={style.faqElement}>
        <span className={style.faqQuestion}>{title}</span>
        <Image
          width={24}
          height={24}
          src={isOpen ? '/svg/minus.svg' : '/svg/plus.svg'}
          alt={isOpen ? 'Minus icon' : 'Plus icon'}
        />
      </div>
      <div className={`${style.faqText} ${!isOpen ? style.hidden : ''}`}>
        {text}
      </div>
    </div>
  );
};

export default FaqItem;
