import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';

import * as S from './styles';
import { HighlightCard, TransactionCard } from '../../components';
import { TransactionCardProps } from '../../components/TransactionCard';
import theme from '../../styles/theme';

export type TransactionListProps = {
  id: string;
} & TransactionCardProps;

type HighLightDataProps = {
  amount: string;
  lastTransaction: string;
};

type HighLightData = {
  entries: HighLightDataProps;
  expensive: HighLightDataProps;
  total: HighLightDataProps;
};

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionListProps[]>([]);
  const [highLightData, setHighLightData] = useState<HighLightData>(
    {} as HighLightData
  );

  function getLastTransactionDate(
    data: TransactionListProps[],
    type: 'positive' | 'negative'
  ) {
    const lastTransaction = new Date(
      // eslint-disable-next-line prefer-spread
      Math.max.apply(
        Math,
        data
          .filter(item => item.type === type)
          .map(item => new Date(item.date).getTime())
      )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      'pt-BR',
      {
        month: 'long'
      }
    )}`;
  }

  async function loadTransactions() {
    const oldData = await AsyncStorage.getItem('@gofinances:transactions');
    const data = oldData ? JSON.parse(oldData) : [];
    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: TransactionListProps[] = data.map(
      (item: TransactionListProps) => {
        if (item.type === 'positive') {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

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

    const lastTransactionEntries = getLastTransactionDate(data, 'positive');
    const lastTransactionExpensives = getLastTransactionDate(data, 'negative');
    const totalInterval = `01 à ${lastTransactionExpensives}`;

    setHighLightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`
      },
      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpensives}`
      },
      total: {
        amount: (entriesTotal - expensiveTotal).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    });
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  useEffect(() => {
    loadTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.Container>
      {loading ? (
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </S.LoadContainer>
      ) : (
        <>
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
              amount={highLightData.entries.amount}
              lastTransaction={highLightData.entries.lastTransaction}
              type="up"
            />
            <HighlightCard
              title="Saídas"
              amount={highLightData.expensive.amount}
              lastTransaction={highLightData.expensive.lastTransaction}
              type="down"
            />
            <HighlightCard
              title="Total"
              amount={highLightData.total.amount}
              lastTransaction={highLightData.total.lastTransaction}
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
          </S.Transactions>
        </>
      )}
    </S.Container>
  );
}

export default Dashboard;
