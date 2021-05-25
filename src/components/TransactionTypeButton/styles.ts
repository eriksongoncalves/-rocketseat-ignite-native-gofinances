import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../../styles/theme/colors';

type IconsProps = {
  type: 'up' | 'down';
};

type ContainerProps = {
  isActive: boolean;
} & IconsProps;

const containerColors = {
  up: colors.success_light,
  down: colors.attention_light
};

export const Container = styled(TouchableOpacity)<ContainerProps>`
  ${({ theme, isActive, type }) => css`
    width: 48%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    padding: 16px;
    border-width: 1.5px;
    border-style: solid;
    border-color: ${theme.colors.text};

    ${isActive &&
    css`
      border-width: 0;
      background-color: ${containerColors[type]};
    `}
  `}
`;

export const Icon = styled(Feather)<IconsProps>`
  ${({ theme, type }) => css`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;
    color: ${theme.colors.success};

    ${type === 'down' &&
    css`
      color: ${theme.colors.attention};
    `}
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(14)}px;
    font-family: ${theme.fonts.weights.regular};
    color: ${theme.colors.text_dark};
  `}
`;
