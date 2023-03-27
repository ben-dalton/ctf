import React, { useEffect, useRef, useState } from "react";

const LetterList = ({ letters }) => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const listItems = useRef([]);

  useEffect(() => {
    if (letters) {
      const timerId = setTimeout(() => {
        setCurrentLetterIndex(currentLetterIndex + 1);
      }, 500);

      return () => clearTimeout(timerId);
    }
  }, [letters, currentLetterIndex]);

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
      element.style.transition = "all 0.15s ease-in-out";
      element.style.fontFamily =
        "'Courier New', 'Times New Roman', 'monospace'";
    }
  };

  return (
    <ul
      style={{
        listStyle: "none",
      }}
    >
      {Array.from(letters).map((listItem, index) => (
        <li key={index} ref={(element) => handleRef(element, index)}>
          {listItem}
        </li>
      ))}
    </ul>
  );
};

export default LetterList;
