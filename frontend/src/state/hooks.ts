import { useSelector, useDispatch } from 'react-redux'
import { State } from './types'

export const useFetchData = () => {

}

export const useUser = () => {
  return useSelector((state: State) => state.user)
}