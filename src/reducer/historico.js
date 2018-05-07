const initialState = {
    historico : []
}

export default (state = initialState, action) => {
  switch (action.type) {

  case 'GET_HISTORICO':
    return { ...state, historico: action.payload };

  default:
    return state
  }
};
