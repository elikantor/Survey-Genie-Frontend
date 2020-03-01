export default function changeChartType(
    state = {
        chartType: "PIE"
    },
    action
) {
    switch (action.type) {
        case 'PIE':
            return {
                chartType: 'PIE'
            }
        case 'BAR':
            return {
                chartType: 'BAR'
            }
        case 'NUMBER':
            return {
                chartType: "NUMBER"
            }
        default:
            return state
    }
}