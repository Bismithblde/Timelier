import { createRoot } from 'react-dom/client';
import '@src/index.css';
import Popup from '@src/Popup';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { StopwatchProvider } from '../../contexts/StopwatchContext';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);

  root.render(
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <StopwatchProvider>
        <Popup />
      </StopwatchProvider>
    </ThemeProvider>,
  );
}

init();
