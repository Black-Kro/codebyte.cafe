import { Ref } from 'vue';
import { useQuery, useResult } from '/~/gql/composable';
import { GET_ME } from '/~/gql/query';
import { IUser } from '/~/types';

export const useMe = () => {

    const { result, loading, error } = useQuery(GET_ME, {}, { fetchPolicy: 'cache-first' });
    const me: Ref<IUser> = useResult(result, null, (data) => data.me) as unknown as Ref<IUser>;
    
    return {
        me,
        loading,
        error,
    }
}