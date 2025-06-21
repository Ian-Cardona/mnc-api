import { FooterModel } from '../models/footer.model';
import type { IFooter } from '../types/footer.types';

const getFooter = async (): Promise<IFooter | null> => {
  const footer = await FooterModel.findOne({});
  return footer;
};

const addFooter = async (data: IFooter): Promise<IFooter> => {
  const newFooter = await FooterModel.create(data);
  return newFooter;
};

const updateFooter = async (data: Partial<IFooter>): Promise<IFooter | null> => {
  const updatedFooter = await FooterModel.findOneAndUpdate({}, data, { new: true, lean: true });
  return updatedFooter;
};

export default {
  getFooter,
  addFooter,
  updateFooter,
};
