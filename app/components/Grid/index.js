import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import A from '../A';
import YesNoGrid from '../YesNoGrid';
import GridFooter from '../GridFooter'
import FontAwesome from 'react-fontawesome';
import moment from 'moment';

import styles from './styles.css';

/**
 * columns - array of objects 
 *    {dataField: 'displayName', isKey: true, dataSort: true, dataFormat: 'link', displayName: 'Application Name'}
 * navigateTo - callback function for container to manage router state
 * location - location object with pathname to make link object (it will then be passed as parameter to navigateTo function inside 'A' component)
 * lite - boolean, lite styles
 */
function Grid({ data, columns, navigateTo, location, lite, onPageSizeChange, onPageChange, pagination, changeApplicationStatus, onSortChange }) {
  let tclass = '';

  function linkFormatter(cell, row) {
    return <A navigateTo={navigateTo} link={{url:`${location.pathname}/${row.id}`, name: `${cell}`}} />;
  }

  function isActiveFormatter(cell, row) {
    function handleClick(e){
      if (!changeApplicationStatus) return;
      changeApplicationStatus(row);
      e.preventDefault();
      e.stopPropagation();
    }
    return <div onClick={handleClick}><YesNoGrid value={cell} uniqueId={`active${row.id}`} enabled={changeApplicationStatus}/></div>
  }

  function buttonFormatter(cell, row) {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        {cell.map( (b,i) => {
          if (b.tooltip === 'Edit') {
            return <button onClick={() => navigateTo(`${location.pathname}/${row.id}`)} key={`${b.tooltip}${i}`} title={b.tooltip} className={`btn btn-${b.color}`} style={{marginLeft: '2px', marginRight: '2px'}}> <FontAwesome name={b.icon}/></button>
          } 
          return <button onClick={() => b.onClick(row.id)} key={`${b.tooltip}${i}`} title={b.tooltip} className={`btn btn-${b.color}`} style={{marginLeft: '2px', marginRight: '2px'}}> <FontAwesome name={b.icon}/></button>
        })}
      </div>
    );
  }

  if (lite  === true) {
    tclass = 'grid-lite';
  }

  return (
    <div className={`${styles.grid} ${tclass}`}>
      <BootstrapTable data={data} options={{onSortChange}} striped hover >
        {columns.map((column, i) => {
          if (column.dataFormat === 'link') {
            return (
              <TableHeaderColumn
                key={i}
                isKey={column.isKey}
                dataSort={column.dataSort}
                dataField={column.dataField}
                dataFormat={linkFormatter}
                hideSelectColumn={column.hideSelectColumn}
                width={column.width}
                dataAlign={column.align}
              >
                {column.displayName}
              </TableHeaderColumn>);
          }

          if (column.dataFormat === 'active'){
            return(
              <TableHeaderColumn
                key={i}
                isKey={column.isKey}
                dataSort={column.dataSort}
                dataField={column.dataField}
                hideSelectColumn={column.hideSelectColumn}
                dataFormat={isActiveFormatter}
                width={column.width}
                dataAlign={column.align}
              >
                {column.displayName}
              </TableHeaderColumn>);
          }

          if (column.dataFormat === 'buttons'){
            return(
              <TableHeaderColumn
                key={i}
                isKey={column.isKey}
                dataSort={column.dataSort}
                dataField={column.dataField}
                hideSelectColumn={column.buttonFormatter}
                dataFormat={buttonFormatter}
                width={column.width}
                dataAlign={column.align}
              >
                {column.displayName}
              </TableHeaderColumn>);
          }          

          return (
            <TableHeaderColumn
              key={i}
              isKey={column.isKey}
              dataSort={column.dataSort}
              dataField={column.dataField}
              hideSelectColumn={column.hideSelectColumn}
              width={column.width}
              dataAlign={column.align}
            >
              {column.displayName}
            </TableHeaderColumn>);
        })}
      </BootstrapTable>
      
      { pagination &&
        <GridFooter onPageSizeChange={onPageSizeChange} onPageChange={onPageChange} pagination={pagination}/>}

    </div>
  );
}

Grid.propTypes = {
  data: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
};

export default Grid;
