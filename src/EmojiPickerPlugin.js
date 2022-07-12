import React from "react";
import { FlexPlugin } from "@twilio/flex-plugin";

import EmojiPicker from "./components/EmojiPicker/EmojiPicker";

const PLUGIN_NAME = "EmojiPickerPlugin";

export default class EmojiPickerPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    flex.MessageInputActions.Content.add(
      <EmojiPicker key="EmojiPicker-component" />,
      {
        sortOrder: -1,
      }
    );
  }
}
