import React, { PureComponent } from 'react'
import _ from 'lodash'

import axios from 'axios'

import '../../styles/styles.css'

import { serverUrl } from '../../config';

class Popup extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      getAllEntities: true,
      spreadsheetsUrl: '',
      hasError: false,
    };
    this.uploadData = this.uploadData.bind(this)
  }

  componentDidMount(){
    let newState = {};
    chrome.runtime.sendMessage({ "message": "GET_PARAMS"}, params => {
      if(!!params){
        if(!!params.getAllEntities){
          newState = {...newState, getAllEntities: params.getAllEntities};
        }
        if(!!params.stylesheetUrl){
          newState = {...newState, spreadsheetsUrl: params.spreadsheetsUrl};
        }
        this.setState({...newState});
      }
    });

    chrome.identity.getProfileUserInfo((userInfo) => {
      if (userInfo && userInfo.email) {

        newState = {...newState, userEmail: userInfo.email};

        return axios.get(`${serverUrl}/get_settings/${userInfo.email}`, {
        })
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
  }

  uploadData(){
    const {spreadsheetsUrl} = this.state;

    if (!spreadsheetsUrl) {
      if (!this.state.hasError) {
        this.setState({hasError: true});
      }
      return;
    }

    if (this.state.hasError) {
      this.setState({hasError: false});
    }


    const params = {...this.state};
    params.serverUrl = serverUrl;
    chrome.runtime.sendMessage({ "message": "ACTION::SEND_DATA", params });
  }

  render () {
    const { spreadsheetsUrl, getAllEntities, hasError } = this.state;
    const inputClass = hasError ? 'is-danger': 'is-success';
    return (
    <div className="popup">
      <div className="columns">
        <div className="column">
          <div className="bd-callout is-primary">
            <form id="settings">
              <div className="control">
                <label className="radio">
                  <input type="radio"
                         name="entities"
                         onChange={() => {
                            if (getAllEntities) return;
                            this.setState({getAllEntities: true});
                         }}
                         checked={!!getAllEntities}
                  />
                  <span className="radio-label">
                    Upload all entities
                  </span>
                </label>
                <label className="radio">
                  <input type="radio"
                         name="entities"
                         onChange={() => {
                            if (!getAllEntities) return;
                            this.setState({getAllEntities: false});
                         }}
                         checked={!getAllEntities}
                  />
                  <span className="radio-label">
                    Upload only entites with answer/question
                  </span>
                </label>
              </div>
              <input className={`input ${inputClass}`}
                     type="text"
                     name="stylesheetUrl"
                     onChange={({target}) => this.setState({spreadsheetsUrl:target.value})}
                     value={spreadsheetsUrl}
                     placeholder="https://docs.google.com/spreadsheets/d/${spreadsheetsID}/edit#gid=0"
              />
            </form>
{/*         <button
              className="button is-success is-inverted is-outlined"
              onClick={this.saveSettings}
            >
              Save Settings
            </button>*/}
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="bd-callout is-primary">
            <div className="buttons">
              <button
                className="button is-success is-inverted is-outlined"
                onClick={this.uploadData}
              >
                Upload to Google Spreadsheet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Popup;
