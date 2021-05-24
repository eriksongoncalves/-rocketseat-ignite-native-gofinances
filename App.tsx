import React from 'react';
import { ThemeProvider } from 'styled-components';

import Dashboard from '@screens/Dashboard';
import theme from '@styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
