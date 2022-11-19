import React, { useState, useRef } from "react";
import "./App.css";
import useHorebCipher from "./hooks/useCipher";
import TextareaAutosize from "react-textarea-autosize";
import { HiOutlineUpload } from "react-icons/hi";

const App = () => {
  const [text, setText] = useState<string>("");
  const [resultText, setResultText] = useState<string>("");
  const {
    encrypt,
    decrypt,
    setRotationI,
    setRotationII,
    setRotationIII,
    setRotationIV,
    setRotationV,
  } = useHorebCipher();
  const [keyFocus, setKeyFocus] = useState<number>(1);

  const plainTextRef = useRef<HTMLTextAreaElement | null>(null);
  const cipherTextRef = useRef<HTMLTextAreaElement | null>(null);

  const updatePlainText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const encryptClicked = () => {
    const result = encrypt(text);
    setResultText(result);
  };

  const decryptClicked = () => {
    const result = decrypt(text);
    setResultText(result);
  };

  const resetFields = () => {
    setResultText("");
    setText("");
  };

  const updateKeyFocus = (key: number) => {
    setKeyFocus(key);
  };

  const updateKeyI = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const updateKeyII = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const updateKeyIII = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const updateKeyIV = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const updateKeyV = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className="App">
      <div className="container">
        {/* <label>Plain Text </label> */}
        <div className="input">
          <TextareaAutosize
            ref={plainTextRef}
            onChange={(e) => updatePlainText(e)}
            placeholder="Whats on your mind?"
            className="form-control"
            minRows={5}
            maxRows={15}
          />
          <label htmlFor="upload-photo" className="upload">
            <HiOutlineUpload></HiOutlineUpload>
          </label>
          <input
            type="file"
            id="upload-photo"
            // onChange={onSelectFile}
          />
        </div>
        <span className="keys">
          <div className={keyFocus === 1 ? "key key-focus" : "key"}>
            <input
              className="form-control"
              type="text"
              onFocus={() => updateKeyFocus(1)}
              onChange={(e) => updateKeyI(e)}
            ></input>
          </div>
          <div className={keyFocus === 2 ? "key key-focus" : "key"}>
            <input
              className="form-control"
              type="text"
              onFocus={() => updateKeyFocus(2)}
              onChange={(e) => updateKeyI(e)}
            ></input>
          </div>
          <div className={keyFocus === 3 ? "key key-focus" : "key"}>
            <input
              className="form-control"
              type="text"
              onFocus={() => updateKeyFocus(3)}
              onChange={(e) => updateKeyI(e)}
            ></input>
          </div>
          <div className={keyFocus === 4 ? "key key-focus" : "key"}>
            <input
              className="form-control"
              type="text"
              onFocus={() => updateKeyFocus(4)}
              onChange={(e) => updateKeyI(e)}
            ></input>
          </div>
          <div className={keyFocus === 5 ? "key key-focus" : "key"}>
            <input
              className="form-control"
              type="text"
              onFocus={() => updateKeyFocus(5)}
              onChange={(e) => updateKeyI(e)}
            ></input>
          </div>
        </span>
        <span className="horizontal-interactions">
          <button
            type="button"
            className="primary-btn"
            onClick={encryptClicked}
          >
            Encrypt
          </button>
          <button
            type="button"
            className="secondary-btn"
            onClick={decryptClicked}
          >
            Decrypt
          </button>
        </span>
        <button type="button" className="secondary-btn" onClick={resetFields}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
// v
// abcdefghijklmnopqrstuvwxyz
//      v
// abcdefghijklmnopqrstuvwxyz
//        v
// abcdefghijklmnopqrstuvwxyz
//    v
// abcdefghijklmnopqrstuvwxyz
//     v
// abcdefghijklmnopqrstuvwxyz
//           v
// abcdefghijklmnopqrstuvwxyz
//
