import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as S from './styles';
import { HighlightCard, TransactionCard } from '../../components';
import { TransactionCardProps } from '../../components/TransactionCard';
import { useFocusEffect } from '@react-navigation/core';

export type TransactionListProps = {
  id: string;
} & TransactionCardProps;

function Dashboard() {
  const [transactions, setTransactions] = useState<TransactionListProps[]>([]);

  async function loadTransactions() {
    const oldData = await AsyncStorage.getItem('@gofinances:transactions');
    const data = oldData ? JSON.parse(oldData) : [];

    const transactionsFormatted: TransactionListProps[] = data.map(
      (item: TransactionListProps) => {
        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date));

        return {
          id: item.id,
          amount,
          date,
          category: item.category,
          title: item.title,
          type: item.type
        };
      }
    );

    setTransactions(transactionsFormatted);
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  useEffect(() => {
    loadTransactions();
  }, []);

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

          <S.LogoutButton>
            <S.Icon name="power" />
          </S.LogoutButton>
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

      <S.Transactions>
        <S.Title>Listagem</S.Title>

        <S.TransactionList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard {...item} />}
        />

        {/*  */}
      </S.Transactions>
    </S.Container>
  );
}

export default Dashboard;
