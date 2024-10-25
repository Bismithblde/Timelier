import { createRoot } from 'react-dom/client';
import '@src/index.css';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { StopwatchProvider } from '../../contexts/StopwatchContext';
import SidePanel from './SidePanel';
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
        <SidePanel />
      </StopwatchProvider>
    </ThemeProvider>,
  );
}

init();
