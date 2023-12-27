import { Switch } from "@mui/material";
import { useState, CSSProperties, Dispatch, SetStateAction } from "react";
/** Propsの型定義 */
interface PropsType {
  default: boolean;
  style?: CSSProperties;
  setter: Dispatch<SetStateAction<boolean>>;
  disabled: boolean;
}
/** Switchコンポーネント: Propsで、defaultの真偽値や Setterを受け取る */
const CheckSwitch = (props: PropsType) => {
  const [checked, setChecked] = useState<boolean>(props.default);
  const onSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    props.setter(event.target.checked);
  };
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <div style={props.style ? props.style : undefined}>
        <Switch
          checked={checked}
          onChange={(e) => onSwitch(e)}
          name="testSwitch"
          disabled={props.disabled}
        />
      </div>
    </div>
  );
};
export default CheckSwitch;
