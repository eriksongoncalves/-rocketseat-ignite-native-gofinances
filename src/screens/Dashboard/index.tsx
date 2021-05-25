import React from 'react';

import * as S from './styles';
import { HighlightCard } from '../../components';

function Dashboard() {
  return (
    <S.Container>
      <S.Header>
        <S.UserWrapper>
          <S.UserInfo>
            <S.Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/13559274?v=4'
              }}
            />
            <S.User>
              <S.UserGreeting>Olá,</S.UserGreeting>
              <S.UserName>Erikson</S.UserName>
            </S.User>
          </S.UserInfo>

          <S.Icon name="power" />
        </S.UserWrapper>
      </S.Header>

      <S.HighlightCards
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24
        }}
      >
        <HighlightCard
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="última entrada dia 03 de abril"
          type="up"
        />
        <HighlightCard
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="última saída dia 03 de abril"
          type="down"
        />
        <HighlightCard
          title="Total"
          amount="R$ 1.259,00"
          lastTransaction="01 à 16 de abril"
          type="total"
        />
      </S.HighlightCards>
    </S.Container>
  );
}

export default Dashboard;
