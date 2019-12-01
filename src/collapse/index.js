import React from 'react'

const ArrowIcon = (props) => {
    const { selected, position, expandIcon } = props
    return expandIcon ? <div className={`icon arrow-icon${selected ? ' arrow-icon-selected' : ''} icon-${position}`}>{expandIcon}</div> : <svg className={`icon arrow-icon${selected ? ' arrow-icon-selected' : ''} icon-${position}`} t="1575195983575" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9932" width="14" height="14"><path d="M300.6 895.7c9.6 0 19.3-3.2 27.4-9.6L751.8 545.2c10.3-8.3 16.3-20.8 16.3-34.1 0-13.2-6-25.8-16.3-34L329.8 138c-18.8-15.1-46.3-12.1-61.4 6.7-15.1 18.8-12.1 46.3 6.7 61.4l379.6 305.1L273.2 818c-18.8 15.1-21.8 42.6-6.7 61.4 8.7 10.7 21.3 16.3 34.1 16.3z" fill="#000000" opacity=".65" p-id="9933"></path></svg>
}

class Panel extends React.Component {
    
    defaultPanelProps = {
        disabled: false,
        header: '',
        key: '',
        showArrow: true,
        extra: null
    }

    getValid (value, defaultValue) {
        if (value !== undefined) return value
        return defaultValue
    }

    currentProps() {
        const { disabled, header, key, showArrow, extra } = this.props
        const defaultProps = this.defaultPanelProps
        let tempProps = { ...this.defaultPanelProps}
        tempProps.disabled = this.getValid(disabled, defaultProps.disabled)
        tempProps.header = this.getValid(header, defaultProps.header)
        tempProps.key = this.getValid(key, defaultProps.key)
        tempProps.showArrow = this.getValid(showArrow, defaultProps.showArrow)
        tempProps.extra = this.getValid(extra, defaultProps.extra)
        return tempProps
    }

    render() {
        const { children, changeActive, index, activeValue, expandIconPosition, bordered, expandIcon, style } = this.props
        const { disabled, header, key, showArrow, extra } = this.currentProps()
        const selected = activeValue.find(value => value === index) !== undefined
        const tempStyle = (!bordered && selected) ? {borderBottom: 'none'} : null
        let classArray = ['collapse-panel-head']
        bordered && classArray.push('panel-head-bordered')
        disabled && classArray.push('disabled')
        showArrow && classArray.push(`head-with-icon-${expandIconPosition}`)
        bordered && selected && !style && classArray.push('panel-head-bordered-actived')
        console.log(showArrow)
        return (
            <div className={`collapse-panel${bordered ? ' collapse-panel-bordered' : ''}`} style={style}>
                <div className={classArray.join(' ')} style={tempStyle} onClick={() => {!disabled && changeActive(index)}}>
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

class Collapse extends React.Component {

    defaultCollapseProps = {
        accordion: false,
        defaultActiveKey: undefined,
        onChange: () => {},
        bordered: true,
        expandIcon: undefined,
        expandIconPosition	: 'left'
    }

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
        let tempProps = { ...this.defaultCollapseProps}
        const defaultProps = this.defaultCollapseProps
        tempProps.accordion = this.getValid(accordion, defaultProps.accordion)
        tempProps.onChange = this.getValid(onChange, defaultProps.onChange)
        tempProps.defaultActiveKey = this.getValid(defaultActiveKey, defaultProps.defaultActiveKey)
        tempProps.bordered = this.getValid(bordered, defaultProps.bordered)
        tempProps.expandIcon = this.getValid(expandIcon, defaultProps.expandIcon)
        tempProps.expandIconPosition = this.getValid(expandIconPosition, defaultProps.expandIconPosition)
        return tempProps
    }

    changeActive(res) {
        const { accordion } = this.props
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
    }

    render () {
        const { accordion, onChange, defaultActiveKey, bordered, expandIcon, expandIconPosition } = this.currentProps();
        const { children, style } = this.props
        const { activeValue } = this.state 
        return (
        <div className='react-collapse-background' style={style}>
            {React.Children.map(children, (child, index) => React.cloneElement(child, {activeValue: activeValue, index: index, changeActive: this.changeActive.bind(this), expandIconPosition: expandIconPosition, bordered: bordered, expandIcon: expandIcon}))}
        </div>)
    }
}

Collapse.Panel = Panel

export default Collapse