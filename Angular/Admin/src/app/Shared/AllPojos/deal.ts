export default class Deal {
  id?: string = '';
  dealTitle?: string = '';
  dealDescription?: string = '';
  imagepath: string = '';
  isdeleted?: boolean = false;
  isActive?: boolean = false;
  startdate?: any = '';
  enddate?: any = '';

  public constructor(init?: Partial<Deal>) {
    Object.assign(this, init);
  }
}
