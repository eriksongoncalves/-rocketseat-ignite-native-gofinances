import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native';

export const Container = styled(TouchableOpacity)`
  ${({ theme }) => css`
    width: 100%;
    background-color: ${theme.colors.secondary};
    padding: 18px;
    border-radius: 5px;
    align-items: center;
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(14)}px;
    font-family: ${theme.fonts.weights.medium};
    color: ${theme.colors.shape};
  `}
`;
