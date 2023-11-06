import React, { Component } from 'react'
import './styled/index.scss'
import PropTypes from 'prop-types'
import shapesTicket from '../../../../../../constants/shapes'
import logo from '../../../../../../img/logo1.jpg'
import { formatText, currencyFormatter } from './utils/formatter'

class Ticket extends Component {
    constructor(props) {
        super(props)
        this.state = {
            priceTicket: this.props.info.price
        }
    }

    componentDidUpdate(prevProps) {
        const { currentCurrency, info } = this.props
        const priceExchanged = this.exchange(info.price, currentCurrency)
        if (prevProps.currentCurrency !== currentCurrency) {
            this.setState({
                priceTicket: priceExchanged
            })
        } else {
            return null
        }
    }

    exchange = (price, toCurrentCurrency) => {
        const { rates, base } = this.props

        const rate = rates[base][toCurrentCurrency]
        if (!rate) {
            throw new Error(`Unable to convert price to currency`)
        }
        const result = Number.parseFloat(price)
        if (!result || Number.isNaN(result)) {
            throw new Error('Ticket price should be a number')
        }

        return Math.round(result * rate)
    }

    render() {
        const { info, currentCurrency } = this.props
        const { priceTicket } = this.state

        return (
            <div className="ticket">
                <div className="ticket__col-buy">
                    <div className="airline-logo">
                        <img alt="" src={logo} />
                    </div>
                    <button type="button" className="button button--default">
                        Купить за
                        <span className="ticket__price">
                            {priceTicket} <span>​{currencyFormatter(currentCurrency)}</span>
                        </span>
                    </button>
                </div>

                <div className="ticket__content">
                    <div className="fly">
                        <span className="fly__line" />
                        <p className="fly__title">{formatText(info.stops)}</p>
                        <span className="fly__icon">
                            <svg
                                height="13"
                                viewBox="0 0 13 13"
                                width="13"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="m793.5 209.6v-1.3l-5.474-3.25v-3.575c0-.54-.458-.975-1.026-.975s-1.026.435-1.026.975v3.575l-5.474 3.25v1.3l5.474-1.625v3.575l-1.369.975v.975l2.395-.65 2.395.65v-.975l-1.369-.975v-3.575z"
                                    fill="#d2d5d6"
                                    transform="translate(-780 -200)"
                                />
                            </svg>
                        </span>
                    </div>

                    <div className="row">
                        <div className="col-50 align-left">
                            <p className="ticket__time">{info.departure_time}</p>
                            <p className="ticket__location">
                                {' '}
                                <span>{info.origin}</span>, {info.origin_name}{' '}
                            </p>
                            <time className="ticket__date">{info.departure_date}</time>
                        </div>

                        <div className="col-50 align-right">
                            <p className="ticket__time">{info.arrival_time}</p>
                            <p className="ticket__location">
                                <span>{info.carrier}</span>, {info.destination_name}{' '}
                            </p>
                            <time className="ticket__date">{info.arrival_date}</time>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Ticket.propTypes = {
    info: shapesTicket.isRequired,
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

export default Ticket
