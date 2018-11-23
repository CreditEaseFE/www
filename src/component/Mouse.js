import React, { Component } from "react";
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

export default class Mouse extends Component {
  state = {
    values: "富强、民主、文明、和谐、自由、平等、公正、法治、爱国、敬业、诚信、友善".split(
      "、"
    ),
    words: []
  };

  constructor() {
    super();
    window.addEventListener("mousedown", this.onMouseDown.bind(this));
  }

  render() {
    return <div>{this.state.words}</div>;
  }

  onMouseDown(event) {
    let { words, values } = this.state;
    words.push(
      <Word
        key={Date.now()}
        style={{ left: `${event.x - 16}px`, top: `${event.y - 16}px` }}
      >
        {values[this.random(0, values.length - 1)]}
      </Word>
    );
    words = words.slice(-20);
    this.setState({ words });
  }

  random(min, max) {
    return ~~(Math.random() * (max - min + 1)) + min;
  }
}
