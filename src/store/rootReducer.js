import homeReducer from "./reducers/homeReducer";
import authReducer from "./reducers/authReducer";
import cardReducer from "./reducers/cardReducer";
import dealReducer from "./reducers/dealReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import chatReducer from "./reducers/ChatReducer";

const rootReducers = {
  home: homeReducer,
  auth: authReducer,
  card: cardReducer,
  deal: dealReducer,
  dashboard: dashboardReducer,
    chat: chatReducer,
};
export default rootReducers;
