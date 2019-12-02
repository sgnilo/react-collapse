import React from 'react'
import PropTypes from 'prop-types'

const ArrowIcon = (props) => {
    const { selected, position, expandIcon } = props
    return expandIcon ? <div className={`icon arrow-icon icon-${position}`}>{expandIcon}</div> : <svg className={`icon arrow-icon${selected ? ' arrow-icon-selected' : ''} icon-${position}`} t="1575195983575" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9932" width="14" height="14"><path d="M300.6 895.7c9.6 0 19.3-3.2 27.4-9.6L751.8 545.2c10.3-8.3 16.3-20.8 16.3-34.1 0-13.2-6-25.8-16.3-34L329.8 138c-18.8-15.1-46.3-12.1-61.4 6.7-15.1 18.8-12.1 46.3 6.7 61.4l379.6 305.1L273.2 818c-18.8 15.1-21.8 42.6-6.7 61.4 8.7 10.7 21.3 16.3 34.1 16.3z" fill="#000000" opacity=".65" p-id="9933"></path></svg>
}

class Panel extends React.Component {

    render() {
        const { disabled, header, targetKey, showArrow, extra, children, changeActive, activeValue, expandIconPosition, bordered, expandIcon, style } = this.props
        const selected = activeValue.find(value => value === targetKey) !== undefined
        const tempStyle = (!bordered && selected) ? {borderBottom: 'none'} : null
        let classArray = ['collapse-panel-head']
        bordered && !style && classArray.push('panel-head-bordered')
        disabled && classArray.push('disabled')
        showArrow && classArray.push(`head-with-icon-${expandIconPosition}`)
        bordered && selected && !style && classArray.push('panel-head-bordered-actived')
        return (
            <div className={`collapse-panel${bordered ? ' collapse-panel-bordered' : ''}`} style={style}>
                <div className={classArray.join(' ')} style={tempStyle} onClick={() => {!disabled && changeActive(targetKey)}}>
                    {showArrow && <ArrowIcon selected={selected} position={expandIconPosition} expandIcon={expandIcon}/>}
                    {header}
                    {extra}
                </div>
                <div className={`collapse-panel-content${selected ? '' : ' fold-content'}`}>
                    {children}
                </div>
            </div>
        )
    }
    
}

Panel.propTypes = {
    disabled: PropTypes.bool.isRequired,
    header: PropTypes.string.isRequired,
    targetKey: function(props, propName, componentName) {
        if ((typeof(props[propName]) !== "string" && typeof(props[propName]) !== "number") || !props[propName]){
            return new Error(`Invalid prop '${propName}' supplied to '${componentName}' Validation failed.`)
        }
    },
    showArrow: PropTypes.bool.isRequired,
    extra: PropTypes.object
}

Panel.defaultProps = {
    disabled: false,
    header: '',
    showArrow: true,
    extra: null
}

class Collapse extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            activeValue: props.defaultActiveKey || []
        }
    }

    changeActive(res) {
        const { accordion, onChange } = this.props
        let { activeValue } = this.state
        if (activeValue.find(value => value === res) !== undefined){
            activeValue.splice(activeValue.findIndex(value => value === res),1)
        }else{
            if (accordion) {
                activeValue = []
            }
            activeValue.push(res)
        }
        this.setState({
            activeValue: activeValue
        })
        onChange(activeValue)
    }

    render () {
        const { children, style, bordered, expandIcon, expandIconPosition } = this.props
        const { activeValue } = this.state 
        return (
        <div className='react-collapse-background' style={style}>
            {React.Children.map(children, child => React.cloneElement(child, {activeValue: activeValue, changeActive: this.changeActive.bind(this), expandIconPosition: expandIconPosition, bordered: bordered, expandIcon: expandIcon}))}
        </div>)
    }
}

Collapse.Panel = Panel

Collapse.propTypes = {
    accordion: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultActiveKey: PropTypes.array.isRequired,
    bordered: PropTypes.bool.isRequired,
    expandIcon: PropTypes.object,
    expandIconPosition: PropTypes.string.isRequired
}

Collapse.defaultProps = {
    accordion: false,
    defaultActiveKey: [],
    onChange: () => {},
    bordered: true,
    expandIcon: null,
    expandIconPosition	: 'left'
}

export default Collapse