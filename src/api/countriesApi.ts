import axios from 'axios';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IData } from '../pages/home/components/Card/cardReducer';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL,
});

export const fetchCountries = async (sortOrder: string, page: number, limit: number): Promise<IData[]> => {
  const response = await axiosInstance.get(`/countries?_sort=${sortOrder}&_page=${page}&_limit=${limit}`);
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
  const response = await axiosInstance.put(
    `/countries/${updatedCountry.id}`,
    updatedCountry
  );
  return response.data;
};

export const deleteCountry = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/countries/${id}`);
};

export const likeCountry = async (id: string): Promise<IData> => {
  const response = await axiosInstance.get(`/countries/${id}`);
  const updatedCountry = { ...response.data, likes: response.data.likes + 1 };
  await axiosInstance.put(`/countries/${id}`, updatedCountry);
  return updatedCountry;
};

// Custom hooks
export const useFetchCountries = (sortOrder: string, limit: number) => {
  return useInfiniteQuery<IData[], Error>({
    queryKey: ['countries', sortOrder],
    queryFn: ({ pageParam = 1 }) => fetchCountries(sortOrder, pageParam as number, limit),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === limit) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};

export const useFetchCountry = (id: string) => {
  return useQuery<IData, Error>({
    queryKey: ['country', id],
    queryFn: () => fetchCountry(id),
  });
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

export const useLikeCountry = () => {
  const queryClient = useQueryClient();
  return useMutation<IData, Error, string>({
    mutationFn: likeCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] });
    },
  });
};