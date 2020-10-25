import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    word-wrap: break-word;
  }

  html,
  body {
    background: #262626;
    color: #fff;
    font-family: "Noto Sans", -apple-system , BlinkMacSystemFont , "Segoe UI" , "Roboto" , "Helvetica Neue" , "Ubuntu" , sans-serif;
    font-size: 16px;
    height: 100vh;
    @media screen and (min-width: 1000px) {
      overflow: hidden;
    }
    @media screen and (max-width: 768px) {
      &.hasModal {
        overflow: hidden;
      }
    }
  }

  body,button,html,input {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  p {
    line-height: 1.5;

    &:last-child {
      margin: 0;
    }
  }

  h1,h2,h3,h4,h5 {
    font-weight: 700;
    line-height: 1.2;
    margin: 0;
    margin-bottom: 30px;
  }

  h1 {
    font-size: 48px;
  }

  strong {
    font-weight: 700;
  }

  #root {
    height: 100%;
  }

  #map {
    height: 100%;
  }

  .leaflet-map {
    height: 100%;
    width: 100%;
  }
`;
