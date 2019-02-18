import React from 'react'
import ReactDOM from 'react-dom'
import Popup from './components/Popup'

import '../styles/bulma.min.css'

const MOUNT_NODE = document.getElementById('popup')

ReactDOM.render(<Popup />, MOUNT_NODE);
