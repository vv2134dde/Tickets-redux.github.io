import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import TransferBlock from './components/TransferBlock/index'
import CurrencyWidget from './containers/CurrencyWidget/index'

const AsideMenu = ({ onChangeCheckbox, disabled, onSetOnly }) => (
    <Fragment>
        <h3 className="subtitle">Валюта</h3>
        <CurrencyWidget />
        <TransferBlock
            disabled={disabled}
            onSetOnly={onSetOnly}
            onChangeCheckbox={onChangeCheckbox}
        />
    </Fragment>
)

AsideMenu.propTypes = {
    onChangeCheckbox: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    onSetOnly: PropTypes.func.isRequired
}

export default AsideMenu
