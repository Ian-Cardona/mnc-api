import { FooterModel } from '../models/footer.model';
import { IFooter } from '../types/footer.types';


const getFooter = async (): Promise<IFooter | null> => {
  const footer = await FooterModel.findOne({});
  return footer;
};

const addFooter = async (data: IFooter): Promise<IFooter | null> => {
  const newFooter = await FooterModel.create(data);
  return newFooter;
};


export default {
  getFooter,
  addFooter
};
