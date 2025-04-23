import { Dropdown } from "react-native-element-dropdown";
import { styles } from "./styles";
import { ArrowIcon } from "../Icons/ArrowIcon";

export interface SelectEvent {
  _index: number;
  label: string;
  value: string;
}

export interface SelectProps {
  defaultValue?: string;
  data: { label: string; value: string }[];
  onChange: (e: SelectEvent) => void;
}

export default function Select(props: SelectProps) {
  const { defaultValue, ...propsRest } = props;
  return (
    <Dropdown
      confirmSelectItem
      mode="auto"
      value={defaultValue}
      style={styles.container}
      placeholderStyle={styles.selectedItemText}
      itemTextStyle={styles.itemText}
      selectedTextStyle={styles.selectedItemText}
      renderRightIcon={() => <ArrowIcon width={28} height={28} style={styles.rightIcon} />}
      labelField="label"
      valueField="value"
      {...propsRest}
    />
  );
}
