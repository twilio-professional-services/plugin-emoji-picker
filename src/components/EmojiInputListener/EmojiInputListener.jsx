import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setValue } from "../../states/reducer";

const EmojiInputListener = ({ messageState: { inputText } }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setValue(inputText));
  }, [inputText]);

  return <div />;
};

export default EmojiInputListener;
