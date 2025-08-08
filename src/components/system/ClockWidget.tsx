import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ClockWidgetContainer = styled.div`
  padding: 25px 30px;
  background: var(--window-bg);
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  text-align: center;
  border: 1px solid rgba(97, 218, 251, 0.2);
  color: var(--text-color);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const TimeDisplay = styled.div`
  font-size: 3.5em;
  font-weight: 700;
  color: var(--accent-color);
  margin-bottom: 12px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: -1px;
`;

const DateDisplay = styled.div`
  font-size: 1.3em;
  color: var(--text-color-light);
  opacity: 0.8;
  font-weight: 400;
`;

const ClockWidget: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDate = time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <ClockWidgetContainer>
      <TimeDisplay>{formattedTime}</TimeDisplay>
      <DateDisplay>{formattedDate}</DateDisplay>
    </ClockWidgetContainer>
  );
};

export default ClockWidget;
