import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { render } from '@testing-library/react-native';

import theme from '../../styles/theme';

export const renderWithTheme = (children: ReactNode) =>
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
