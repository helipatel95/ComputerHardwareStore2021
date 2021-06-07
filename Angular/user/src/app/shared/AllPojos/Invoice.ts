import BillingAddress from './billingaddress';
import Cart from './Cart';
import DeliveryAddress from './deliveryAddress';

export default class Invoice {
  invoiceid?: string = '';
  invoicedate?: any = '';
  invoiceamount?: number = 0;
  userid?: string = '';
  userEmail?: string = '';
  userfirstname?: string = '';
  userlastname?: string = '';
  allproducts?: Cart[] = [];
  deliveryAddress: DeliveryAddress = new DeliveryAddress();
  billingAddress: BillingAddress = new BillingAddress();
  paymentflag: string = '';
  paymentToken: string = '';

  public constructor(init?: Partial<Invoice>) {
    Object.assign(this, init);
  }
}
