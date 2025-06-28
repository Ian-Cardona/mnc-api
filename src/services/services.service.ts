
import { ServicesModel } from '../models/services.model';
import type { IServices } from '../types/services.types';

const getServices = async (): Promise<IServices | null> => {
  const services = await ServicesModel.findOne({});
  return services;
};

const addServices = async (data: IServices): Promise<IServices> => {
  const newServices = await ServicesModel.create(data);
  return newServices;
};

const updateServices = async (data: Partial<IServices>): Promise<IServices | null> => {
  const updatedServices = await ServicesModel.findOneAndUpdate({}, data, { new: true, lean: true });
  return updatedServices;
};

export default {
  getServices,
  addServices,
  updateServices,
};
