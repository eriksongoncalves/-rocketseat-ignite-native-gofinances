import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  ${({ theme }) => css`
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: ${RFValue(56)}px;
    background-color: ${theme.colors.shape};
    border-radius: 5px;
    margin-bottom: 16px;
  `}
`;

export const ImageContainer = styled.View`
  ${({ theme }) => css`
    justify-content: center;
    align-items: center;
    padding: 0 ${RFValue(16)}px;
    border-color: ${theme.colors.background};
    border-right-width: 1px;
  `}
`;

export const Text = styled.Text`
  ${({ theme }) => css`
    flex: 1;
    text-align: center;
    font-size: ${RFValue(14)}px;
    font-family: ${theme.fonts.weights.medium};
    color: ${theme.colors.text_dark};
  `}
`;
