import { HomeModel } from '../models/home.model';
import { IHome } from '../types/home.types';

const getHome = async (): Promise<IHome | null> => {
  const home = await HomeModel.findOne({});
  return home;
};

export default {
  getHome
};
