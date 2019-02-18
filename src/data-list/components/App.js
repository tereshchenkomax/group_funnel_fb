import React, { Component } from 'react'
import _ from 'lodash'
import ReactDataSheet from 'react-datasheet'
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css'

import axios from 'axios'
import DataExport from './DataExport'

import '../../styles/styles.css'

import { serverUrl } from '../../config';

const labelsMap = {
  //group: 'group Id',
  groupName: 'Group name',
  userId: 'user ID',
  userCounter: 'User Counter',
  name: 'Facebook username',
  profileUrl: 'User profile URL',
  //avatarImage: 'Avatar',
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      grid: [],
      spreadsheetsUrl: ''
    }
    chrome.runtime.sendMessage({message: 'GET_DATA'}, (rProps) => {
      const { data, params } = rProps;

      let grid = [];
      let labels = {};
      let labelsArr = [];
      data.forEach(item => {
        let row = [];
        _.forEach(item, (e, key) => {
          if (key !== "avatarImage" || key !== "group"){
            let label = labelsMap[key];
            if ((key !== "answers") && !Array.isArray(e) ) row.push({value: e});
            if (!!label && (!labels[label] && key != "answers")) labels[label] = true;
            if(key == "answers"){
              e.forEach((q,i) => {
                let n = i+1;
                row.push({value: q.question});
                row.push({value: q.answer});
                if (!labels['Q'+n]) labels['Q'+n] = true;
                if (!labels['A'+n]) labels['A'+n] = true;
              })
            }
          }
        });
        grid.push(row);
      })

      _.forEach(labels, (e, key) => {
        labelsArr.push({ value: key});
      })

      grid.unshift(labelsArr);
      this.setState({grid});
      if(!!params.stylesheetUrl){
        this.setState({ grid ,spreadsheetsUrl:params.stylesheetUrl });
      }else{
        this.setState({ grid });
      }
    });
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if(request.message === "UPLOAD_TO_G_SPREADSHEETS"){
        this.uploadToGSpreadsheet().then(res => chrome.runtime.sendMessage({ message: 'CLOSE_PAGE' }));
      };
    });
  }
  uploadToGSpreadsheet(){
    let { grid, spreadsheetsUrl } = this.state;
    grid.splice(0, 1);
    const data = grid.map(item => item.map(k => k.value));
    return axios.post(`${serverUrl}/resendToSpreadSheets`, {
      spreadsheetsUrl,
      data
    })
    .then((response) => {
      return chrome.runtime.sendMessage({message: 'OPEN_PAGE', url: spreadsheetsUrl})
    })
    .catch( (error) => console.log(error) );
  }
  render () {
    const { grid, spreadsheetsUrl } = this.state;
    return (
      <div className="data-list-app">
        <div className="top-row">
          <DataExport data={grid}/>
          <input className="input"
                 type="text"
                 defaultValue={spreadsheetsUrl}
                 onChange={e => this.setState({spreadsheetsUrl: e.target.value})}
                 placeholder="https://docs.google.com/spreadsheets/d/19yEDYA2cOGqfFJmVlUimfdv8WGvvVMokxGGE-_je7Ps/edit#gid=0"
          />
          <button className="button is-primary"
                  onClick={() => this.uploadToGSpreadsheet()}> Upload to Google Spreadsheet </button>
        </div>
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
