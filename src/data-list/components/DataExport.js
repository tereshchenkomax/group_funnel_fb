import React, { Component } from 'react'
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Download extends Component {
  render() {
    let dataSet = [];
    let groupName = 'groupName';
    const { data } = this.props;
    for (var i = 1; i < data.length; i++) {
      let row = {};
      data[i].map(({value}, n) => {
        if(groupName == 'groupName' && data[0][n].value == 'groupName') groupName = value;
        row[data[0][n].value] = value
      });
      dataSet.push(row);
    }
    return (
      <ExcelFile element={<button className="btn-download">Download Data</button>}>
        <ExcelSheet data={dataSet} name={groupName}>
          { !!data.length && data[0].map(item => <ExcelColumn key={item.value} label={item.value} value={item.value}/> )}
        </ExcelSheet>
      </ExcelFile>
    );
  }
}
export default Download;
