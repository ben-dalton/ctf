import { useCallback, useEffect, useRef, useState } from "react";
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
      const flagLocationResponse = await fetchFlagLocation();
      setFlagLocation(flagLocationResponse);
      const theFlag = await fetchFlag(flagLocation);
      setLoading(false);
      setTimeout(() => {
        setFlag(theFlag);
      }, 2000);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [flagLocation]);

  useEffect(() => {
    captureTheFlag();
  }, [captureTheFlag]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCurrentLetterIndex(currentLetterIndex + 1);
    }, 500);

    return () => clearTimeout(timerId);
  }, [currentLetterIndex]);

  const handleRef = (element, index) => {
    if (element) {
      listItems.current[index] = element;
    }
  };

  const list = Array.from(flag).map((letter, index) => (
    <li
      key={index}
      ref={(element) => handleRef(element, index)}
      style={{
        fontFamily: "'courier new', 'Times New Roman', 'monospace'",
        display: index < currentLetterIndex ? "list-item" : "none"
      }}
    >
      {letter}
    </li>
  ));

  useEffect(() => {
    listItems.current.forEach((item, index) => {
      if (index < currentLetterIndex) {
        item.style.fontSize = "54px";
      } else {
        item.style.fontSize = "14px";
      }
    });
  }, [listItems, currentLetterIndex]);

  return <div className="App">{loading ? "Loading..." : <ul>{list}</ul>}</div>;
}
