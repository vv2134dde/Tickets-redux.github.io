import React from 'react'
import PropTypes from 'prop-types'
import STOPS_TEXT from '../../../../../../constants/stops'
import Checkbox from './components/Checkbox'
import './styled/index.scss'

const TransferBlock = ({ onChangeCheckbox, disabled, onSetOnly }) => (
    <nav className="transfer">
        <div className="transfer__list">
            <div className="transfer__item">
                <Checkbox
                    onChangeCheckbox={onChangeCheckbox}
                    text="Все"
                    key={-1}
                    id={-1}
                    stopNumber={-1}
                />
            </div>

            {Object.keys(STOPS_TEXT).map(item => (
                <div key={item} className="transfer__item">
                    <Checkbox
                        onChangeCheckbox={onChangeCheckbox}
                        key={item}
                        id={item}
                        text={STOPS_TEXT[item]}
                        stopNumber={item}
                        disabled={disabled}
                        onSetOnly={onSetOnly}
                    />
                </div>
            ))}
        </div>
    </nav>
)

TransferBlock.propTypes = {
    onChangeCheckbox: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    onSetOnly: PropTypes.func.isRequired
}

export default TransferBlock
