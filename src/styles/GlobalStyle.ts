import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: ${({ theme }) => theme.scheme};
    --serif: Georgia, 'Times New Roman', serif;
    --mono: ui-monospace, 'SFMono-Regular', Consolas, monospace;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.page};
  }
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
  #root { min-height: 100vh; display: flex; flex-direction: column; }
  body:has(dialog[open]) { overflow: hidden; }
  h1, h2, h3, p { margin: 0; }
  button, input, select { font: inherit; }
  a { color: inherit; }
  :focus-visible { outline: 3px solid ${({ theme }) => theme.colors.focus}; outline-offset: 3px; }
  ::selection { background: ${({ theme }) => theme.colors.primary}; color: ${({ theme }) => theme.colors.onPrimary}; }
`;
