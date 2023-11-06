import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TicketList from './components/TicketList'
import Preloader from './components/Preloader'
import Header from './components/Header'
import AsideMenu from './components/AsideMenu'
import * as actions from '../../actions/actions'
import './styled/index.scss'
import STOPS_TEXT from '../../constants/stops'

class SearchLayout extends Component {
    constructor() {
        super()
        this.state = {
            options: Array(4).fill(false),
            disabled: false,
            isCheckedSmth: false
        }
    }

    componentDidMount() {
        const { onFetchedTickets } = this.props
        onFetchedTickets()
    }

    onSetOnly(e) {
        const stopType = +e.target.value
        const { length } = Object.keys(STOPS_TEXT)
        const newOptionsOnly = Array(length).fill(false)
        newOptionsOnly[stopType] = true
        this.setState({ options: newOptionsOnly })

        if (e.target.checked) {
            this.setState({ disabled: true })
        } else {
            this.setState({ disabled: false })
        }
    }

    onChange(e) {
        const { options } = this.state
        const isChecked = e.target.checked
        const stopType = +e.target.value
        const { length } = Object.keys(STOPS_TEXT)
        if (stopType === -1) {
            this.setState({ options: Array(length).fill(isChecked) })
            if (e.target.checked) {
                this.setState({ disabled: true })
            } else {
                this.setState({ disabled: false })
            }
        } else {
            const newOptions = [...options]
            newOptions[stopType] = isChecked
            this.setState({ options: newOptions, isCheckedSmth: true })

            //TODO: add state when uncheked all and show default state
        }
    }

    render() {
        const { loading, tickets, currentCurrency, rates, base } = this.props
        const { options, disabled, isCheckedSmth } = this.state

        return (
            <div className="searchLayout">
                <Fragment>
                    <Header />

                    <div className="container">
                        {loading ? (
                            <Preloader />
                        ) : (
                            <Fragment>
                                <aside className="searchLayout__aside">
                                    <AsideMenu
                                        disabled={disabled}
                                        onSetOnly={e => this.onSetOnly(e)}
                                        onChangeCheckbox={e => this.onChange(e)}
                                    />
                                </aside>

                                <div className="searchLayout__content">
                                    <TicketList
                                        options={options}
                                        rates={rates}
                                        tickets={tickets}
                                        base={base}
                                        isCheckedSmth={isCheckedSmth}
                                        currentCurrency={currentCurrency}
                                    />
                                </div>
                            </Fragment>
                        )}
                    </div>
                </Fragment>
            </div>
        )
    }
}

SearchLayout.propTypes = {
    loading: PropTypes.bool.isRequired,
    onFetchedTickets: PropTypes.func.isRequired,
    tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentCurrency: PropTypes.string.isRequired,
    rates: PropTypes.objectOf(
        PropTypes.objectOf(
            PropTypes.oneOfType([
                PropTypes.arrayOf(PropTypes.number),
                PropTypes.number,
                PropTypes.string
            ])
        )
    ).isRequired,
    base: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    tickets: state.tickets.tickets,
    loading: state.tickets.loading,
    currentCurrency: state.rates.currentCurrency,
    rates: state.rates.rates,
    stops: state.stops,
    base: state.rates.base
})

const mapDispatchToProps = {
    onFetchedTickets: actions.fetchTickets
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchLayout)
