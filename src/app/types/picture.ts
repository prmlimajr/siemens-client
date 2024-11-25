import { PictureFile } from './pictureFile';

export type Picture = {
  id: string;
  code: string;
  title: string;
  description: string;
  cost: string;
  pictureFile: PictureFile;
};
