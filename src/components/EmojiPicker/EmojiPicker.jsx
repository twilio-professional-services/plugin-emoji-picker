import React, { useEffect, useRef, useState } from "react";
import * as Flex from "@twilio/flex-ui";
import { EmojiWrapper } from "./EmojiPickerStyles";
import FaceSmile from "../../icons/FaceSmile";
import { createPopup } from "@picmo/popup-picker";
import { useSelector } from "react-redux";

let picker = null;

/** This component uses Picmo, Copyright (c) 2019 Joe Attardi
 *  See license text at https://github.com/joeattardi/picmo/blob/main/LICENSE
 */

const EmojiInputAction = ({ conversationSid }) => {
  const buttonRef = useRef(null);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const inputState = useSelector(
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

  // using a custom button as the Paste button causes the picker to dismiss immediately
  return (
    <EmojiWrapper>
      <button onClick={togglePicker} ref={buttonRef}>
        <FaceSmile />
      </button>
    </EmojiWrapper>
  );
};

export default EmojiInputAction;
