import React, { useState } from "react";
import "./App.css";
import useHorebCipher from "./hooks/useCipher";

const App = () => {
  const [plainText, setPlainText] = useState<string>("");
  const [cipherText, setCipherText] = useState<string>("");
  const { encrypt, decrypt } = useHorebCipher();

  const updatePlainText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlainText(e.target.value);
  };

  const encryptClicked = () => {
    const result = encrypt(plainText);
    setPlainText(result);
  };

  const decryptClicked = () => {
    const result = decrypt(plainText);
    setPlainText(result);
  };

  return (
    <div className="App">
      Plain Text: {plainText}
      <br></br>
      Cipher Text: {cipherText}
      <br></br>
      <input type="text" onChange={(e) => updatePlainText(e)}></input>
      <button type="button" onClick={encryptClicked}>
        Encrypt
      </button>
      <button type="button" onClick={decryptClicked}>
        Decrypt
      </button>
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
