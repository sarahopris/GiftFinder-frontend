export class Tag {
  id?: number;
  tagName?: string;
  value?: any;
  category?: string;
  mandatory?: string;

  constructor(id?: number, tagName?: string, value?: any, category?: string, mandatory?: string) {
    this.id = id;
    this.tagName = tagName;
    this.value = value;
    this.category = category;
    this.mandatory = mandatory;
  }
}
