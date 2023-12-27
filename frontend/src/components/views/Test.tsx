import { useState, CSSProperties } from "react";
import IconMsgButton from "../ui-elements/button/IconMsgButton";
import ImageIconSvg from "../ui-elements/icons/ImageIconSvg";
import MovieIconSvg from "../ui-elements/icons/MovieIconSvg";

const Test = () => {
  /** Btnで、Selectした 投稿コンテンツの表示タイプ管理 State => 初期値は、フィード(PR除外) */
  const [selectContentDisplayType, setSelectContentDisplayType] =
    useState<number>(1);

  /** Selectしていない場合の iconBtn の Style */
  const noSelectIconBtnStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    width: "170px",
    height: "35px",
    backgroundColor: "#AFAEB3",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  } as CSSProperties;

  return (
    <div>
      {/* Btn Block */}
      <div
        style={{
          display: "flex",
          gap: "8px",
        }}
      >
        <IconMsgButton
          btnId={"image-type-btn"}
          svgIcon={<ImageIconSvg />}
          text={"画像"}
          callBack={setSelectContentDisplayType}
          callbackId={1}
          wrapperStyle={
            selectContentDisplayType === 1 ? undefined : noSelectIconBtnStyle
          }
        />
        <IconMsgButton
          btnId={"movie-type-btn"}
          svgIcon={<MovieIconSvg />}
          text={"動画"}
          callBack={setSelectContentDisplayType}
          callbackId={2}
          wrapperStyle={
            selectContentDisplayType === 2 ? undefined : noSelectIconBtnStyle
          }
        />
      </div>
      <div>
        <div>Content Block</div>
      </div>
    </div>
  );
};

export default Test;
