import React, { useEffect, useRef, useState } from "react";
import fetchFlagLocation from "../lib/fetchFlagLocation";
import fetchFlag from "../lib/fetchFlag";
import ErrorBoundary from "./ErrorBoundary.js";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flag, setFlag] = useState("");
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  const listItems = useRef([]);

  useEffect(() => {
    const captureTheFlag = async () => {
      try {
        // Decode the url to complete step 2 with fetchFlagLocation
        const flagLocationResponse = await fetchFlagLocation();
        // Retrieve the flag
        const retrievedFlag = await fetchFlag(flagLocationResponse);
        // Make sure the flag meets the requirement of a single word
        if (retrievedFlag.split(" ").length === 1) {
          setFlag(retrievedFlag);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    };

    captureTheFlag();
  }, []);

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
    <ErrorBoundary fallback={<p>An error has occurred</p>}>
      <div className="App" style={{ textAlign: "center" }}>
        {error ? (
          <p>{error.message || "An error has occurred"}</p>
        ) : loading ? (
          "Loading..."
        ) : (
          <ul
            style={{
              listStyle: "none",
            }}
          >
            {list}
          </ul>
        )}
      </div>
    </ErrorBoundary>
  );
}
