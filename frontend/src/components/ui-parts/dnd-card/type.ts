/** Cardの型定義 */
export interface CardType {
  id: number;
  title: string;
  orderKey: number;
}

/** Sort用の id:string な場合のCardの型定義 */
export interface SortableCardType {
  id: string;
  title: string;
  orderKey: number;
}
