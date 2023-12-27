import styled from "styled-components";
import { useEffect, useState } from "react";
/** DnD関係の Import */
import {
  closestCorners,
  DndContext,
  useDroppable,
  KeyboardSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { CardType, SortableCardType } from "./type";

import DndCard from "./DndCard";

/** Drag & Drop (DnD)が可能な Board */
const DndBoard = () => {
  /** Drag & Drop で並び替えが可能な CardDataList (TestDataSet) */
  const cardList: CardType[] = [
    { id: 1, title: "ロボ玉のぷるぷる日記", orderKey: 2 },
    { id: 2, title: "白桃さんのお家探検", orderKey: 6 },
    { id: 3, title: "まさぴょんのBlog", orderKey: 3 },
    { id: 4, title: "まり玉のハムハム記録", orderKey: 1 },
    { id: 5, title: "ももたんと白桃にゃんのバトル", orderKey: 4 },
    { id: 6, title: "Marissa の English指導", orderKey: 5 },
  ];

  /** CardList の StateData */
  const [cardDataList, setCardList] = useState<CardType[]>([]);

  useEffect(() => {
    // 初回だけ、fetch した CardList の DataSetを Setする
    setCardList(cardList);
  }, []);

  /**
   * 1. useDroppable: ドロップ可能なコンポーネントを作成する Hooks
   * ドロップ可能にしたい領域の DOM要素に対して、ref を渡す
   * ドロップ可能なコンポーネントで一意になるように、ユニークIDを振る
   */
  const { setNodeRef } = useDroppable({
    id: "card_droppable_board",
  });
  /** Drag終了時に発火するEvent */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    /** Active_Card_Id: 動かしている Card の id */
    const activeId = active.id;

    /** Over_Card_Id: 重なっている Card の id */
    const overId = over ? over.id : null;
    const activeIndex = cardDataList.findIndex(
      (card) => card.id === Number(activeId)
    );

    const overIndex = cardDataList.findIndex(
      (card) => card.id === Number(overId)
    );
    // console.log("cardDataList_Update前", cardDataList);

    /** 配列の並び替えを実行する => Indexの変更 */
    const moveCardDataList = arrayMove(cardDataList, activeIndex, overIndex);

    // orderKey を変更する処理 => orderKey に NewIndexをSetする
    moveCardDataList.forEach((card, index) => {
      card.orderKey = index + 1;
    });
    // console.log("moveCardDataList", moveCardDataList);
    // Edit_Dataの順序を変更する
    setCardList(moveCardDataList);
  };

  /** 2. Sensors: DnD領域内のセンサーをカスタムする */
  const sensors = useSensors(
    /** Mouse: マウス操作で、5px以上離れたら */
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    /** Touch: タッチ操作で、5px以上離れたら */
    useSensor(TouchSensor, { activationConstraint: { distance: 5 } }),
    /** Keyboard */
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  /** DnD対応のための Sort可能な DataSet => id を String型に変換した DataSet */
  const [sortableCardList, setSortableCardList] = useState<SortableCardType[]>(
    []
  );
  useEffect(() => {
    const copyCardList = JSON.parse(JSON.stringify(cardDataList));
    /**
     * DnD のSort操作のためには、Number型ではなく、String型である必要があるため、
     * => id (number) を String 変換して Sort用の dndId を作成する
     * */
    const sortableCardList = copyCardList.map((card: any) => {
      const dndId = String(card.id);
      card.id = dndId;
      return card;
    });
    console.log("sortableCardList", sortableCardList);
    setSortableCardList(sortableCardList);
  }, [cardDataList]);

  /** Editした  */
  const editTitleCallback = (editId: string, title: string): void => {
    const copyCardList = JSON.parse(JSON.stringify(cardDataList));
    /** editId から、Target の Dataを取得する => Title を Edit内容で、Updateする。 */
    const editData = copyCardList.find(
      (card: CardType) => card.id === Number(editId)
    );
    editData.title = title;
    // Edit_Dataの順序を変更する
    setCardList(copyCardList);
  };

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Task管理ボード
      </h2>
      <hr />
      {/* 3. DnD できる領域のタグを DndContextで、Wrapする => DnD設定をする */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        {/* 4. DnDで、Sort可能な領域の Context */}
        <SortableContext
          id={"card_droppable_board"}
          items={sortableCardList}
          strategy={verticalListSortingStrategy}
        >
          {/* 1. useDroppable => DnD 可能な領域 */}
          <div ref={setNodeRef}>
            {sortableCardList.map((card) => {
              return (
                // NOTE: key が index だと、Sort後の配列の Index変更で、Reactが要素の変更を判別できないので、注意する
                <DndCard
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  orderKey={card.orderKey}
                  inputSetter={editTitleCallback}
                />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default DndBoard;
