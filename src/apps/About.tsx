import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Text = styled.p`
  line-height: 1.6;
`;

const About: React.FC = () => {
  return (
    <AboutContainer>
      <Title>About This OS</Title>
      <Text>
        This is a simple operating system simulation built with React, TypeScript, and Vite.
      </Text>
    </AboutContainer>
  );
};

export default About;
