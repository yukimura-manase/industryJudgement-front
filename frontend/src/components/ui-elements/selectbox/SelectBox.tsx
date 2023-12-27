import { useState } from "react";
import { MenuItem, Select } from "@mui/material";
interface OptionType {
  id: number;
  value: string;
}
type OptionList = OptionType[];
interface StyleObj {
  [key: string]: string;
}
interface PropsType {
  id: string;
  label?: string;
  options: OptionList;
  style?: StyleObj;
}

// MUIのSelectを利用したSelecBox_Component
const SelectBox = (props: PropsType) => {
  const options = props.options;
  // 選択中の SelectBox の Option
  const [selectedOption, setSelectedOption] = useState<OptionType>(options[0]);
  // SelectBoxの変更を検知して、SelectOption を Setする
  const selectChangeCategory = (value: string | undefined) => {
    const findOption = options.find((opt) => opt.value === value);
    if (findOption) {
      setSelectedOption(findOption);
    }
  };

  return (
    <Select
      labelId={props.label ? props.label : ""}
      id={props.id}
      value={selectedOption.value ?? ""}
      onChange={(event) => selectChangeCategory(event.target.value)}
      style={props.style ? props.style : {}}
    >
      {options.map((option) => (
        <MenuItem key={option.id} value={option.value}>
          {option.value}
        </MenuItem>
      ))}
    </Select>
  );
};
export default SelectBox;
