import { GuidesModel } from '../models/guides.model';
import type { IGuides } from '../types/guides.type';

const getGuides = async (): Promise<IGuides | null> => {
  const guides = await GuidesModel.findOne({});
  return guides;
};

const addGuides = async (data: IGuides): Promise<IGuides> => {
  const newGuides = await GuidesModel.create(data);
  return newGuides;
};

const updateGuides = async (data: Partial<IGuides>): Promise<IGuides | null> => {
  const updatedGuides = await GuidesModel.findOneAndUpdate({}, data, { new: true, lean: true });
  return updatedGuides;
};

export default {
  getGuides,
  addGuides,
  updateGuides,
};
