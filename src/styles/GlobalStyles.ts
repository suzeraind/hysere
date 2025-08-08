import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  :root {
    --primary-bg: #282c34;
    --secondary-bg: #3a3f4b;
    --accent-color: #61dafb;
    --text-color: #ffffff;
    --border-color: #4a4f5a;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    overflow: hidden;
    background-color: var(--primary-bg);
    color: var(--text-color);
    background-image: radial-gradient(var(--secondary-bg) 1px, transparent 0);
    background-size: 40px 40px;
  }

  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 600;
  }
`;