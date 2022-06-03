export class Tag {
    id?: number;
    label?: string;
    value?: any;
    category?: string;

    constructor(id?: number, label?: string, value?: any, category?: string) {
        this.id = id;
        this.label = label;
        this.value = value;
        this.category = category;
    }
}
