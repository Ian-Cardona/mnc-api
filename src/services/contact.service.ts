import { ContactModel } from '../models/contact.model';
import type { IContact } from '../types/contact.type';


const getContact = async (): Promise<IContact | null> => {
  const contact = await ContactModel.findOne({});
  return contact;
};

const addContact = async (data: IContact): Promise<IContact> => {
  const newContact = await ContactModel.create(data);
  return newContact;
};

const updateContact = async (data: Partial<IContact>): Promise<IContact | null> => {
  const updatedContact = await ContactModel.findOneAndUpdate({}, data, { new: true, lean: true });
  return updatedContact;
};

export default {
  getContact,
  addContact,
  updateContact,
};
