import { useEffect, useState } from "react";

// データの型
interface Comment {
  id: string;
  postId: number;
  userId: number;
  comment: string;
}

// サーバーと通信してデータを取るカスタムフック
function useComments() {
  // データ
  const [value, setValue] = useState<Comment[]>([]);

  // 読込中の場合, true
  const [loading, setLoading] = useState(true);

  // エラーが起きた場合、何か文字列が入る
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    setLoading(true);
    (async () => {
      const response = await fetch("https://jsonplaceholder.org/comments");
      if (!response.ok) {
        setError(response.statusText);
        setLoading(false);
        return;
      }
      setValue(await response.json());
      setLoading(false);
    })();
  }, []);

  return { value, loading, error };
}

// データを表示するコンポーネント
export function UseEffectDataFetching() {
  const comments = useComments();

  if (comments.error) {
    return <p>エラー: {comments.error}</p>;
  }

  if (comments.loading) {
    return <p>読み込み中</p>;
  }

  return (
    <div>
      {comments.value.map((v) => (
        <p key={v.id}>{v.comment}</p>
      ))}
    </div>
  );
}
