import React from 'react';
import style from './styles/tableHead.module.css';

const TableHead = () => {
  return (
    <div className={style.head}>
      <p className="table_block width-120 fix">Method</p>
      <p className="table_block  width-140">Type</p>
      <p className="table_block width-140">Country</p>
      <p className="table_block width-140">Commission</p>
      <p className="table_block  width-160">Processing time</p>
      <p className="table_block  width-160">Minimum deposit</p>
      <p className={`${style.last} table_block`}>Deposit</p>
    </div>
  );
};

export default TableHead;
