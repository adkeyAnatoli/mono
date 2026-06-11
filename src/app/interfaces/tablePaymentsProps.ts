import { IOffer, IPayments } from './mainInterfaces';

export interface ITablePaymentsProps {
  payments: IPayments[];
  offer: IOffer;
}
