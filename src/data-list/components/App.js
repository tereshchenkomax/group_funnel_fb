import React, { Component } from 'react'
import _ from 'lodash'
import ReactDataSheet from 'react-datasheet';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css';

import DataExport from './DataExport'

import 'styles/styles.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      grid: []
    }
    chrome.runtime.sendMessage({message: 'GET_DATA'}, (data) => {
      let grid = [];
      let labels = {};
      let labelsArr = [];
      data.forEach(item => {
        let row = [];
        _.forEach(item, (e, key) => {
          if (key != 'answers') row.push({value: e});
          if (!labels[key] && key != 'answers') labels[key] = true;
          if(key == 'answers'){
            e.forEach((q,i) => {
              let n = i+1;
              row.push({value: q.question});
              row.push({value: q.answer});
              if (!labels['question'+n]) labels['question'+n] = true;
              if (!labels['answer'+n]) labels['answer'+n] = true;
            })
          }
        });
        grid.push(row);
      })

      _.forEach(labels, (e, key) => {
        labelsArr.push({ value: key});
      })

      grid.unshift(labelsArr);
      this.setState({grid});
    });
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log('request', request);
    });
  }
  render () {
    const { grid } = this.state;
    return (
      <div>
        <DataExport data={grid}/>
        <ReactDataSheet
          data={grid}
          valueRenderer={(cell) => cell.value }
          onCellsChanged={changes => {
            const grid = grid.map(row => [...row])
            changes.forEach(({cell, row, col, value}) => {
              grid[row][col] = {...grid[row][col], value}
            })
            this.setState({grid})
          }}
        />
      </div>
    )
  }
}
export default App;
