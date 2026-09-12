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

// 좋아요 중복 방지는 클라이언트 기억에 의존한다 — 서버가 클릭마다 카운트를 올리기 때문이다.
// 브라우저를 바꾸거나 저장소를 지우면 다시 누를 수 있다. 서버가 '이미 좋아요' 여부를 내려주면 이 저장소는 그 값으로 대체한다.
const LIKED_POSTS_KEY = 'likedPostIds';

export const getLikedPostIds = (): Set<string> => {
  try {
    const raw = localStorage.getItem(LIKED_POSTS_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
};

const rememberLikedPost = (id: string) => {
  const ids = getLikedPostIds();
  ids.add(id);
  localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify([...ids]));
};

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
      rememberLikedPost(id);
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