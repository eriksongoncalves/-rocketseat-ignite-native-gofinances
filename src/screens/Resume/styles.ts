import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.background};
  `}
`;

export const Header = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: ${RFValue(113)}px;
    background-color: ${theme.colors.primary};
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.weights.medium};
    color: ${theme.colors.shape};
    font-size: ${RFValue(18)}px; ;
  `}
`;

export const Content = styled.ScrollView``;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
`;

export const MonthSelectButton = styled(BorderlessButton)``;

export const MonthSelectIcon = styled(Feather)`
  ${({ theme }) => css`
    font-size: ${RFValue(24)}px;
    color: ${theme.colors.text_dark};
  `}
`;

export const Month = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.weights.regular};
    font-size: ${RFValue(20)}px;
    color: ${theme.colors.text_dark};
  `}
`;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
