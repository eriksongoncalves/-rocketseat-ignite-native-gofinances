import React from 'react';

import Input from '.';
import { renderWithTheme } from '../../utils/tests/helper';

describe('test', () => {
  it('should works', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input
        placeholder="E-mail"
        keyboardType="email-address"
        autoCorrect={false}
      />
    );

    const input = getByPlaceholderText('E-mail');

    expect(input.props.placeholder).toBe('E-mail');
  });
});
