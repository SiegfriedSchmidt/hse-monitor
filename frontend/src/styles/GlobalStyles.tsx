import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        margin: auto;
        max-width: 800px;
    }

    @media all and (display-mode: standalone) {
        body {
            padding-top: 50px;
        }
    }
`

export default GlobalStyles