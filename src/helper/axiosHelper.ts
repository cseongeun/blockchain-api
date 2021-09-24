import axios from 'axios';

export const getRequest = async (uri: string) => {
  return (await axios.get(uri)).data;
};

export const axiosAll = (request: any[]) => {
  return axios.all(request);
};
