import { CSSProperties, useCallback, useEffect, useRef } from "react";
import VerticalLine from "../line/VerticalLine";
import HorizontalLine from "../line/HorizontalLine";
import Spacer from "../space/Spacer";
import Menu from "../../ui-parts/menu/Menu";

/** Propsの型定義 */
interface PropsType {
  /** 開閉を管理する Flag */
  isOpen: boolean;
  /** Dialogを閉じるためのFunction */
  onClose?: VoidFunction;
  dialogStyle?: CSSProperties;
  dialogInnerStyle?: CSSProperties;
}

/**
 * NOTE: CustomDialog
 * => dialogタグを使って、作成した Custom 可能な Dialog Component
 */
const CustomDialog = (props: PropsType) => {
  const { onClose, isOpen, dialogStyle, dialogInnerStyle } = props;

  /**
   * Dialog_Element
   * => useRef() で、dialogタグを参照する
   */
  const dialogRef = useRef<HTMLDialogElement>(null);

  /** isOpen の変更を検知して動作する */
  useEffect((): void => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) {
      return;
    }
    // 1. Dialog Open Flag === true
    if (isOpen) {
      // 1-2. 属性値: open が Set されていたら、処理終了
      if (dialogElement.hasAttribute("open")) {
        return;
      }
      // 1-3. showModal()で、Dialogを表示する
      // => top-layer と backdrop の設定も自動で追加される
      dialogElement.showModal();
    } else {
      // 2. Dialog Open Flag === false
      // 2-1. 属性値: open が Set されていなかったら、処理終了
      if (!dialogElement.hasAttribute("open")) {
        return;
      }
      // 2-2. close()で、Dialogを閉じる
      dialogElement.close();
    }
  }, [isOpen]);

  /**
   * Dialog を Close する Func
   * => Closeボタン or Dialog の外部領域を Click すると Call
   */
  const onCloseDialog = useCallback((): void => {
    onClose?.();
  }, [onClose]);

  /** Dialog の 内部領域の Close Event を Cancel する */
  const handleClickContent = useCallback(
    (event: React.MouseEvent<HTMLDivElement>): void => {
      // clickイベントの伝搬を止める。
      event.stopPropagation();
      console.log("Dialog Click");
    },
    []
  );

  /** Dialog の DefaultStyle */
  const defaultDialogStyle = {
    padding: "0" /** PaddingもDialog外部領域と判定されるので、0にする */,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid black",
    borderRadius: "8px",
  } as CSSProperties;

  /** Dialogの Inner Div の Style */
  const defaultDialogInnerStyle = {
    width: "500px",
    height: "500px",
    padding: "1em",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  } as CSSProperties;

  return (
    <dialog
      ref={dialogRef}
      onClick={() => {
        onCloseDialog();
      }}
      style={dialogStyle ? dialogStyle : defaultDialogStyle}
    >
      {/* Dialog Inner 領域 => 内側は、CloseBtn 以外では、閉じられないように EventCancel する */}
      <div
        onClick={(e) => {
          handleClickContent(e);
        }}
        style={dialogInnerStyle ? dialogInnerStyle : defaultDialogInnerStyle}
      >
        {/* <h2>Dialog_Test</h2> */}
        <h2>ロボ玉のぷるぷる日記🔥</h2>
        {/* HorizontalLine: 水平線(横線) Component */}
        <HorizontalLine />
        <Menu />

        {/* Spacer: 間隔調整 Component */}
        <Spacer
          width={"50px"}
          height={"50px"}
          margin={"12px 15px"}
          styleObj={{ backgroundColor: "blue" }}
        />
        <button
          onClick={() => onCloseDialog()}
          style={{ width: "60px", height: "30px" }}
        >
          Close
        </button>
      </div>
    </dialog>
  );
};
export default CustomDialog;
