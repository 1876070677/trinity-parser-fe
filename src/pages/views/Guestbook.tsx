import { useState, useRef, useEffect } from 'react';
import { Heart, Send } from 'lucide-react';

import { usePosts, useLikePost, useCreatePost, getLikedPostIds } from '@/reactQuery/guestbookQuery';
import { ListPostsResponseDto } from '@/common/types/board';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

const MAX_LENGTH = 300;

type Post = ListPostsResponseDto['data'][number];

interface PostCardProps {
  post: Post;
  isLiked: boolean;
  onLike: () => void;
}

function PostCard({ post, isLiked, onLike }: PostCardProps) {
  return (
    <div className="bg-sub-background border border-black/[0.04] hover:bg-white rounded-2xl p-4 transition-all duration-200 space-y-2.5 shadow-2xs hover:shadow-xs">
      {/* Header: Avatar, Name, Time */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 shadow-2xs",
              post.isAdmin
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 border border-gray-200/60'
            )}
          >
            {post.isAdmin ? '관리' : '학우'}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-gray-900">
                {post.isAdmin ? '관리자' : '익명 학우'}
              </span>
              {post.isAdmin && (
                <span className="text-[10px] font-semibold text-gray-900 bg-white px-1.5 py-0.5 rounded border border-gray-200/60 shadow-2xs">
                  Admin
                </span>
              )}
            </div>
            <p className="text-[10px] text-gray-400">
              {new Date(post.createdAt).toLocaleDateString('ko-KR', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>

        {/* Like Button */}
        <Tooltip>
          <TooltipTrigger
            type="button"
            onClick={onLike}
            aria-pressed={isLiked}
            aria-disabled={isLiked}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border shadow-2xs transition-all',
              isLiked
                ? 'text-rose-600 border-rose-200 cursor-default'
                : 'text-gray-500 border-gray-200/60 hover:text-rose-600 hover:border-rose-200 cursor-pointer'
            )}
          >
            <Heart
              className={cn(
                'w-3.5 h-3.5 transition-colors',
                isLiked ? 'text-rose-500 fill-rose-500' : 'text-gray-400 hover:text-rose-500'
              )}
            />
            <span className="text-[11px] text-gray-700 font-mono">{post.likes}</span>
          </TooltipTrigger>
          <TooltipContent>{isLiked ? '이미 좋아요한 글입니다' : '좋아요'}</TooltipContent>
        </Tooltip>
      </div>

      {/* Message Body */}
      <p className="text-xs text-gray-800 leading-relaxed break-words whitespace-pre-line font-medium pl-0.5">
        {post.content}
      </p>
    </div>
  );
}

function Guestbook() {
  const [newMessage, setNewMessage] = useState('');
  const [likedIds, setLikedIds] = useState(getLikedPostIds);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = usePosts();

  const { mutate: likePost } = useLikePost();
  const { mutate: createPost } = useCreatePost();

  const handleLike = (id: string) => {
    if (likedIds.has(id)) return;
    likePost(id, {
      onSuccess: () => setLikedIds((prev) => new Set(prev).add(id)),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    createPost(newMessage, {
      onSuccess: () => setNewMessage(''),
    });
  };

  const posts = data?.pages.flatMap((page) => page.data) ?? [];

  // 로딩 중에는 sentinel이 마운트되지 않으므로 isLoading도 의존성에 둔다.
  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(target);

    return () => observer.disconnect();
  }, [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 rounded-full border-2 border-gray-900 border-t-transparent animate-spin mx-auto"></div>
          <p className="text-xs text-gray-400 font-medium">방명록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden space-y-3 p-1 pr-1">
      {/* Integrated Message Input Composer */}
      <form
        onSubmit={handleSubmit}
        className="shrink-0 bg-sub-background border border-black/[0.04] p-3.5 rounded-2xl focus-within:bg-white focus-within:border-gray-300 focus-within:ring-2 focus-within:ring-black/5 focus-within:shadow-xs transition-all duration-200"
      >
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value.slice(0, MAX_LENGTH))}
          placeholder={`따뜻한 응원이나 의견을 남겨주세요... (최대 ${MAX_LENGTH}자)`}
          maxLength={MAX_LENGTH}
          rows={2}
          className="w-full bg-transparent border-none outline-none resize-none text-xs text-gray-800 placeholder-gray-400 focus:ring-0 p-0 leading-relaxed font-medium"
        />
        <div className="flex items-center justify-between pt-2 border-t border-gray-200/60 mt-1.5">
          <span className="text-[11px] font-mono text-gray-400">
            {newMessage.length} / {MAX_LENGTH}자
          </span>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gray-900 hover:bg-black disabled:opacity-30 text-white shadow-xs active:scale-95 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
          >
            <span>등록</span>
            <Send className="w-3 h-3" />
          </button>
        </div>
      </form>

      {/* Guestbook Feed List (Dedicated Inner Scroll) */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            isLiked={likedIds.has(post.id)}
            onLike={() => handleLike(post.id)}
          />
        ))}

        <div ref={loadMoreRef} className="h-1" />
        {isFetchingNextPage && (
          <div className="text-center py-2 text-xs text-gray-400 animate-pulse">
            더 불러오는 중...
          </div>
        )}
      </div>
    </div>
  );
}

export default Guestbook;
