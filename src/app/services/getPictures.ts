import { api } from './api';
import { Response } from '../types/response';

export async function getPictures(
  page: number,
  pageSize: number,
): Promise<Response> {
  const { data } = await api.get(
    `/api/pictures?page=${page}&pageSize=${pageSize}`,
  );

  return data;
}
