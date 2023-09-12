/* tslint:disable */
/* eslint-disable */
import { OrderItem } from '../models/order-item';
export interface OrderRm {
  address?: null | string;
  orderDate?: string;
  orderId?: null | string;
  orderItems?: null | Array<OrderItem>;
  orderOwner?: null | string;
  statusId?: number;
  totalPayment?: number;
}
