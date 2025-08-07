import React from 'react';
import styled from 'styled-components';

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  background-color: #fff;
  color: #000;
  border: none;
  resize: none;
  font-family: 'Courier New', Courier, monospace;
`;

const Notepad: React.FC = () => {
  return <TextArea />;
};

export default Notepad;
