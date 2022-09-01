import { Component, createSignal } from "solid-js";
import { styled } from "solid-styled-components";
import whammy from '../libs/index';

const App: Component = () => {
  return <StyledWrapper>
    <h1>Hello</h1>
  </StyledWrapper>;
};

export default App;

const StyledWrapper = styled.div``;
