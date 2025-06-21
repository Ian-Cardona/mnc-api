import { HomeModel } from '../models/home.model';
import type { IHome } from '../types/home.types';

const getHome = async (): Promise<IHome | null> => {
  const home = await HomeModel.findOne({});
  return home;
};

const addHome = async (data: IHome): Promise<IHome> => {
  const newHome = await HomeModel.create(data);
  return newHome;
};

const updateHome = async (data: Partial<IHome>): Promise<IHome | null> => {
  const updatedHome = await HomeModel.findOneAndUpdate({}, data, { new: true, lean: true });
  return updatedHome;
};

export default {
  getHome,
  addHome,
  updateHome,
};
