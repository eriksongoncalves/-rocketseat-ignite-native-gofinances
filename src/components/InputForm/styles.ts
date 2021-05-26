import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
`;

export const Error = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(12)}px;
    font-family: ${theme.fonts.weights.regular};
    color: ${theme.colors.attention};
    margin-top: -4px;
    margin-bottom: 8px;
  `}
`;
