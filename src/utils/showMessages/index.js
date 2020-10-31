const { showMessage } = require("react-native-flash-message")
const { colors } = require("../colors")

export const showErr = message => {
    showMessage({
        message: message,
        type:'default',
        backgroundColor:colors.error,
        color: colors.white
    })
}

export const showSuccess= message => {
    showMessage({
        message: message,
        type:'default',
        backgroundColor:colors.primary,
        color: colors.white
    })
}