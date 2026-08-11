import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { BASE_URL } from '@/common/const';
import { throwIfNotOk } from '@/lib/httpError';
import { ListPostsResponseDto } from '@/common/types/board';

const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

interface LikePostResponseDto {
  success: boolean;
  likes: number;
}

const fetchPosts = async (cursor?: string): Promise<ListPostsResponseDto> => {
  const url = cursor
    ? `${BASE_URL}/api/vl/post?cursor=${cursor}`
    : `${BASE_URL}/api/vl/post`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      ...getAuthHeader(),
    },
  });

  throwIfNotOk(res, 'posts 요청 실패');

  return res.json();
};

export const usePosts = () => {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => fetchPosts(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.nextCursor ?? undefined : undefined,
  });
};

const likePost = async (id: string): Promise<LikePostResponseDto> => {
  const res = await fetch(`${BASE_URL}/api/vl/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify({ id }),
  });

  throwIfNotOk(res, 'like 요청 실패');

  return res.json();
};

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,
    onSuccess: (data, id) => {
      queryClient.setQueryData<{ pages: ListPostsResponseDto[]; pageParams: (string | undefined)[] }>(
        ['posts'],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.map((post) =>
                post.id === id ? { ...post, likes: data.likes } : post
              ),
            })),
          };
        }
      );
    },
  });
};

const createPost = async (content: string) => {
  const res = await fetch(`${BASE_URL}/api/vl/post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify({ stdNo: '0', content }),
  });

  throwIfNotOk(res, 'post 생성 실패');

  return res.json();
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ['posts'] });
    },
  });
};