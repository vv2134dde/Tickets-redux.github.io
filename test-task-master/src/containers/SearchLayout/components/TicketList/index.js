import React from 'react'
import PropTypes from 'prop-types'
import Ticket from './components/Ticket/index'
import sortByPrice from './utils/utils'
import NotFoundTicket from './components/NotFoundTicket/index'
import './styled/index.scss'

const TicketList = ({ tickets, currentCurrency, rates, base, options, isCheckedSmth }) => (
    <div className="ticket__list">
        {tickets && tickets.length > 0 ? (
            tickets
                .sort(sortByPrice('price'))
                .filter(ticket => {
                    if (isCheckedSmth) {
                        return options[ticket.stops]
                    }
                    return true
                })
                .map((ticket, index) => (
                    <Ticket
                        base={base}
                        rates={rates}
                        currentCurrency={currentCurrency}
                        key={index}
                        info={ticket}
                    />
                ))
        ) : (
            <NotFoundTicket />
        )}
    </div>
)

TicketList.propTypes = {
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
    isCheckedSmth: PropTypes.bool.isRequired,
    options: PropTypes.arrayOf(PropTypes.bool).isRequired,
    base: PropTypes.string.isRequired
}

export default TicketList
