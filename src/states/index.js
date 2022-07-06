import { combineReducers } from "redux";
import messageInputReducer from "./reducer";

// Register your redux store under a unique namespace
export const namespace = "EmojiPickerPlugin";

// Combine the reducers
export default combineReducers({
  messageInput: messageInputReducer,
});
