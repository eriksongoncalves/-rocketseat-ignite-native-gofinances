import React, { useState, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useFocusEffect } from '@react-navigation/core';

import * as S from './styles';
import { categories } from '../../utils/categories.json';
import { HistoryCard } from '../../components';
import { TransactionCardProps } from '../../components/TransactionCard';
import theme from '../../styles/theme';

export type TransactionListProps = {
  id: string;
} & TransactionCardProps;

type TotalByCategory = {
  name: string;
  color: string;
  total: number;
  totalFormatted: string;
  percentFormatted: string;
  percent: number;
};

function Resume() {
  const [loading, setLoading] = useState(false);
  const [totalByCategories, setTotalByCategories] = useState<TotalByCategory[]>(
    []
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const bottomTabBarHeight = useBottomTabBarHeight();

  async function loadTransactions() {
    const oldData = await AsyncStorage.getItem('@gofinances:transactions');
    const data: TransactionListProps[] = oldData ? JSON.parse(oldData) : [];

    setLoading(true);

    const expensives = data.filter(
      item =>
        item.type === 'negative' &&
        new Date(item.date).getMonth() === selectedDate.getMonth() &&
        new Date(item.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensivesTotal = expensives.reduce(
      (acc: number, item: TransactionListProps) => {
        return acc + Number(item.amount);
      },
      0
    );

    const totalByCategory: TotalByCategory[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach(item => {
        if (item.category === category.key) {
          categorySum += Number(item.amount);
        }
      });

      if (categorySum > 0) {
        const total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        const percent = (categorySum / expensivesTotal) * 100;

        totalByCategory.push({
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted: total,
          percent,
          percentFormatted: percent.toFixed(0) + '%'
        });
      }
    });

    setTotalByCategories(totalByCategory);
    setLoading(false);
  }

  function handleChangeData(action: 'next' | 'previous') {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate])
  );

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo por categoria</S.Title>
      </S.Header>

      {loading ? (
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </S.LoadContainer>
      ) : (
        <S.Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: bottomTabBarHeight
          }}
        >
          <S.MonthSelect>
            <S.MonthSelectButton onPress={() => handleChangeData('previous')}>
              <S.MonthSelectIcon name="chevron-left" />
            </S.MonthSelectButton>

            <S.Month>
              {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
            </S.Month>

            <S.MonthSelectButton onPress={() => handleChangeData('next')}>
              <S.MonthSelectIcon name="chevron-right" />
            </S.MonthSelectButton>
          </S.MonthSelect>

          <S.ChartContainer>
            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map(category => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: '#ffffff'
                }
              }}
              labelRadius={55}
              x="percentFormatted"
              y="total"
            />
          </S.ChartContainer>

          {totalByCategories.map(item => (
            <HistoryCard
              key={item.name}
              title={item.name}
              color={item.color}
              amount={item.totalFormatted}
            />
          ))}
        </S.Content>
      )}
    </S.Container>
  );
}

export default Resume;
