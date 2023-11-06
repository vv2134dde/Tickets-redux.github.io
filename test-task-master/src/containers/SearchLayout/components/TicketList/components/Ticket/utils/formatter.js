import supportedCurrency from '../../../../../../../constants/supportedCurrency'

export const formatText = stops => {
    if (stops === 0) {
        return 'без пересадки'
    }
    if (stops === 1) {
        return '1 пересадка'
    }
    if (stops > 1 && stops < 4) {
        return `${stops} пересадки`
    }
    return `${stops} пересадок`
}

export const currencyFormatter = currency => {
    switch (currency) {
        case supportedCurrency[0]:
            return '₽'
        case supportedCurrency[1]:
            return '$'
        case supportedCurrency[2]:
            return '€'
        default:
            return '₽'
    }
}
