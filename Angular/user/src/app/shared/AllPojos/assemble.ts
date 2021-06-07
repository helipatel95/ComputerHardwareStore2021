import Category from './category';

export default class Assemble {
  id?: string = '';
  assemblyTitle?: string = '';
  imagepath?: string = '';
  allcategories?: Category[] = [];
  isdeleted?: boolean = false;
  isActive?: boolean = false;
  public constructor(init?: Partial<Assemble>) {
    Object.assign(this, init);
  }
}
