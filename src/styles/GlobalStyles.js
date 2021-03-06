import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --blue: #7ab7c4;
    --green: #53c043;
    --white: #fff;
    --grey: #E0E0E0;
  }
  html {
    font-size: 10px;
  }
  body {
    font-size: 2rem;
    font-family: 'Ubuntu', sans-serif;
    font-weight: 400;
  }
  button {
    background: var(--blue);
    color: white;
    border: 0;
    padding: 0.6rem 1rem;
    border-radius: 2px;
    cursor: pointer;
    --cast: 2px;
    box-shadow: var(--cast) var(--cast) 0 var(--grey);
    text-shadow: 0.5px 0.5px 0 rgba(0,0,0,0.2);
    transition: all 0.2s;
    &:hover {
      --cast: 4px;
    }
  }

  /* Scrollbar Styles */
  body::-webkit-scrollbar {
    width: 12px;
  }
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--blue) var(--white);
  }
  body::-webkit-scrollbar-track {
    background: var(--white);
  }
  body::-webkit-scrollbar-thumb {
    background-color: var(--blue) ;
    border-radius: 6px;
    border: 3px solid var(--white);
  }

`;

export default GlobalStyles;
