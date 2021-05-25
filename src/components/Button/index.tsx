import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

type ButtonProps = { title: string } & TouchableOpacityProps;

function Button({ title, ...rest }: ButtonProps) {
  return (
    <S.Container {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}

export default Button;
