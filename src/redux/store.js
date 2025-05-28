import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension"
import { activityLogReducer, alluserReducer, assignModeratorReducer, businessUserReducer, userDetailsReducer, userListReducer, userReducer } from "./reducers/userReducer"
import { allNotesReducer, globalNoteLimitReducer, setUserPostLimitReducer, updateNoteReducer } from "./reducers/noteReducer";
import { allReminderReducer, reminderDetailsReducer, reminderReducer, updatereminderReducer } from "./reducers/reminderReducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { businessesReducer } from "./reducers/businessReducer";
import { wallReducer } from "./reducers/wallReducer";
import { dashboardReducer } from "./reducers/dashboardReducer";
import { categoryReducer } from "./reducers/CategoryReducer";
import { searchReducer } from "./reducers/searchReducer";
import { reportReducer } from "./reducers/report";
import { frequencyReducer } from "./reducers/frequencyReducer";


const rootReducer = combineReducers({

  users: alluserReducer,
  user: userReducer,
  setUserPostLimit: setUserPostLimitReducer,
  globalNoteLimit: globalNoteLimitReducer,
  assignModerator: assignModeratorReducer,

  allNotes: allNotesReducer,
  allBusinesses: businessesReducer,
  allReminders: allReminderReducer,
  allWalls: wallReducer,

  activityLogs: activityLogReducer,
  dashboard: dashboardReducer,

  category: categoryReducer,
  businessUserReducer,
  searchReducer,

  reports: reportReducer,
  frequencyReducer:frequencyReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["allNotes", "allReminders", "allBusinesses", "users", "allWalls", "category", "businessUserReducer", "searchReducer", "report"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

const persistor = persistStore(store);

export { store, persistor };
