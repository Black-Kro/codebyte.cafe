import { Ref } from 'vue'
import { useQuery, useResult } from '@black-kro/use-apollo'
import { client } from '/~/apollo'
import { store } from '/~/shared/store'
import { GET_ME } from '/~/apollo/query'
import { IUser } from '/~/types'

export const useMeAsync = async() => {
  if (store.getters['auth/status'] === 'AUTHENTICATED') {
    const { data, error } = await client.query({ query: GET_ME, fetchPolicy: 'cache-first' })

    return {
      me: data.me as IUser,
      error,
    }
  }
  else {
    return {
      me: null,
      error: 'Not Authenticated',
    }
  }
}

export const useMe = () => {
  const { result, loading, error } = useQuery(GET_ME, {}, { fetchPolicy: 'cache-first' })
  const me: Ref<IUser> = useResult(result, null, data => data.me) as unknown as Ref<IUser>

  return {
    me,
    loading,
    error,
  }
}
