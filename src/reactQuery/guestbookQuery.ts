import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { BASE_URL } from '@/common/const';
import { throwIfNotOk } from '@/lib/httpError';

const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export interface PostItem {
  id: string;
  stdNo: string;
  content: string;
  createdAt: Date;
  isAdmin: boolean;
  likes: number;
}

export interface ListPostsResponseDto {
  data: PostItem[];
  meta: {
    hasNextPage: boolean;
    nextCursor: string | null;
  };
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

const likePost = async (id: string) => {
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
    onSuccess: (_, id) => {
      queryClient.setQueryData<{ pages: ListPostsResponseDto[]; pageParams: (string | undefined)[] }>(
        ['posts'],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.map((post) =>
                post.id === id ? { ...post, likes: post.likes + 1 } : post
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