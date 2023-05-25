import { Card } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export interface Post {
  title: string;
  contents: string;
  createdAt: string;
  summary: string;
  text: string;
}

interface MyPostListProps {
  postList: Post[];
}
export function MyPostList({ postList }: MyPostListProps) {
  return (
    <div style={{ height: "100%", overflowY: "scroll" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Card>
          <Link to="/post/write">글쓰기</Link>
        </Card>
        <Card>
          <Link to="/resume/write">이력서 작성하기</Link>
        </Card>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "30px",
          gap: "24px",
        }}
      >
        {postList.map((post) => (
          <Card
            title={post.title}
            extra={<p>{dayjs(post.createdAt).format("YYYY.MM.DD hh.mm")}</p>}
            style={{ width: 300 }}
          >
            <p>{post.summary}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
