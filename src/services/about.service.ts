import { AboutModel } from '../models/about.model';
import type { IAbout } from '../types/about.type';

const getAbout = async (): Promise<IAbout | null> => {
  const about = await AboutModel.findOne({});
  return about;
};

const addAbout = async (data: IAbout): Promise<IAbout> => {
  const newAbout = await AboutModel.create(data);
  return newAbout;
};

const updateAbout = async (data: Partial<IAbout>): Promise<IAbout | null> => {
  const updatedAbout = await AboutModel.findOneAndUpdate({}, data, { new: true, lean: true });
  return updatedAbout;
};

export default {
  getAbout,
  addAbout,
  updateAbout,
};
