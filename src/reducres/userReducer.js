const userReducer = (state, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          user: action.payload,
        };
      // Add other user-related cases as needed
      default:
        return state;
    }
  };

  export {userReducer};