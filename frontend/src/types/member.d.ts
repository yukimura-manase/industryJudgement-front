/** Member情報 の型定義 */
export interface MemberType {
  id: number;
  full_name: string | null; //	ユーザーネーム
  biography: string | null; // 詳細・説明文
  thumbnail: string | null; //	プロフィール画像のURL
  follows: number | null; //	フォロー数
  followers: number | null; //	フォロワー数
  gender: number | null; //	性別
  generation: number | null; //	年代
  posts: { id: number; title: string; content: string }[]; // 投稿情報・List
}
