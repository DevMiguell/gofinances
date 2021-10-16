import React from 'react'
import { categories } from '../../utils/categories'

import {
  Container,
  Title,
  Amount,
  Category,
  CategoryName,
  Icon,
  Date,
  Footer,
} from './styles'


export interface TransactionCardProps {
  type: 'up' | 'down'
  name: string
  amount: string
  category: string
  date: string
}

interface Props {
  data: TransactionCardProps
}

export function TransactionCard({ data }: Props) {
  const category = categories.filter(
    item => item.key === data.category
  )[0]

  return (
    <Container>
      <Title>{data.name}</Title>

      <Amount type={data.type}>
        {data.type === 'down' && '- '}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon}></Icon>
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>
  )
}
