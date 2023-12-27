import { CSSProperties, Dispatch, SetStateAction, useState } from "react";

/** Propsの型定義 */
interface PropsType {
  id: number | string;
  isCheck: boolean;
  style?: CSSProperties;
  setter: Dispatch<SetStateAction<boolean>>;
  disabled: boolean;
}

/**
 * NOTE: SquareCheckBox
 * => 四角い CheckBox Component
 */
const SquareCheckBox = (props: PropsType) => {
  /** 一意の ID を文字列化したもの */
  const id = String(props.id);
  /** Check の ON/OFF */
  const [checked, setChecked] = useState<boolean>(props.isCheck);
  /** Checkによる ON/OFF_Switch */
  const onSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("onSwitch_Call", checked);

    setChecked(event.target.checked);
    props.setter(event.target.checked);
  };
  /** DefaultStyle: 白い四角形のCheckBox */
  const defaultStyle = {
    width: "25px",
    height: "25px",
    border: "3px solid #fff",
    borderRadius: "3px",
    cursor: "pointer",
  };

  return (
    <div style={props.style ? props.style : defaultStyle}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onSwitch(e)}
        disabled={props.disabled}
      />
    </div>
  );
};
export default SquareCheckBox;
