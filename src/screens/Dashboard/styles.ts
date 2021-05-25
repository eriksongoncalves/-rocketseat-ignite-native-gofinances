import styled, { css } from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.background};
  `}
`;

export const Header = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: ${RFPercentage(42)}px;
    background-color: ${theme.colors.primary};

    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
  `}
`;

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const UserGreeting = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${theme.fonts.weights.regular};
  `}
`;

export const UserName = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${theme.fonts.weights.bold};
  `}
`;

export const Icon = styled(Feather)`
  ${({ theme }) => css`
    color: ${theme.colors.secondary};
    font-size: ${RFValue(24)}px;
  `}
`;

export const HighlightCards = styled.ScrollView`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`;
