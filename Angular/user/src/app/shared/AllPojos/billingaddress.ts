export default class BillingAddress {
  streetnamebilling?: string = '';
  apartmentbilling?: string = '';
  postalcodebilling?: string = '';
  citybilling?: string = '';
  provicebilling?: string = '';

  public constructor(init?: Partial<BillingAddress>) {
    Object.assign(this, init);
  }
}
