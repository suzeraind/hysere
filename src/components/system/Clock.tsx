import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ClockContainer = styled.div`
  color: var(--text-color);
  font-size: 14px;
  font-weight: 600;
`;

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <ClockContainer>
      {time.toLocaleTimeString()}
    </ClockContainer>
  );
};

export default Clock;
