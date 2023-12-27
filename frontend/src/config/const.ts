/**
 * NOTE: 投稿の検索の Sort・SelectBox・Contents
 */
export const PostSearchSortConfigList = [
  {
    id: "post_date",
    main: "post_date",
    sub: "desc",
    name: "投稿日時が新しい順",
  },
  {
    id: "likes",
    main: "likes",
    sub: "desc",
    name: "いいね数の多い順",
  },
  {
    id: "comments",
    main: "comments",
    sub: "desc",
    name: "コメント数の多い順",
  },
  {
    id: "engagement",
    main: "engagement",
    sub: "desc",
    name: "エンゲージメント率の高い順",
  },
];

/**
 * NOTE: Sort 設定情報 Object の型
 */
export type SortSettingObjType = typeof PostSearchSortConfigList;
