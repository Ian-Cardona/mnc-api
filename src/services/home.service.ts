import { HomeModel } from '../models/home.model';
import { IHome } from '../types/home.types';

const getHome = async (): Promise<IHome | null> => {
  const home = await HomeModel.findOne({});
  return home;
};

const addHome = async (data: IHome): Promise<IHome | null> => {
  const newHome = await HomeModel.create(data);
  return newHome;
};

export default {
  getHome,
  addHome
};
