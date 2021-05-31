import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface ContainerProps {
  color: string;
}

export const Container = styled.View<ContainerProps>`
  ${({ theme, color }) => css`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${theme.colors.shape};
    padding: 13px 24px;
    border-radius: 5px;
    border-left-width: 5px;
    border-left-color: ${color};
    margin-bottom: 8px;
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.weights.regular};
    color: ${theme.colors.text_dark};
    font-size: ${RFValue(15)}px;
  `}
`;

export const Amount = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.weights.bold};
    color: ${theme.colors.text_dark};
    font-size: ${RFValue(15)}px;
  `}
`;
