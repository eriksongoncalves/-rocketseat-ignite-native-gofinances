import React from 'react';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import * as S from './styles';

type CategorySelectButtonProps = {
  title: string;
} & BorderlessButtonProps;

function CategorySelectButton({ title, ...rest }: CategorySelectButtonProps) {
  return (
    <S.Container {...rest}>
      <S.Category>{title}</S.Category>
      <S.Icon name="chevron-down" />
    </S.Container>
  );
}

export default CategorySelectButton;
