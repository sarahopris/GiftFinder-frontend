import {Tag} from "./tag";

export interface User {
  id: number;
  email: string;

  username: string;
  password: string;
  token: string;
  selectedTags: Tag[];
  //notifications?: string[];
}
