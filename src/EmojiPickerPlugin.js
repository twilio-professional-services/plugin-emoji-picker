import React from "react";
import { FlexPlugin } from "@twilio/flex-plugin";

import EmojiPicker from "./components/EmojiPicker/EmojiPicker";
import EmojiInputListener from "./components/EmojiInputListener/EmojiInputListener";
import reducers, { namespace } from "./states";

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
    this.registerReducers(manager);

    flex.MessageInputV2.Content.add(
      <EmojiInputListener key="EmojiInputListener-component" />
    );
    flex.MessageInputActions.Content.add(
      <EmojiPicker key="EmojiPicker-component" />,
      {
        sortOrder: -1,
      }
    );
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(
        `You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`
      );
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
