import { api } from '@/config/api';
import { Response } from '@/app/types/response';

export async function getPictures(
  page: number,
  pageSize: number,
): Promise<Response> {
  const { data } = await api.get(
    `/api/pictures?page=${page}&pageSize=${pageSize}`,
  );

  return data;
}
