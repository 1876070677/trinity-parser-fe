import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';

import { BASE_URL } from '@/common/const';
import { HttpError } from '@/lib/httpError';

const handleAuthError = async (error: unknown) => {
  if (error instanceof HttpError && (error.status === 401 || error.status === 500)) {
    localStorage.clear();
    try {
      await fetch(`${BASE_URL}/api/logout`, { method: 'POST' });
    } catch {
      // logout 요청 실패해도 리다이렉트 진행
    }
    window.location.href = '/';
  }
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleAuthError,
  }),
  mutationCache: new MutationCache({
    onError: handleAuthError,
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      retry: (failureCount, error) => {
        // 401, 500 에러는 retry 하지 않음
        if (error && typeof error === 'object' && 'status' in error) {
          const status = (error as { status: number }).status;
          if (status === 401 || status === 500 || status === 404) return false;
        }
        return failureCount < 1;
      },
      refetchOnWindowFocus: false,
    },
  },
});