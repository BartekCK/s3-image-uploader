import { Route } from './routes';
import { ApiInstance } from './instance';

export const uploadImage = async (file: File, description: string) => {
  const formData = new FormData();

  formData.append('image', file);
  formData.append('description', description);

  const { data } = await ApiInstance.post(Route.images(), formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data;
};

export const getImage = (key: string): string => {
  return process.env.REACT_APP_BACKEND_HOST + Route.images(key);
};
