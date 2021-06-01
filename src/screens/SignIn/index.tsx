import React from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { SignInSocialButton } from '../../components';
import { useAuth } from '../../contexts/Auth';

import * as S from './styles';

function SignIn() {
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      Alert.alert('Não foi possível conectar com a conta Google');
    }
  }

  async function handleSignInWithApple() {
    try {
      await signInWithApple();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      Alert.alert('Não foi possível conectar com a conta Apple');
    }
  }

  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <S.Title>
            Controle suas {'\n'} finanças de forma {'\n'} muito simples
          </S.Title>
        </S.TitleWrapper>

        <S.SignInTitle>
          Faça o seu login com {'\n'} uma das contas abaixo
        </S.SignInTitle>
      </S.Header>
      <S.Footer>
        <S.FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />

          <SignInSocialButton
            title="Entrar com Apple"
            svg={AppleSvg}
            onPress={handleSignInWithApple}
          />
        </S.FooterWrapper>
      </S.Footer>
    </S.Container>
  );
}

export default SignIn;
