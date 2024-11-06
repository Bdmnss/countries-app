import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IData } from '../pages/home/components/Card/cardReducer';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL,
});

export const fetchCountries = async (): Promise<IData[]> => {
  const response = await axiosInstance.get('/countries');
  return response.data;
};

export const fetchCountry = async (id: string): Promise<IData> => {
  const response = await axiosInstance.get(`/countries/${id}`);
  return response.data;
};

export const addCountry = async (newCountry: IData): Promise<IData> => {
  const response = await axiosInstance.post('/countries', newCountry);
  return response.data;
};

export const updateCountry = async (updatedCountry: IData): Promise<IData> => {
  const response = await axiosInstance.put(`/countries/${updatedCountry.id}`, updatedCountry);
  return response.data;
};

export const deleteCountry = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/countries/${id}`);
};

// Custom hooks
export const useFetchCountries = () => {
  return useQuery<IData[], Error>({ queryKey: ['countries'], queryFn: fetchCountries });
};

export const useFetchCountry = (id: string) => {
  return useQuery<IData, Error>({ queryKey: ['country', id], queryFn: () => fetchCountry(id) });
};

export const useAddCountry = () => {
  const queryClient = useQueryClient();
  return useMutation<IData, Error, IData>({
    mutationFn: addCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] });
    },
  });
};

export const useUpdateCountry = () => {
  const queryClient = useQueryClient();
  return useMutation<IData, Error, IData>({
    mutationFn: updateCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] });
    },
  });
};

export const useDeleteCountry = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] });
    },
  });
};