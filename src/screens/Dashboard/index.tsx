import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import { HighlightCard } from '../../Components/HighlightCard'
import { TransactionCard, TransactionCardProps } from '../../Components/TransactionCard'
import { useFocusEffect } from '@react-navigation/core'
import { useTheme } from 'styled-components'

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
  LogoutButton,
  LoadContainer
} from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '../../hooks/auth'

export interface DataListProps extends TransactionCardProps {
  id: string
}

interface HighlightProps {
  amount: string
  lastTransaction: string
}

interface HighlightData {
  entries: HighlightProps
  expensive: HighlightProps
  total: HighlightProps
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [transaction, setTransaction] = useState<DataListProps[]>([])
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)

  const theme = useTheme()
  const { signOut, user } = useAuth()

  function getLastTransitionDate(collection: DataListProps[], type: 'up' | 'down') {
    const collectionFilttered = collection.filter(transaction => transaction.type === type)

    if (collectionFilttered.length === 0)
      return 0

    const lastTransaction =
      new Date(
        Math.max.apply(Math,
          collectionFilttered
            .map(transaction => new Date(transaction.date).getTime())))

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleDateString('pt-BR', { month: 'long' })}`
  }

  async function loadTransaction() {
    const dataKey = `@gofinances:transactions_use:${user.name}`
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    let entriesTotal = 0
    let expensiveTotal = 0

    const transactionsFormated: DataListProps[] = transactions
      .map((item: DataListProps) => {
        if (item.type === 'up') {
          entriesTotal += Number(item.amount)
        } else {
          expensiveTotal += Number(item.amount)
        }

        const amount = Number(item.amount)
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date))


        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        }
      })

    const total = entriesTotal - expensiveTotal
    const lastTransactionEntries = getLastTransitionDate(transactions, 'up')
    const lastTransactionExpensives = getLastTransitionDate(transactions, 'down')
    const totalInterval = lastTransactionEntries === 0 ? 'Não há transações' : `01 a ${lastTransactionEntries}`


    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionEntries === 0
          ? 'Não há transações'
          : `Última entrada dia ${lastTransactionEntries}`
      },
      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionExpensives === 0
          ? 'Não há transações'
          : `Última saida dia ${lastTransactionExpensives}`
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    })
    setTransaction(transactionsFormated)
    setIsLoading(false)
  }

  useEffect(() => {
    loadTransaction()
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransaction()
  }, []))

  return (
    <Container>
      {
        isLoading ?
          <LoadContainer>
            <ActivityIndicator
              color={theme.colors.primary}
              size="large"
            />
          </LoadContainer> :
          <>
            <Header>
              <UserWrapper>
                <UserInfo>
                  <Photo
                    source={{ uri: user.photo }}
                  />

                  <User>
                    <UserGreeting>Olá, </UserGreeting>
                    <UserName>{user.name}</UserName>
                  </User>
                </UserInfo>

                <LogoutButton onPress={signOut}>
                  <Icon name="power" />
                </LogoutButton>
              </UserWrapper>
            </Header>

            <HighlightCards>
              <HighlightCard
                title="Entradas"
                amount={highlightData.entries.amount}
                lastTransaction={highlightData.entries.lastTransaction}
                type="up"
              />

              <HighlightCard
                title="Saídas"
                amount={highlightData.expensive.amount}
                lastTransaction={highlightData.expensive.lastTransaction}
                type="down"
              />

              <HighlightCard
                title="Total"
                amount={highlightData.total.amount}
                lastTransaction={highlightData.total.lastTransaction}
                type="total"
              />
            </HighlightCards>

            <Transactions>
              <Title>Listagens</Title>

              <TransactionsList
                data={transaction}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionCard data={item} />}
              />
            </Transactions>
          </>
      }
    </Container>
  )
}
