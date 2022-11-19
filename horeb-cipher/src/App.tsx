import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const abcdef = "abcdefghijklmnopqrstuvwxyz";
const colemak = "qwfpgjluyarstdhneiozxcvbkm";
const azerty = "azertyuiopqsdfghjklmwxcvbn";
const qwerty = "qwertyuiopasdfghjklzxcvbnm";
const dvorak = "pyfgcrlaoeuidhtnsqjkxbmwvz";
const MAX_ALPHABET = 26;

const App = () => {
  console.log("");
  const [plainText, setPlainText] = useState<string>("abcde");
  const [cipherText, setCipherText] = useState<string>("");
  const [key, setKey] = useState<string>("lemon");
  const [rotationI, setRotationI] = useState<number>(0);
  const [rotationII, setRotationII] = useState<number>(0);
  const [rotationIII, setRotationIII] = useState<number>(0);
  const [rotationIV, setRotationIV] = useState<number>(0);
  const [rotationV, setRotationV] = useState<number>(0);

  setRotationI(5);
  setRotationII(7);
  setRotationIII(3);
  setRotationIV(4);
  setRotationV(10);

  console.log(plainText.length);
  // run encryption
  for (var textIdx = 0; textIdx < plainText.length; textIdx++) {
    // console.log(plainText[textIdx]);
    console.log(textIdx);
  }

  const rotorI = (character: string) => {
    const idx = abcdef.indexOf(character);
    const rotorICharacter = abcdef[(idx + rotationI) % MAX_ALPHABET];
    rotorII(rotorICharacter);
  };

  const rotorII = (character: string) => {
    const idx = colemak.indexOf(character);
    const rotorIICharacter = colemak[(idx + rotationII) % MAX_ALPHABET];
    rotorIII(rotorIICharacter);
  };

  const rotorIII = (character: string) => {
    const idx = azerty.indexOf(character);
    const rotorIIICharacter = azerty[(idx + rotationIII) % MAX_ALPHABET];
    rotorIV(rotorIIICharacter);
  };

  const rotorIV = (character: string) => {
    const idx = qwerty.indexOf(character);
    const rotorIVCharacter = qwerty[(idx + rotationIV) % MAX_ALPHABET];
    rotorV(rotorIVCharacter);
  };

  const rotorV = (character: string) => {
    const idx = dvorak.indexOf(character);
    const rotorVCharacter = dvorak[(idx + rotationV) % MAX_ALPHABET];
    setCipherText(cipherText.concat(rotorVCharacter));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
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
