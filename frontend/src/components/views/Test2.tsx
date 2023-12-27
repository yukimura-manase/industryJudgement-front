/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface Card {
  id: number;
  participant: string;
  affiliation: string;
}

const Test2 = () => {
  /** 名前と部署の名簿情報List */
  const cardList: Card[] = [
    { id: 1, participant: "ロボたま", affiliation: "エンジニア" },
    { id: 2, participant: "まりたま", affiliation: "エンジニア" },
    { id: 3, participant: "白桃", affiliation: "営業部" },
    { id: 4, participant: "ももちゃん", affiliation: "営業部" },
    { id: 5, participant: "まさぴょん", affiliation: "営業部" },
    { id: 6, participant: "まりぴょん", affiliation: "デザイナー" },
    { id: 7, participant: "ハム太郎", affiliation: "エンジニア" },
    { id: 8, participant: "ロボ太郎", affiliation: "デザイナー" },
    { id: 9, participant: "まり太郎", affiliation: "デザイナー" },
    { id: 10, participant: "ぷる玉", affiliation: "人事部" },
    { id: 11, participant: "ぷるぷる玉", affiliation: "人事部" },
    { id: 12, participant: "ロボ玉試作1号機", affiliation: "エンジニア" },
    { id: 13, participant: "ロボ玉試作2号機", affiliation: "デザイナー" },
    { id: 14, participant: "ロボ玉試作1号機", affiliation: "ロボ玉開発部" },
  ];

  return (
    <div css={EmotionStyle.cardListWrapperStyle}>
      <div css={EmotionStyle.cardListContainerStyle}>
        {cardList.map((card: Card, index: number) => {
          // mapメソッドの内部で、条件文を記述する
          if (cardList.length === index + 1) {
            return (
              <div>
                <div css={EmotionStyle.cardStyle}>
                  <span>ID: {card.id}</span>|
                  <span>所属・部署: {card.affiliation}</span>|
                  <span>名前: {card.participant}</span>
                </div>
                <div>〜完〜</div>
              </div>
            );
          } else {
            return (
              <div css={EmotionStyle.cardStyle}>
                <span>ID: {card.id}</span>|
                <span>所属・部署: {card.affiliation}</span>|
                <span>名前: {card.participant}</span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

/** EmotionStyle */
const EmotionStyle = {
  /** CardList の Wrapper Style */
  cardListWrapperStyle: css`
    width: 80%;
    margin: 0 auto;
    text-align: center;
  `,
  /** CardList の Container Style */
  cardListContainerStyle: css`
    background-color: rgb(244, 246, 247);
    border-radius: 8px;
    padding: 12px;
  `,
  /** 1つの Card の Style */
  cardStyle: css`
    display: flex;
    gap: 8px;
    &:hover {
      cursor: pointer;
      background: #d9d9d9;
    }
  `,
};

export default Test2;
