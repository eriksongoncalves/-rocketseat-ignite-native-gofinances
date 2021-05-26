import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

type CategorySelectButtonProps = {
  title: string;
} & TouchableOpacityProps;

function CategorySelectButton({ title, ...rest }: CategorySelectButtonProps) {
  return (
    <S.Container {...rest}>
      <S.Category>{title}</S.Category>
      <S.Icon name="chevron-down" />
    </S.Container>
  );
}

export default CategorySelectButton;
