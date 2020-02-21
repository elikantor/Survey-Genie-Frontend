export default function renderReducer(
    state = {
      render: "/"
    },
    action
  ) {
    switch (action.type) {
      case 'INCREASE_COUNT':
        return {
          ...state,
          render: action.paylod
        }
   
      default:
        return state;
    }
  }