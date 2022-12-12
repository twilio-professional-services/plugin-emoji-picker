import React, { useEffect, useRef, useState } from "react";
import * as Flex from "@twilio/flex-ui";
import { EmojiIcon } from "@twilio-paste/icons/esm/EmojiIcon";
import { EmojiWrapper } from "./EmojiPickerStyles";
import { createPopup } from "@picmo/popup-picker";

let picker = null;

/** This component uses PicMo, Copyright (c) 2019 Joe Attardi
 *  See license text at https://github.com/joeattardi/picmo/blob/main/LICENSE
 */

const EmojiInputAction = ({ conversationSid, disabledReason }) => {
  const buttonRef = useRef(null);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const inputState = Flex.useFlexSelector(
    (state) => state.flex.chat.conversationInput[conversationSid].inputText
  );

  const addEmoji = (selectedEmoji) => {
    // get the current input from state and append this emoji to it
    let currentInput = inputState;

    if (
      currentInput.length > 0 &&
      currentInput.charAt(currentInput.length - 1) !== " "
    ) {
      currentInput += " ";
    }

    Flex.Actions.invokeAction("SetInputText", {
      body: currentInput + selectedEmoji,
      conversationSid: conversationSid,
    });
  };

  const togglePicker = () => {
    if (picker.isOpen) picker.close();
    else picker.open();
  };

  useEffect(() => {
    let pickerOptions = {
      showPreview: false,
      emojiSize: "1.7rem",
    };
    let popupOptions = {
      referenceElement: buttonRef.current,
      triggerElement: buttonRef.current,
      position: "bottom-start",
    };
    picker = createPopup(pickerOptions, popupOptions);

    picker.addEventListener("emoji:select", (event) => {
      setSelectedEmoji(event.emoji);
    });

    return () => {
      if (!picker) return;

      try {
        picker.destroy();
      } catch {}
    };
  }, []);

  useEffect(() => {
    if (!selectedEmoji) return;

    addEmoji(selectedEmoji);

    // reset in case user selects same emoji twice
    setSelectedEmoji(null);
  }, [selectedEmoji]);
  
  useEffect(() => {
    if (!disabledReason || disabledReason == "Send Message") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [disabledReason])

  // using a custom button as the Paste button causes the picker to dismiss immediately
  return (
    <EmojiWrapper>
      <button onClick={togglePicker} ref={buttonRef} disabled={isDisabled}>
        <EmojiIcon decorative={false} title="Insert emoji" />
      </button>
    </EmojiWrapper>
  );
};

export default EmojiInputAction;
