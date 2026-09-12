import { useQuery } from '@tanstack/react-query';

import { BASE_URL } from '@/common/const';
import { throwIfNotOk } from '@/lib/httpError';
import { Contributor } from '@/common/types/contributor';

const fetchContributors = async (): Promise<Contributor[]> => {
  const res = await fetch(`${BASE_URL}/api/contributor`, {
    method: 'GET',
  });
  throwIfNotOk(res, 'contributor 요청 실패');
  const { data } = await res.json();
  return data;
};

export const useContributors = () => {
  return useQuery({
    queryKey: ['contributors'],
    queryFn: fetchContributors,
  });
};
