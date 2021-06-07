export default class DeliveryAddress {
  firstnamedelivery?: string = '';
  lastnamedelivery?: string = '';
  phonedelivery: string = '';
  streetnamedelivery?: string = '';
  apartmentdelivery?: string = '';
  postalcodedelivery?: string = '';
  citydelivery?: string = '';
  provicedelivery?: string = '';

  public constructor(init?: Partial<DeliveryAddress>) {
    Object.assign(this, init);
  }
}
