import './style/index.scss'
import '../../scss/index.scss'

import React from 'react'
import ReactDom from 'react-dom'

import Pages from './pages'

ReactDom.render(
    <Pages />,
    document.getElementById('react-collapse')
);


if (module.hot) {
    module.hot.accept();
}