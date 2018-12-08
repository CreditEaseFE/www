import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const WordAnimate = keyframes`
  0% {
    opacity: 1;
  }
 
  100% {
    opacity: 0;
    transform: translateY(-200px);
  }
`;

const Word = styled.div`
  position: fixed;
  color: #dd2323;
  pointer-events: none;
  animation: 2s ${WordAnimate} ease-out forwards;
  user-select: none;
  z-index: 500;
`;

const random = (min, max) => ~~(Math.random() * (max - min + 1)) + min;

export default () => {
  const [values] = useState(
    "富强、民主、文明、和谐、自由、平等、公正、法治、爱国、敬业、诚信、友善".split(
      "、"
    )
  );
  const [words, setWords] = useState([]);

  const onMouseDown = event => {
    words.push(
      <Word
        key={Date.now()}
        style={{ left: `${event.x - 16}px`, top: `${event.y - 16}px` }}
      >
        {values[random(0, values.length - 1)]}
      </Word>
    );
    setWords(words.slice(-20));
  };

  useEffect(() => {
    window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, []);

  return <div>{words}</div>;
};
