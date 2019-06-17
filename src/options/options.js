import React from 'react'
import ReactDOM from 'react-dom'
import Options from './components/Options'

import '../styles/bulma.min.css'

const MOUNT_NODE = document.getElementById('options')

ReactDOM.render(<Options />, MOUNT_NODE);
