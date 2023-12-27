import { CSSProperties, Dispatch, SetStateAction } from "react";

/** Propsの型定義 */
interface PropsType {
  /** label タグと連携して Click 判定領域を拡張するための id */
  btnId: string;
  /** SVG_Icon は JSX.Element として Component 定義したものを想定しています */
  svgIcon: JSX.Element;
  /** ボタンの表示 Text・ラベル */
  text: string;
  /** CallBack_Func => Setterを想定しています */
  callBack: Dispatch<SetStateAction<any>>;
  /** CallBack_Func で返す id */
  callbackId: number | string;
  wrapperStyle?: CSSProperties;
  textStyle?: CSSProperties;
  btnStyle?: CSSProperties;
  /** Icon の Position は Default で左なので、右の場合は、こちらを true にする */
  isIconPositionRight?: boolean;
}

/**
 * NOTE: IconMsgButton
 * => SVG_Icon or img & Text(MSG) を表示する Btn
 */
const IconMsgButton = (props: PropsType) => {
  const {
    btnId,
    svgIcon,
    text,
    callBack,
    callbackId,
    wrapperStyle,
    btnStyle,
    textStyle,
    isIconPositionRight,
  } = props;

  /** Default の Btn Style */
  const defaultWrapperStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    width: "170px",
    height: "35px",
    backgroundColor: "#59B9C6",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "600",
  } as CSSProperties;

  /** Default の Btn Style */
  const defaultBtnStyle = {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    outline: "none",
    padding: "0",
    appearance: "none",
  } as CSSProperties;

  /** Default の Text Style */
  const defaultTextStyle = {
    color: "white",
    fontWeight: "bold",
  } as CSSProperties;

  return (
    <label
      htmlFor={btnId}
      style={wrapperStyle ? wrapperStyle : defaultWrapperStyle}
      onClick={() => callBack(callbackId)}
    >
      {/* 左側_Iconの場合 */}
      {!isIconPositionRight && svgIcon}
      <button id={btnId} style={btnStyle ? btnStyle : defaultBtnStyle}>
        <span style={textStyle ? textStyle : defaultTextStyle}>{text}</span>
      </button>
      {/* 右側_Iconの場合 */}
      {isIconPositionRight && svgIcon}
    </label>
  );
};

export default IconMsgButton;
