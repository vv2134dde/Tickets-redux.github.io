import React from 'react'
import '../../styled/index.scss'
import PropTypes from 'prop-types'

const CurrencyItem = ({ currency, selectedCurrency, handleToggle }) => {
    const selectedClass = selectedCurrency ? 'currency__item--selected' : ''
    return (
        <li className={`currency__item ${selectedClass}`}>
            <button
                type="button"
                className={`currency__button ${selectedClass}`}
                key={currency}
                value={currency}
                onClick={handleToggle}
            >
                {currency}
            </button>
        </li>
    )
}
CurrencyItem.propTypes = {
    currency: PropTypes.string.isRequired,
    selectedCurrency: PropTypes.bool.isRequired,
    handleToggle: PropTypes.func.isRequired
}
export default CurrencyItem
