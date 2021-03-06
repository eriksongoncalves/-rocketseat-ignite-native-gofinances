import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled(BorderlessButton).attrs({
  opacity: 0.7
})`
  ${({ theme }) => css`
    background-color: ${theme.colors.shape};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    padding: 18px 16px;
  `}
`;

export const Category = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(14)}px;
    font-family: ${theme.fonts.weights.regular};
    color: ${theme.colors.text_dark};
  `}
`;

export const Icon = styled(Feather)`
  ${({ theme }) => css`
    font-size: ${RFValue(20)}px;
    color: ${theme.colors.text};
  `}
`;
