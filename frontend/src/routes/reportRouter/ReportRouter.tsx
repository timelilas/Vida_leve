import { DateFilterProvider } from "../../contexts/dateFilterContext/DateFilterProvider";
import { ReportStack } from "./reportStack";
import { ReportRoutesConstants } from "./types";
import ReportScreen from "../../screens/main/ReportScreen";
import ReportDetailsScreen from "../../screens/main/ReportDetailsScreen";

export function ReportRouter() {
  return (
    <DateFilterProvider>
      <ReportStack.Navigator initialRouteName={ReportRoutesConstants.Report}>
        <ReportStack.Screen
          name={ReportRoutesConstants.Report}
          component={ReportScreen}
          options={{ headerShown: false }}
        />
        <ReportStack.Screen
          name={ReportRoutesConstants.ReportDetails}
          component={ReportDetailsScreen}
          options={{ headerShown: false }}
        />
      </ReportStack.Navigator>
    </DateFilterProvider>
  );
}
