import { useState, useRef, useEffect } from 'react';
import { usePosts, useLikePost, useCreatePost } from '@/reactQuery/guestbookQuery';
import { Heart, Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

function Guestbook() {
  const [newMessage, setNewMessage] = useState('');
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
    likePost(id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    createPost(newMessage, {
      onSuccess: () => setNewMessage(''),
    });
  };

  const posts = data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <div className="text-center py-4">로딩 중...</div>;
  }

  return (
    <div className="space-y-4 p-1 pr-3">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value.slice(0, 300))}
          placeholder="메시지를 작성하세요... (최대 300자)"
          maxLength={300}
          className="flex-1 px-4 py-2 min-h-[80px] resize-none"
        />
        <Button
          type="submit"
          className="px-4 py-2 bg-primary text-white flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">전송</span>
        </Button>
      </form>

      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-sm">
                  ?
                </div>
                <div>
                  <p className="text-sm text-gray-900">
                    {post.isAdmin ? (
                      <span className="ml-1 text-xs text-blue-600 font-medium">관리자</span>
                    ) : (
                      <span className="ml-1 text-xs text-primary font-medium">사용자</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-3">{post.content}</p>

            <Button
              variant="ghost"
              onClick={() => handleLike(post.id)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span>{post.likes}</span>
            </Button>
          </div>
        ))}
        <div ref={loadMoreRef} className="h-1" />
        {isFetchingNextPage && (
          <div className="text-center py-2 text-gray-500">더 불러오는 중...</div>
        )}
      </div>
    </div>
  )
}

export default Guestbook;