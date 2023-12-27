import { memo, useState } from "react";
/** Drag and Drop (DnD) Hooks */
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortableCardType } from "./type";
import styled from "styled-components";

interface EditSortableCardType extends SortableCardType {
  inputSetter: (editId: string, title: string) => void;
}

/** Drag & Drop で並び替え対象となる 最小単位の Card_Component */
const DndCard = memo<EditSortableCardType>(
  ({ id, title, orderKey, inputSetter }) => {
    /**
     * 1. NOTE: useSortable を利用して、ドラッグ可能なコンポーネントを定義する
     * id: 一意となる Key を設定する
     * => id　は、String型である必要があるので、注意！
     */
    const { attributes, listeners, setNodeRef, transform, isSorting } =
      useSortable({ id });

    /**
     * 2. NOTE: Drag & Drop の際に使用する Style => 立体移動
     * */
    const style = {
      transform: CSS.Translate.toString(transform), // Outputs => `translate3d(x, y, 0)`
      cursor: "grab",
      border: isSorting ? "1px solid rgba(0, 0, 0, 0.12)" : "",
      boxShadow: isSorting ? "0px 4px 8px rgba(0, 0, 0, 0.2)" : "",
      backgroundColor: "rgb(246, 246, 246)",
    };

    const [cardTitle, setCardTitle] = useState<string>(title);

    /**
     * NOTE: Component内の State_Update & 上の階層の 親_State_Update(cardDataList)する
     *  */
    const inputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCardTitle(e.target.value);
      inputSetter(id, e.target.value);
    };

    /**
     * NOTE: DnD領域での、Enterキーを無効化する。
     * => inputタグで、文字入力中に、Enterを押すと、DnDモードになってしまうため。
     */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        // Enter_Event_Cancel
        event.preventDefault();
      }
    };

    return (
      <div>
        {/* attributes、listenersはDOMイベントを検知するために使用する */}
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          style={style}
          onKeyDown={handleKeyDown}
        >
          {/* String型の id で、要素を識別する */}
          <div id={id}>
            <TextInputWrapper>
              <input
                type="text"
                value={cardTitle}
                onChange={(e) => {
                  inputTitle(e);
                }}
              />
            </TextInputWrapper>
          </div>
        </div>
      </div>
    );
  }
);

/**  App_ComponentでのStyle */
const TextInputWrapper = styled.div`
  /* 入力フォームのStyle */

  input {
    font-size: 16px;
  }

  input[type="text"],
  input[type="email"] {
    box-sizing: border-box;
    width: 60%;
    display: block;
    margin: 0 auto;
    border-radius: 5px;
    line-height: 2rem; /* 高さを確保する */
    border: 1px solid #cccccc;
    padding: 5px 8px;
  }
`;

export default DndCard;
