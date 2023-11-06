import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './styled/index.scss'
import * as actions from '../../../../../../actions/actions'
import CurrencyItem from './components/CurrencyItem'
import supportedCurrency from '../../../../../../constants/supportedCurrency'

class CurrencyWidget extends Component {
    componentDidMount() {
        const { onFetchedRates } = this.props
        onFetchedRates()
    }

    render() {
        const { loadingRates, currentCurrency, onSelectCurrency, rates } = this.props
        return (
            <nav className="currency">
                <ul className="currency__list">
                    {loadingRates ? (
                        <div>loading...</div>
                    ) : (
                        supportedCurrency.map((item, key) => (
                            <CurrencyItem
                                key={item}
                                rates={rates}
                                currency={supportedCurrency[key]}
                                selectedCurrency={item === currentCurrency}
                                handleToggle={onSelectCurrency}
                            />
                        ))
                    )}
                </ul>
            </nav>
        )
    }
}
CurrencyWidget.propTypes = {
    loadingRates: PropTypes.bool.isRequired,
    onFetchedRates: PropTypes.func.isRequired,
    rates: PropTypes.objectOf(
        PropTypes.objectOf(
            PropTypes.oneOfType([
                PropTypes.arrayOf(PropTypes.number),
                PropTypes.number,
                PropTypes.string
            ])
        )
    ).isRequired,
    currentCurrency: PropTypes.string.isRequired,
    onSelectCurrency: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    rates: state.rates.rates,
    currentCurrency: state.rates.currentCurrency,
    loadingRates: state.rates.loadingRates
})

const mapDispatchToProps = dispatch => ({
    onFetchedRates: () => dispatch(actions.fetchCurrencyData()),
    onSelectCurrency: e => {
        dispatch(actions.selectCurrency(e.target.value))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrencyWidget)
