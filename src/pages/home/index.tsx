import PostForm from 'components/posts/PostForm';
import PostBox from 'components/posts/PostBox';
export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: any;
}

const posts: PostProps[] = [
  {
    id: '1',
    email: 'user1@ruu.kr',
    content: '내용',
    createdAt: '2023-08-21',
    uid: '123',
  },
  {
    id: '2',
    email: 'user1@ruu.kr',
    content: '내용',
    createdAt: '2023-08-21',
    uid: '123',
  },
  {
    id: '3',
    email: 'user1@ruu.kr',
    content: '내용',
    createdAt: '2023-08-21',
    uid: '123',
  },
  {
    id: '4',
    email: 'user1@ruu.kr',
    content: '내용',
    createdAt: '2023-08-21',
    uid: '123',
  },
  {
    id: '5',
    email: 'user1@ruu.kr',
    content: '내용',
    createdAt: '2023-08-21',
    uid: '123',
  },
  {
    id: '6',
    email: 'user1@ruu.kr',
    content: '내용',
    createdAt: '2023-08-21',
    uid: '123',
  },
];

export default function HomePage() {
  return (
    <div className='home'>
      <div className='home__title'>Home</div>
      <div className='home__tabs'>
        <div className='home__tab home__tab--active'>For You</div>
        <div className='home__tab'>Following</div>
      </div>
      <PostForm />
      <div className='post'>
        {posts?.map((post) => (
          <PostBox key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
