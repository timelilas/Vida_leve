import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  View,
} from "react-native";
import { ArrowIcon } from "../Icons/ArrowIcon";
import { styles } from "./styles";
import { DayItemButton } from "./DayItemButton";
import { mockedDays } from "./data";
import { useEffect, useMemo, useRef } from "react";
import { DateData } from "./types";
import { delay } from "../../utils/helpers";

interface DayPickerProps {
  currentDate: DateData | null;
  onSelectDate: (dateData: DateData) => void;
}

export function DayPicker(props: DayPickerProps) {
  const indexRef = useRef<number>(0);
  const listRef = useRef<FlatList | null>(null);

  const currentDateIndex = useMemo(() => {
    return mockedDays.findIndex(({ id }) => id === props.currentDate?.id);
  }, []);

  const initialNumToRender = currentDateIndex > 10 ? currentDateIndex + 1 : 10;

  useEffect(() => {
    delay(200).then(() => {
      if (currentDateIndex > 1) {
        listRef.current?.scrollToIndex({
          index: currentDateIndex,
          animated: false,
        });
      }
    });
  }, [currentDateIndex]);

  function handleScrollTo(direction: "right" | "left") {
    return () => {
      if (direction === "right") {
        indexRef.current = indexRef.current <= 0 ? 0 : indexRef.current - 1;
      }

      if (direction === "left") {
        const maxIndex = mockedDays.length - 1;
        indexRef.current =
          indexRef.current >= maxIndex ? maxIndex : indexRef.current + 1;
      }

      listRef.current?.scrollToIndex({
        index: indexRef.current,
        animated: true,
      });
    };
  }

  function handleFreeScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const ITEM_WIDTH = 102;
    const GAP = 8;
    const horizontalOffset = e.nativeEvent.contentOffset.x;
    const indexEstimation = Math.round(horizontalOffset / (ITEM_WIDTH + GAP));

    indexRef.current = indexEstimation;
  }

  function shouldDisable(dateData: DateData) {
    const todayDate = new Date();
    const todayLocalDate = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate()
    );
    const targetDate = new Date(dateData.year, dateData.month, dateData.day);

    return targetDate.getTime() > todayLocalDate.getTime();
  }

  const itemSeparator = () => <View style={styles.listItemSeparator} />;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleScrollTo("left")}>
        <ArrowIcon />
      </TouchableOpacity>
      <FlatList
        ref={listRef}
        showsHorizontalScrollIndicator={false}
        horizontal
        inverted
        ItemSeparatorComponent={itemSeparator}
        data={mockedDays}
        initialNumToRender={initialNumToRender}
        decelerationRate={0.95}
        windowSize={8}
        maxToRenderPerBatch={6}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item.id}
        onScroll={handleFreeScroll}
        renderItem={(data) => (
          <DayItemButton
            disabled={shouldDisable(data.item)}
            onPress={() => props.onSelectDate(data.item)}
            selected={data.item.id === props.currentDate?.id}
            dateData={data.item}
          />
        )}
        onScrollToIndexFailed={() => {}}
      />
      <TouchableOpacity onPress={handleScrollTo("right")}>
        <ArrowIcon style={styles.rightArrowIcon} />
      </TouchableOpacity>
    </View>
  );
}
