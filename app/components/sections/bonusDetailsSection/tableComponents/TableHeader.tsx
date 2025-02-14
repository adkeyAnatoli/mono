import React from 'react';
import style from './styles/tableHeader.module.css';

const TableHeader = () => {
  return (
    <div className={`${style.table_head} row`}>
      <p>Casino</p>
      <p className="hide-1000">Bonuses</p>
      <p>Rate</p>
      <p>Free spins</p>
      <p>More info</p>
      <p className="hide-850">Get</p>
    </div>
  );
};

export default TableHeader;
