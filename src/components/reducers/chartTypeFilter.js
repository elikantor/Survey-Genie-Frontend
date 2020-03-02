const initialState = {
    chartType: "PIE"
}

const chartTypeFilter = (state = initialState, action) => {
    switch (action.type) {
      case "SET_CHART_TYPE": {
        return action.payload
      }
      default: {
        return state;
      }
    }
  };

export default chartTypeFilter