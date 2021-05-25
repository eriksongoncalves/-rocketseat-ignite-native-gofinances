import React from 'react';

import * as S from './styles';

type HighlightCardProps = {
  amount: string;
  lastTransaction: string;
  title: string;
  type: 'up' | 'down' | 'total';
};

const icons = {
  up: `arrow-up-circle`,
  down: `arrow-down-circle`,
  total: `dollar-sign`
};

function HighlightCard({
  amount,
  lastTransaction,
  title,
  type
}: HighlightCardProps) {
  return (
    <S.Container type={type}>
      <S.Header>
        <S.Title type={type}>{title}</S.Title>
        <S.Icon name={icons[type]} type={type} />
      </S.Header>

      <S.Footer>
        <S.Amount type={type}>{amount}</S.Amount>
        <S.LastTransaction type={type}>{lastTransaction}</S.LastTransaction>
      </S.Footer>
    </S.Container>
  );
}

export default HighlightCard;
