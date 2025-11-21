import { Suspense, use } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

// データの型
interface Comment {
  id: string;
  postId: number;
  userId: number;
  comment: string;
}

// サーバーと通信してデータを取る関数
export async function getComments(): Promise<Comment[]> {
  const response = await fetch("https://jsonplaceholder.org/comments");
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}

// データフェッチを解決して表示するコンポーネント
function Comments(props: { promise: Promise<Comment[]> }) {
  const comments = use(props.promise);

  return (
    <div>
      {comments.map((v) => (
        <p key={v.id}>{v.comment}</p>
      ))}
    </div>
  );
}

// データを表示するコンポーネント
export function SuspenseDataFetching() {
  const commentsPromise = getComments();

  return (
    <ErrorBoundary
      FallbackComponent={(props: FallbackProps) => <p>エラー: {props.error}</p>}
    >
      <Suspense fallback={<p>読み込み中</p>}>
        <Comments promise={commentsPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}
