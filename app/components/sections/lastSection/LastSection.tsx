import React from 'react';
import style from './lastSection.module.css';
import data from '@/app/data/dataLast.json';

const LastSection = () => {
  return (
    <section className={style.section}>
      <div className="wrapper container">
        <h2 className="title-black">{data.title}</h2>
        <p className="text ">{data.text}</p>
        <div className={style.listBlock}>
          <div>
            <h4 className="title-black">{data['left-title']}</h4>
            <ul>
              {data.left.map((text, index) => (
                <li className="text" key={index}>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="title-black ">{data['right-title']}</h4>
            <ul>
              {data.right.map((text, index) => (
                <li className="text" key={index}>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LastSection;
