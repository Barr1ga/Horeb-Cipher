import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import useHoreb from "./hooks/useHoreb";
import useRsa from "./hooks/useRsa";
import TextareaAutosize from "react-textarea-autosize";
import Logo from "./assets/horeb-cipher-logo.svg";
import {
  HiChevronDown,
  HiChevronUp,
  HiOutlineDownload,
  HiOutlineUpload,
  HiInformationCircle,
  HiCheck,
  HiOutlineDocumentDuplicate,
  HiOutlineExclamation,
} from "react-icons/hi";
import { IconContext } from "react-icons";
import { modulo } from "./utils/numbers";
import {
  abcdef,
  colemak,
  azerty,
  qwerty,
  dvorak,
  MAX_ALPHABET,
} from "./utils/alphabet";

const App = () => {
  const [text, setText] = useState<string>("");
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [encrypted, setEncrypted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const {
    isError,
    setIsError,
    isVerified,
    setIsVerified,
    encryptHoreb,
    decryptHoreb,
    rotationI,
    rotationII,
    rotationIII,
    rotationIV,
    rotationV,
    setRotationI,
    setRotationII,
    setRotationIII,
    setRotationIV,
    setRotationV,
  } = useHoreb();
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const fileNameRef = useRef<HTMLInputElement | null>(null);
  const [filename, setFilename] = useState<string>("message");

  useEffect(() => {
    document.title = "Horeb Cipher";
  }, []);

  const updatePlainText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsError(false);
    setIsVerified(false);
    setText(e.target.value);
  };

  const encryptClicked = () => {
    setEncrypted(true);
    var result = encryptHoreb(text);
    setText(result);
    textRef.current!.value = result;
  };

  const decryptClicked = () => {
    setEncrypted(false);
    var result = decryptHoreb(text);
    setText(result);
    textRef.current!.value = result;
  };

  const resetFields = () => {
    setText("");
    textRef.current!.value = "";
    fileRef.current!.value = "";
    setRotationI(0);
    setRotationII(0);
    setRotationIII(0);
    setRotationIV(0);
    setRotationV(0);
    setIsVerified(false);
  };

  const incrementKeyI = () => {
    setRotationI((prev: number) => modulo(prev + 1, MAX_ALPHABET));
  };
  const incrementKeyII = () => {
    setRotationII((prev: number) => modulo(prev + 1, MAX_ALPHABET));
  };
  const incrementKeyIII = () => {
    setRotationIII((prev: number) => modulo(prev + 1, MAX_ALPHABET));
  };
  const incrementKeyIV = () => {
    setRotationIV((prev: number) => modulo(prev + 1, MAX_ALPHABET));
  };
  const incrementKeyV = () => {
    setRotationV((prev: number) => modulo(prev + 1, MAX_ALPHABET));
  };
  const decrementKeyI = () => {
    setRotationI((prev: number) => modulo(prev - 1, MAX_ALPHABET));
  };
  const decrementKeyII = () => {
    setRotationII((prev: number) => modulo(prev - 1, MAX_ALPHABET));
  };
  const decrementKeyIII = () => {
    setRotationIII((prev: number) => modulo(prev - 1, MAX_ALPHABET));
  };
  const decrementKeyIV = () => {
    setRotationIV((prev: number) => modulo(prev - 1, MAX_ALPHABET));
  };
  const decrementKeyV = () => {
    setRotationV((prev: number) => modulo(prev - 1, MAX_ALPHABET));
  };

  const uploadedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      resetFields();
      const text = e.target!.result;
      setText(text!.toString());
      textRef.current!.value = text!.toString();
    };
    reader.readAsText(e.target.files![0]);
  };

  const downloadResult = () => {
    if (textRef.current!.value === "") {
      return;
    }
    const element = document.createElement("a");
    const file = new Blob([textRef.current!.value], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${filename}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const updateFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(e.target.value);
  };

  const toggleInfo = () => {
    const newWindow = window.open(
      "https://docs.google.com/document/d/1TtCubo0BOoPp1Y6Gl1t4ilj6yz0cZ2fqzK63Ul4-AMM/edit",
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  const copyToClipboard = () => {
    setCopied(true);
    navigator.clipboard.writeText(text);
  };

  const copiedFalse = () => {
    setTimeout(function () {
      setCopied(false);
    }, 200);
  };

  return (
    <div className="App">
      <div className="container">
        <section>
          <div className={isFocus ? "logo blurred" : "logo"}>
            <div className="icon">
              <img src={Logo} alt={"horeb-cipher-logo"} />
            </div>
            <h2>horeb-{!encrypted ? "cipher" : "sdgqmi"}</h2>

            <div className="info" onClick={toggleInfo}>
              <div className="tooltip-container">
                <label className="">
                  <HiInformationCircle></HiInformationCircle>
                </label>
                <div className="tooltip">
                  {"About"}
                  <div className="arrow-down"></div>
                </div>
              </div>
            </div>
          </div>

          <label className={isFocus ? "blurred keys-label" : "keys-label"}>
            Cipher key
          </label>
          <span className={isFocus ? "keys blurred" : "keys"}>
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
              <p>{colemak[rotationII].toUpperCase()}</p>
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
              <p>{azerty[rotationIII].toUpperCase()}</p>
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
              <p>{qwerty[rotationIV].toUpperCase()}</p>
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
              <p>{dvorak[rotationV].toUpperCase()}</p>
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
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
            />
            <hr></hr>
            <span className="interactions">
              {text.length === 0 ? (
                <div></div>
              ) : (
                <span className="filename">
                  <div>
                    <input
                      type="text"
                      maxLength={20}
                      defaultValue={filename}
                      className="form-control rename"
                      style={{ width: `${filename.length * 9.65}px` }}
                      ref={fileNameRef}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateFileName(e)
                      }
                    ></input>
                    <span
                      onClick={() => {
                        fileNameRef.current?.focus();
                      }}
                    >
                      .txt
                    </span>
                  </div>
                  <div className="download">
                    <div className="tooltip-container">
                      <label onClick={downloadResult}>
                        <HiOutlineDownload></HiOutlineDownload>
                      </label>
                      <div className="tooltip">
                        {"Download Message"}
                        <div className="arrow-down"></div>
                      </div>
                    </div>
                  </div>
                </span>
              )}

              <div>
                <div className="state">
                  <div className="success">
                    {isVerified && <HiCheck></HiCheck>}
                  </div>
                  <div className="error">
                    {isError && <HiOutlineExclamation></HiOutlineExclamation>}
                  </div>
                </div>
                <div className="text-length">{text.length}</div>
                <span className="upload">
                  <div className="tooltip-container">
                    <label htmlFor="upload-photo">
                      <HiOutlineUpload></HiOutlineUpload>
                    </label>

                    <div className="tooltip">
                      {"Upload Message"}
                      <div className="arrow-down"></div>
                    </div>
                  </div>
                </span>
                <input
                  type="file"
                  id="upload-photo"
                  ref={fileRef}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    uploadedFile(e)
                  }
                  // onChange={onSelectFile}
                />
                <span className="copy">
                  <div className="tooltip-container">
                    <label onClick={copyToClipboard} onMouseLeave={copiedFalse}>
                      <HiOutlineDocumentDuplicate></HiOutlineDocumentDuplicate>
                    </label>

                    <div
                      className="tooltip"
                      style={{ width: copied ? "50px" : "93px" }}
                    >
                      {copied ? "Copied!" : "Copy Message"}
                      <div className="arrow-down"></div>
                    </div>
                  </div>
                </span>
              </div>
            </span>
          </div>

          <span
            className={
              isFocus
                ? "horizontal-interactions blurred"
                : "horizontal-interactions"
            }
          >
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
          <button
            type="button"
            className={isFocus ? "secondary-btn blurred" : "secondary-btn"}
            onClick={resetFields}
          >
            Reset
          </button>
        </section>
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
