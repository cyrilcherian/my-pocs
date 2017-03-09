export const comment = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'INIT':{
      state.length  = 0;
      return state.concat(action.payload);
    }
    case 'UPDATE_ITEM':
      return state;
    case 'DELETE_ITEM':
      return state;
    default:
      return state;
  }
}
