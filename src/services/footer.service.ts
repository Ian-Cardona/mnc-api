import { FooterModel } from '../models/footer.model';
import { IFooter } from '../types/footer.types';


const getFooter = async (): Promise<IFooter | null> => {
  const footer = await FooterModel.findOne({});
  return footer;
};

export default {
  getFooter
};
