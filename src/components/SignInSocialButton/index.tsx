import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import * as S from './styles';

interface SignInSocialButtonProps extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

function SignInSocialButton({
  title,
  svg: Svg,
  ...rest
}: SignInSocialButtonProps) {
  return (
    <S.Container {...rest}>
      <S.ImageContainer>
        <Svg />
      </S.ImageContainer>
      <S.Text>{title}</S.Text>
    </S.Container>
  );
}

export default SignInSocialButton;
