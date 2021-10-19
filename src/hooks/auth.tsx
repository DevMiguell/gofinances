import React from 'react'
import { createContext, ReactNode, useContext } from 'react'


interface Props {
  children: ReactNode
}

interface User {
  id: string
  name: string
  email: string
  photo?: string
}

interface AuthContextData {
  user: User
}

const AuthContext = createContext({} as AuthContextData)

const user = {
  id: '1',
  name: 'Miguel',
  email: 'email@email.com',
}

// async function signInWithGoogle() {
//   try {

//   } catch (error) {

//   }
// }

function AuthProvider({ children }: Props) {
  return (
    <AuthContext.Provider value={{
      user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
