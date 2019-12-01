import React from 'react'

const Panel = (props) => {
    
    const defaultProps = {
        disabled: false,
        header: '',
        key: '',
        showArrow: true,
        extra: null
    }
    const { children, disabled, header, key, showArrow, extra } = props
    console.log(disabled)
    return (
    <div className="collapse-panel">
        <div className={`${disabled ? 'disabled ' : ''}collapse-panel-head`}>{header}</div>
        <div className="collapse-panel-content">
            {children}
        </div>
    </div>
    )
}

let defaultProps = {
    accordion: false,
    defaultActiveKey: undefined,
    onChange: () => {},
    bordered: true,
    expandIcon: undefined,
    expandIconPosition	: 'left'
}

class Collapse extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            activeValue: []
        }
    }

    getValid (value, defaultValue) {
        if (value !== undefined) return value
        return defaultValue
    }

    currentProps () {
        const { accordion, onChange, defaultActiveKey, bordered, expandIcon, expandIconPosition } = this.props
        let tempProps = { ...this.defaultProps}
        tempProps.accordion = this.getValid(accordion, defaultProps.accordion)
        tempProps.onChange = this.getValid(onChange, defaultProps.onChange)
        tempProps.defaultActiveKey = this.getValid(defaultActiveKey, defaultProps.defaultActiveKey)
        tempProps.bordered = this.getValid(bordered, defaultProps.bordered)
        tempProps.expandIcon = this.getValid(expandIcon, defaultProps.expandIcon)
        tempProps.expandIconPosition = this.getValid(expandIconPosition, defaultProps.expandIconPosition)
        return tempProps
    }

    render () {
        const { accordion, onChange, defaultActiveKey, bordered, expandIcon, expandIconPosition } = this.currentProps();
        const { children } = this.props
        return (
        <div className={`react-collapse-background${bordered ? ' bordered' : ''}`}>
            {children}
        </div>)
    }
}

Collapse.Panel = Panel

export default Collapse