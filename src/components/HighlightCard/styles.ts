import styled, { css, DefaultTheme } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

type TypeProps = {
  type: 'up' | 'down' | 'total';
};

export const Container = styled.View<TypeProps>`
  ${({ theme, type }) => css`
    background-color: ${theme.colors.shape};
    width: ${RFValue(300)}px;
    border-radius: 5px;
    padding: 19px 23px;
    padding-bottom: ${RFValue(42)}px;
    margin-right: 16px;

    ${type === 'total' &&
    css`
      background-color: ${theme.colors.secondary};
    `}
  `}
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  ${({ theme, type }) => css`
    font-family: ${theme.fonts.weights.regular};
    font-size: ${RFValue(14)}px;
    color: ${theme.colors.text_dark};

    ${type === 'total' &&
    css`
      color: ${theme.colors.shape};
    `}
  `}
`;

const iconModifiers = (theme: DefaultTheme) => ({
  up: css`
    color: ${theme.colors.success};
  `,
  down: css`
    color: ${theme.colors.attention};
  `,
  total: css`
    color: ${theme.colors.shape};
  `
});

export const Icon = styled(Feather)<TypeProps>`
  ${({ theme, type }) => css`
    font-size: ${RFValue(40)}px;
    ${iconModifiers(theme)[type]};
  `}
`;

export const Footer = styled.View``;

export const Amount = styled.Text<TypeProps>`
  ${({ theme, type }) => css`
    font-family: ${theme.fonts.weights.medium};
    font-size: ${RFValue(32)}px;
    color: ${theme.colors.text_dark};
    margin-top: 38px;

    ${type === 'total' &&
    css`
      color: ${theme.colors.shape};
    `}
  `}
`;

export const LastTransaction = styled.Text<TypeProps>`
  ${({ theme, type }) => css`
    font-family: ${theme.fonts.weights.regular};
    font-size: ${RFValue(12)}px;
    color: ${theme.colors.text};

    ${type === 'total' &&
    css`
      color: ${theme.colors.shape};
    `}
  `}
`;
