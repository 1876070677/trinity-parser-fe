interface PostItem {
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
