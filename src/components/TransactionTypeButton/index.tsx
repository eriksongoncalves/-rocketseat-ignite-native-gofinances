import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

type TransactionTypeButtonProps = {
  title: string;
  type: 'up' | 'down';
  isActive?: boolean;
} & TouchableOpacityProps;

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
};

function TransactionTypeButton({
  title,
  type,
  isActive = false,
  ...rest
}: TransactionTypeButtonProps) {
  return (
    <S.Container {...rest} isActive={isActive} type={type}>
      <S.Icon name={icons[type]} type={type} />
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}

export default TransactionTypeButton;
