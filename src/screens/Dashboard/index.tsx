import React from 'react'

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
} from './styles'

export function Dashboard() {
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
        </UserWrapper>
      </Header>
    </Container>
  )
}
