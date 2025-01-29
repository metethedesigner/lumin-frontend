import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/store'; 
import dotenv from 'dotenv';
import '../styles/globals.css';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Lato, Arial, sans-serif', 
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  dotenv.config();
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;