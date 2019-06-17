import React, { Component } from 'react'
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Download extends Component {
  render() {
    let dataSet = [];
    let groupName = 'Group name';
    const { data } = this.props;
    for (var i = 1; i < data.length; i++) {
      let row = {};
      data[i].map(({value}, n) => {
        if(!!value){
          if(groupName == 'Group name' && !!data[0][n] && data[0][n].value == 'Group name') groupName = value;
          if(!!data[0][n]) row[data[0][n].value] = value;
        }
      });
      dataSet.push(row);
    }
    return (
      <ExcelFile element={<button className="button is-link">Download Data</button>}>
        <ExcelSheet data={dataSet} name={groupName}>
          { !!data.length && data[0].map(item => <ExcelColumn key={item.value} label={item.value} value={item.value}/> )}
        </ExcelSheet>
      </ExcelFile>
    );
  }
}
export default Download;
