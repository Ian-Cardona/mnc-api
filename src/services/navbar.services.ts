import { NavBarModel } from '../models/navbar.model';
import type { INavBar } from '../types/navbar.types';

const getNavBar = async (): Promise<INavBar | null> => {
  const navBar = await NavBarModel.findOne({});
  return navBar;
};

const addNavBar = async (data: INavBar): Promise<INavBar> => {
  const newNavBar = await NavBarModel.create(data);
  return newNavBar;
};

const updateNavBar = async (data: Partial<INavBar>): Promise<INavBar | null> => {
  const updatedNavBar = await NavBarModel.findOneAndUpdate({}, data, { new: true, lean: true });
  return updatedNavBar;
};

export default {
  getNavBar,
  addNavBar,
  updateNavBar,
};
