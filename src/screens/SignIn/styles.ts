import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.background};
  `}
`;

export const Header = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: 70%;
    background-color: ${theme.colors.primary};
    align-items: center;
    justify-content: flex-end;
  `}
`;

export const TitleWrapper = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.weights.medium};
    color: ${theme.colors.shape};
    font-size: ${RFValue(30)}px;
    text-align: center;
    margin-top: 45px;
  `}
`;

export const SignInTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.weights.regular};
    color: ${theme.colors.shape};
    font-size: ${RFValue(16)}px;
    text-align: center;
    margin-top: 80px;
    margin-bottom: 67px;
  `}
`;

export const Footer = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: 30%;
    background-color: ${theme.colors.secondary};
  `}
`;

export const FooterWrapper = styled.View`
  margin-top: ${RFPercentage(-4)}px;
  padding: 0 32px;
  justify-content: space-between;
`;
