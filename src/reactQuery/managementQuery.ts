import { useQuery } from '@tanstack/react-query';

import { BASE_URL } from '@/common/const';
import { throwIfNotOk } from '@/lib/httpError';

interface LoginCountResponse {
  count: number;
}

const fetchLoginCount = async (): Promise<number> => {
  const res = await fetch(`${BASE_URL}/api/login-count`, {
    method: 'GET',
  });
  throwIfNotOk(res, 'login-count 요청 실패');
  const data: LoginCountResponse = await res.json();
  return data.count;
};

export const useLoginCount = () => {
  return useQuery({
    queryKey: ['loginCount'],
    queryFn: fetchLoginCount,
  });
};