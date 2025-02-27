import { View, FlatList } from "react-native";
import { mockedMonths, mockedYears } from "../data";
import { numberToMonthName, toCapitalized } from "../../../utils/helpers";
import { CalendarMenuItem } from "../CalendarMenuItem";
import { CalendarSection, GenericItem } from "../types";
import { CalendarControlButton } from "../CalendarControlButton";
import { CalendarFooterButton } from "../CalendarFooterButton";
import { styles } from "./styles";

interface CalendarMenuProps {
  month: number;
  year: number;
  section: CalendarSection;
  selectSection: (section: CalendarSection) => void;
  selectMonth: (month: number) => void;
  selectYear: (year: number) => void;
}

export function CalendarMenu(props: CalendarMenuProps) {
  const monthName = numberToMonthName(props.month);

  function renderMonth({ item }: { item: GenericItem }) {
    return (
      <CalendarMenuItem
        item={item}
        onTouch={() => props.selectMonth(item.id)}
        selected={item.id === props.month}
      />
    );
  }

  function renderYear({ item }: { item: GenericItem }) {
    return (
      <CalendarMenuItem
        item={item}
        onTouch={() => props.selectYear(item.id)}
        selected={item.id === props.year}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CalendarControlButton
          label={toCapitalized(monthName).slice(0, 3)}
          onPress={() => props.selectSection("month")}
        />
        <CalendarControlButton
          label={`${props.year}`}
          onPress={() => props.selectSection("year")}
        />
      </View>
      {props.section === "month" && (
        <View style={styles.listContainer}>
          <FlatList
            nestedScrollEnabled
            extraData={props.month}
            renderItem={renderMonth}
            data={mockedMonths}
            keyExtractor={(item) => `${item.id}`}
          />
        </View>
      )}
      {props.section === "year" && (
        <View style={styles.listContainer}>
          <FlatList
            nestedScrollEnabled
            windowSize={4}
            extraData={props.year}
            renderItem={renderYear}
            data={mockedYears}
            keyExtractor={(item) => `${item.id}`}
          />
        </View>
      )}
      <View style={styles.footer}>
        <CalendarFooterButton
          label="Ok"
          onPress={() => props.selectSection("calendar")}
        />
      </View>
    </View>
  );
}
