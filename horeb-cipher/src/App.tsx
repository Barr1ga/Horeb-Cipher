import React, { useState, useRef } from "react";
import "./App.css";
import useHorebCipher from "./hooks/useCipher";
import TextareaAutosize from "react-textarea-autosize";
import {
  HiChevronDown,
  HiChevronUp,
  HiOutlineDownload,
  HiOutlineUpload,
} from "react-icons/hi";
import { mod } from "./utils/mod";
import { abcdef, MAX_ALPHABET } from "./utils/alphabet";

const App = () => {
  const [text, setText] = useState<string>("");
  const {
    encrypt,
    decrypt,
    setRotationI,
    rotationI,
    rotationII,
    rotationIII,
    rotationIV,
    rotationV,
    setRotationII,
    setRotationIII,
    setRotationIV,
    setRotationV,
  } = useHorebCipher();
  const [keyFocus, setKeyFocus] = useState<number>(1);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const updatePlainText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const encryptClicked = () => {
    const result = encrypt(text);
    setText(result);
    textRef.current!.value = result;
  };

  const decryptClicked = () => {
    const result = decrypt(text);
    setText(result);
    textRef.current!.value = result;
  };

  const resetFields = () => {
    setText("");
    textRef.current!.value = "";
  };

  const incrementKeyI = () => {
    setRotationI((prev: number) => mod(prev + 1, MAX_ALPHABET));
  };
  const incrementKeyII = () => {
    setRotationII((prev: number) => mod(prev + 1, MAX_ALPHABET));
  };
  const incrementKeyIII = () => {
    setRotationIII((prev: number) => mod(prev + 1, MAX_ALPHABET));
  };
  const incrementKeyIV = () => {
    setRotationIV((prev: number) => mod(prev + 1, MAX_ALPHABET));
  };
  const incrementKeyV = () => {
    setRotationV((prev: number) => mod(prev + 1, MAX_ALPHABET));
  };

  const decrementKeyI = () => {
    setRotationI((prev: number) => mod(prev - 1, MAX_ALPHABET));
  };
  const decrementKeyII = () => {
    setRotationII((prev: number) => mod(prev - 1, MAX_ALPHABET));
  };
  const decrementKeyIII = () => {
    setRotationIII((prev: number) => mod(prev - 1, MAX_ALPHABET));
  };
  const decrementKeyIV = () => {
    setRotationIV((prev: number) => mod(prev - 1, MAX_ALPHABET));
  };
  const decrementKeyV = () => {
    setRotationV((prev: number) => mod(prev - 1, MAX_ALPHABET));
  };

  const uploadedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target!.result;
      setText(text!.toString());
      textRef.current!.value = text!.toString();
      console.log(text);
    };
    reader.readAsText(e.target.files![0]);
  };

  return (
    <div className="App">
      <div className="container">
        {/* <label>Plain Text </label> */}
        <label>Cipher key</label>
        <span className="keys">
          <div className="key">
            <div className="arrows">
              <div className="arrow" onClick={incrementKeyI}>
                <HiChevronUp></HiChevronUp>
              </div>
              <div className="arrow" onClick={decrementKeyI}>
                <HiChevronDown></HiChevronDown>
              </div>
            </div>
            <p>{abcdef[rotationI].toUpperCase()}</p>
          </div>
          <div className="key">
            <div className="arrows">
              <div className="arrow" onClick={incrementKeyII}>
                <HiChevronUp></HiChevronUp>
              </div>
              <div className="arrow" onClick={decrementKeyII}>
                <HiChevronDown></HiChevronDown>
              </div>
            </div>
            <p>{abcdef[rotationII].toUpperCase()}</p>
          </div>
          <div className="key">
            <div className="arrows">
              <div className="arrow" onClick={incrementKeyIII}>
                <HiChevronUp></HiChevronUp>
              </div>
              <div className="arrow" onClick={decrementKeyIII}>
                <HiChevronDown></HiChevronDown>
              </div>
            </div>
            <p>{abcdef[rotationIII].toUpperCase()}</p>
          </div>
          <div className="key">
            <div className="arrows">
              <div className="arrow" onClick={incrementKeyIV}>
                <HiChevronUp></HiChevronUp>
              </div>
              <div className="arrow" onClick={decrementKeyIV}>
                <HiChevronDown></HiChevronDown>
              </div>
            </div>
            <p>{abcdef[rotationIV].toUpperCase()}</p>
          </div>
          <div className="key">
            <div className="arrows">
              <div className="arrow" onClick={incrementKeyV}>
                <HiChevronUp></HiChevronUp>
              </div>
              <div className="arrow" onClick={decrementKeyV}>
                <HiChevronDown></HiChevronDown>
              </div>
            </div>
            <p>{abcdef[rotationV].toUpperCase()}</p>
          </div>
        </span>
        <div className="input">
          <TextareaAutosize
            ref={textRef}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              updatePlainText(e)
            }
            placeholder="Whats on your mind?"
            className="form-control"
            minRows={5}
            maxRows={15}
          />
          <label className="filename">filename.txt</label>
          <label htmlFor="upload-photo" className="upload">
            <HiOutlineUpload></HiOutlineUpload>
          </label>
          <input
            type="file"
            id="upload-photo"
            ref={fileRef}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              uploadedFile(e)
            }
            // onChange={onSelectFile}
          />
        </div>

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
