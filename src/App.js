import React, { useCallback, useEffect, useRef, useState } from "react";
import fetchFlagLocation from "./fetch/fetchFlagLocation";
import fetchFlag from "./fetch/fetchFlag";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [flagLocation, setFlagLocation] = useState("");
  const [flag, setFlag] = useState("");
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  const listItems = useRef([]);

  const captureTheFlag = useCallback(async () => {
    setLoading(true);

    try {
      // Decode the url to complete step 2 with fetchFlagLocation
      const flagLocationResponse = await fetchFlagLocation();
      setFlagLocation(flagLocationResponse);
      // Retrieve the flag
      const theFlag = await fetchFlag(flagLocation);
      setLoading(false);

      // Make sure the flag meets the requirement of a single word
      if (theFlag.split(" ").length === 1) {
        setFlag(theFlag);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [flagLocation]);

  useEffect(() => {
    captureTheFlag();
  }, [captureTheFlag]);

  useEffect(() => {
    if (flag) {
      const timerId = setTimeout(() => {
        setCurrentLetterIndex(currentLetterIndex + 1);
      }, 500);

      return () => clearTimeout(timerId);
    }
  }, [flag, currentLetterIndex]);

  useEffect(() => {
    listItems.current.forEach((item, index) => {
      if (item && index < currentLetterIndex) {
        item.style.opacity = "1";
        item.style.fontSize = "34px";
      }
    });
  }, [currentLetterIndex]);

  const handleRef = (element, index) => {
    if (element) {
      listItems.current[index] = element;
      element.style.opacity = "0";
      element.style.fontSize = "144px";
    }
  };

  const list = Array.from(flag).map((letter, index) => (
    <li
      key={index}
      ref={(element) => handleRef(element, index)}
      style={{
        fontFamily: "'Courier New', 'Times New Roman', 'monospace'",
        transition: "all 0.15s ease-in-out",
      }}
    >
      {letter}
    </li>
  ));

  return (
    <div className="App">
      {loading ? (
        "Loading..."
      ) : (
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            listStyle: "none",
            align: "center",
          }}
        >
          {list}
        </ul>
      )}
    </div>
  );
}
