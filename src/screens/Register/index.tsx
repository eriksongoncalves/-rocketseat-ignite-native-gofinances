import React from 'react';

import * as S from './styles';

import { Button, Input } from '../../components';

function Register() {
  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>

      <S.Form>
        <S.Fields>
          <Input placeholder="Nome" />

          <Input placeholder="Preço" />
        </S.Fields>

        <Button title="Enviar" />
      </S.Form>
    </S.Container>
  );
}

export default Register;
