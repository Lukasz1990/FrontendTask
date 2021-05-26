import { FETCH_APIS } from '../actions/types'

const initialState = {
  data: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APIS:
      return {
        ...state,
        data: action.data,
      }
    default:
      return state
  }
}
