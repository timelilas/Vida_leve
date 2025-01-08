import { StyleSheet, View, FlatList } from "react-native";
import { mockedMonths, mockedYears } from "./data";
import { numberToMonth, toCapitalized } from "../../utils/helpers";
import { CalendarMenuItem } from "./CalendarMenuItem";
import { CalendarSection, GenericItem } from "./types";
import { CalendarControlButton } from "./CalendarControlButton";
import { CalendarFooterButton } from "./CalendarFooterButton";

interface CalendarMenuProps {
  month: number;
  year: number;
  section: CalendarSection;
  selectSection: (section: CalendarSection) => void;
  selectMonth: (month: number) => void;
  selectYear: (year: number) => void;
}

export function CalendarMenu(props: CalendarMenuProps) {
  const monthName = numberToMonth(props.month);

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

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "#EFF0F6",
    borderRadius: 16,
    borderColor: "#CAC4D0",
    borderWidth: 1,
  },
  header: {
    paddingVertical: 8,
    paddingHorizontal: 52,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#CAC4D0",
    borderBottomWidth: 1,
  },
  listContainer: {
    maxHeight: 272.5,
  },
  sectionButton: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    gap: 8,
    flexDirection: "row",
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
    fontFamily: "Roboto-500",
    color: "#49454F",
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: "flex-end",
  },
});
