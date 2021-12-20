# Next.js에서 Material UI 와 styled-components 설정

## 설치
``` npm
npm install --save @mui/material styled-components
```

## 폴더 구조 
pages
└ _app.js
└ _document.js
src
└ globalStyles.js
└ theme.js

## _app.js
```jsx
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../src/globalStyle";
import theme from "../src/theme";
import CssBaseline from "@mui/material/CssBaseline";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <CssBaseline />
      </ThemeProvider>
    </>
  );
};

export default MyApp;
```

## _document.js
```jsx
import { ServerStyleSheet } from "styled-components";
import Document, { Html, Head, Main, NextScript } from "next/document";
import theme from "../src/theme";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
            rel="stylesheet"
            type="text/css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const styledSheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;
  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          styledSheet.collectStyles(<App {...props} />)
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styledSheet.getStyleElement()}
        </>
      )
    };
  } finally {
    styledSheet.seal();
  }
};

``

## 참고
- https://growd.tistory.com/71 
- https://github.com/mui-org/material-ui/tree/master/examples/nextjs
- https://github.com/vercel/next.js/tree/canary/examples/with-styled-components