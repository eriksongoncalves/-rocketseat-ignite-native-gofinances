import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

type TransactionTypes = {
  type: 'positive' | 'negative';
};

export const Container = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.shape};
    border-radius: 5px;
    padding: 17px 24px;
    margin-bottom: 16px;
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.weights.regular};
    font-size: ${RFValue(14)}px;
    color: ${theme.colors.text_dark};
  `}
`;

export const Amount = styled.Text<TransactionTypes>`
  ${({ theme, type }) => css`
    font-family: ${theme.fonts.weights.regular};
    font-size: ${RFValue(20)}px;
    color: ${theme.colors.success};
    margin-top: 2px;

    ${type === 'negative' &&
    css`
      color: ${theme.colors.attention};
    `}
  `}
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 19px;
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(Feather)`
  ${({ theme }) => css`
    font-size: ${RFValue(20)}px;
    color: ${theme.colors.text};
  `}
`;

export const CategoryName = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.weights.regular};
    font-size: ${RFValue(14)}px;
    color: ${theme.colors.text};
    margin-left: 17px;
  `}
`;

export const Date = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.weights.regular};
    font-size: ${RFValue(14)}px;
    color: ${theme.colors.text};
  `}
`;
