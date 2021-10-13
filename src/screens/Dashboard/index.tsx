import React from 'react'
import { HighlightCard } from '../../Components/HighlightCard'
import { TransactionCard, TransactionCardProps } from '../../Components/TransactionCard'

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton
} from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: 'Vendas',
        icon: 'dollar-sign',
      },
      date: "13/04/2020",
    },
    {
      id: '2',
      type: 'negative',
      title: "Hemburgueria Pizzy",
      amount: "R$ 59,00",
      category: {
        name: 'Alimentação',
        icon: 'coffee',
      },
      date: "15/04/2020",
    },
    {
      id: '3',
      type: 'negative',
      title: "Aluguel do AP",
      amount: "R$ 1.200,00",
      category: {
        name: 'Casa',
        icon: 'shopping-bag',
      },
      date: "22/04/2020",
    }]

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{ uri: 'https://avatars.githubusercontent.com/u/53983988?s=400&u=74f3c2c08f875bf0aa54d1461c6b697a1d3f4dff&v=4' }}
            />

            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Miguel</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => { }}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
          type="up"
        />

        <HighlightCard
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 13 de abril"
          type="down"
        />

        <HighlightCard
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 abril"
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagens</Title>

        <TransactionsList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  )
}
