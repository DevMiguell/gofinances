import React from 'react'
import { ButtonProps } from 'react-native'

import { Container, Category, Icon } from './styles'

interface Props extends ButtonProps {
  title: string;
}

export function CategorySelectButton({ title }: Props) {
  return (
    <Container>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  )
}
