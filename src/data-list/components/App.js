import "babel-polyfill";
import React, { Component } from 'react'
import _ from 'lodash'
import ReactDataSheet from 'react-datasheet'
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css'

import axios from 'axios'
import DataExport from './DataExport'

import '../../styles/styles.css'

import { serverUrl } from '../../config';

var labelsMap = {
    //group: 'group Id',
    groupName: 'Group name',
    userId: 'user ID',
    userCounter: 'User Counter',
    name: 'Facebook username',
    profileUrl: 'User profile URL',
    //avatarImage: 'Avatar',
    joinedFacebookOn: 'Joined on Facebook',
    from: 'From',
    livesIn: 'Lives In',
    worksAt: 'Works At',
    wentTo: 'Went to',
    studiedAt: 'Studied at',
  }

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      grid: [],
      userEmail: null,
      getAllEntities: null,
      spreadsheetsUrl: '',
    }

    chrome.identity.getProfileUserInfo((userInfo) => {
      if (userInfo && userInfo.email) {
        let newState;
        newState = {...newState, userEmail: userInfo.email};

        return axios.get(`${serverUrl}/get_settings/${userInfo.email}`)
          .then(({data}) => {
            const { settings } = data;
            const { spreadsheetsUrl, getAllEntities } = settings;
            if (spreadsheetsUrl){
              newState = {...newState, spreadsheetsUrl};
            }
            if (getAllEntities){
              newState = {...newState, getAllEntities};
            }
            this.setState({...newState});
          })
          .catch( (error) => {
            this.setState({...newState})
          });
        }else{
          this.setState({...newState})
        }
    })

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

      // _.forEach(labels, (e, key) => {
      //   labelsArr.push({ value: key});
      // })

      // grid.unshift(labelsArr);

      if(!!params.spreadsheetsUrl){
        this.setState({
          grid,
          spreadsheetsUrl: params.spreadsheetsUrl,
          userEmail: params.userEmail,
          getAllEntities: params.getAllEntities,
        });
      }else{
        this.setState({ grid });
      }
    });
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if(request.message === "UPLOAD_TO_G_SPREADSHEETS"){
        this.uploadToGSpreadsheet()
          .then(res => chrome.runtime.sendMessage({ message: 'CLOSE_PAGE' }));
      };
    });
  }

  uploadToGSpreadsheet(){
    return new Promise(resolve => {
      let { grid, spreadsheetsUrl, userEmail, getAllEntities } = this.state;

      //grid.splice(0, 1);

      const data = grid.map(item => item.map(k => k.value));

      let size = 50; //размер подмассива
      let subarray = []; //массив в который будет выведен результат.
      for (let i = 0; i < Math.ceil(data.length/size); i++){
          subarray[i] = data.slice((i*size), (i*size) + size);
      }

      function getPause() {
        return new Promise(resolve => {
          setTimeout(() => resolve('☕'), 4000); // it takes 2 seconds to make coffee
        });
      }

      async function upload() {
        for (var i = 0; i < subarray.length; i++) {
          await getPause();

          await axios.post(`${serverUrl}/resendToSpreadSheets`, {
            spreadsheetsUrl: spreadsheetsUrl,
            getAllEntities: getAllEntities,
            userEmail: userEmail,
            data: subarray[i]
          })

        }
      }
      upload();
      return Promise.resolve(chrome.runtime.sendMessage({message: 'OPEN_PAGE', url: spreadsheetsUrl}));
    })
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
                 onChange={(e) => this.setState({spreadsheetsUrl: e.target.value})}
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
