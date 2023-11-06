import React from 'react'
import PropTypes from 'prop-types'
import './styled/index.scss'

const Checkbox = ({ id, text, onChangeCheckbox, disabled, onSetOnly }) => (
    <label className="checkbox-wrap" htmlFor={id}>
        <input
            className="checkbox__input"
            value={id}
            onChange={onChangeCheckbox}
            id={id}
            type="checkbox"
            disabled={disabled}
        />
        <span className="checkbox__view" />
        <span className="checkbox__txt">{text}</span>
        {id !== -1 && (
            <button onClick={onSetOnly} value={id} type="button" className="transfer__only">
                Только
            </button>
        )}
    </label>
)

Checkbox.defaultProps = {
    disabled: false
}
Checkbox.defaultProps = {
    onSetOnly: () => {}
}

Checkbox.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    text: PropTypes.string.isRequired,
    onChangeCheckbox: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    onSetOnly: PropTypes.func
}

export default Checkbox
