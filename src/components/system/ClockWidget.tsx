import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ClockWidgetContainer = styled.div`
  padding: 25px 30px;
  background: var(--secondary-bg);
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  text-align: center;
  border: 1px solid rgba(97, 218, 251, 0.2);
  color: var(--text-color);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-bottom: 20px;
`;

const CalendarContainer = styled.div`
  width: 100%;
  max-width: 300px;
  margin-top: 15px;
  border-top: 1px solid rgba(97, 218, 251, 0.1);
  padding-top: 15px;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 1.1em;
  font-weight: 600;
  color: var(--text-color);
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: var(--accent-color);
  font-size: 1.5em;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  &:hover {
    background: rgba(97, 218, 251, 0.1);
  }
`;

const DaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-weight: 600;
  color: var(--text-color-light);
  margin-bottom: 10px;
`;

const DayName = styled.div`
  text-align: center;
  padding: 5px 0;
  font-size: 0.9em;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

const CalendarDay = styled.div<{ isCurrentMonth: boolean; isToday: boolean }>`
  padding: 8px 0;
  text-align: center;
  border-radius: 5px;
  background: ${({ isToday }) => (isToday ? 'var(--accent-color)' : 'transparent')};
  color: ${({ isToday }) => (isToday ? 'var(--primary-bg)' : 'var(--text-color)')};
  opacity: ${({ isCurrentMonth }) => (isCurrentMonth ? 1 : 0.4)};
  font-size: 0.95em;
  font-weight: ${({ isToday }) => (isToday ? 'bold' : 'normal')};
`;

const ClockWidget: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDate = time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const generateCalendarDays = (year: number, month: number) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.

    const days = [];

    // Fill leading empty cells
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    // Fill days of the month
    for (let i = 1; i <= numDaysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(prevMonth => {
      if (prevMonth === 0) {
        setCurrentYear(prevYear => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth(prevMonth => {
      if (prevMonth === 11) {
        setCurrentYear(prevYear => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };

  const calendarDays = generateCalendarDays(currentYear, currentMonth);
  const today = new Date();
  const isCurrentMonthAndYear = today.getMonth() === currentMonth && today.getFullYear() === currentYear;

  return (
    <ClockWidgetContainer>
      <TimeDisplay>{formattedTime}</TimeDisplay>
      <DateDisplay>{formattedDate}</DateDisplay>

      <CalendarContainer>
        <CalendarHeader>
          <NavButton onClick={goToPreviousMonth}>&lt;</NavButton>
          <div>{monthNames[currentMonth]} {currentYear}</div>
          <NavButton onClick={goToNextMonth}>&gt;</NavButton>
        </CalendarHeader>
        <DaysOfWeek>
          {daysOfWeek.map(day => (
            <DayName key={day}>{day}</DayName>
          ))}
        </DaysOfWeek>
        <CalendarGrid>
          {calendarDays.map((day, index) => (
            <CalendarDay
              key={index}
              isCurrentMonth={day !== null}
              isToday={isCurrentMonthAndYear && day === today.getDate()}
            >
              {day}
            </CalendarDay>
          ))}
        </CalendarGrid>
      </CalendarContainer>
    </ClockWidgetContainer>
  );
};

export default ClockWidget;
