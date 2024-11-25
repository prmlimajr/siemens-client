import { Picture } from './picture';

export type Response = {
  page: number;
  lastPage: number;
  pictures: Picture[];
};
