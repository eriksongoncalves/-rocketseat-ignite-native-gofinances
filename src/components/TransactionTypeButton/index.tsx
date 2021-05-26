import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import * as S from './styles';

type TransactionTypeButtonProps = {
  title: string;
  type: 'up' | 'down';
  isActive?: boolean;
} & RectButtonProps;

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
    <S.Container isActive={isActive} type={type}>
      <S.Button {...rest}>
        <S.Icon name={icons[type]} type={type} />
        <S.Title>{title}</S.Title>
      </S.Button>
    </S.Container>
  );
}

export default TransactionTypeButton;
