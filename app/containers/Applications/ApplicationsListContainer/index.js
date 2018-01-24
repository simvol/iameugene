/*
 *
 * ApplicationsListContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectApplicationsListContainer from './selectors';
import GridList from '../../../components/GridList';
import * as applicationsActions from './actions';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { showLoading } from '../../../_shared/actions';
import { SORT_OPTIONS } from '../../../_shared/constants';

import ConfirmationModal from '../../../components/ConfirmationModal'

export class ApplicationsListContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
  }

  constructor(props){
    super(props);

    this.navigateTo = this.navigateTo.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onPageSizeChange = this.onPageSizeChange.bind(this);
    this.onRefresh = this.onRefresh.bind(this);

    this.deleteApplication = this.deleteApplication.bind(this);
    this.deleteConfirm = this.deleteConfirm.bind(this);
    this.deleteCancel = this.deleteCancel.bind(this);
    this.filterChange = this.filterChange.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.sortBy = SORT_OPTIONS.DATE_DESC;
    this.filterValue = '';
    
    this.state = {
      pagination: {
        total: 1,
        page: 1,
        size: 10,
        filter: this.sortBy,
      },
      showModal: false,
      deleteRowID: -1
    }
  }

  componentWillMount() {
    this.props.actions.requestApplications(this.state.pagination);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.list) {
      this.mapApplications(nextProps.list);
      this.setState({pagination: {...this.state.pagination, total: +nextProps.totalApplications }});
      this.state.showModal == true ? this.setState({showModal: false}) : '';
    }
  }

  onPageChange(event) {
    this.setState({pagination: { ...this.state.pagination,page: +event.target.value}}, () => this.props.actions.requestApplications(this.state.pagination));
  }

  onPageSizeChange(event) {
    this.setState({pagination: {...this.state.pagination, page: 1, size: +event.target.value}}, () => this.props.actions.requestApplications(this.state.pagination));
  }

  onRefresh(){
    this.filterValue = '', this.sortBy = SORT_OPTIONS.DATE_DESC;

    this.setState({pagination: {...this.state.pagination, page: 1, filter: `${this.sortBy}/${this.filterValue}`}}, () => {
      this.props.actions.fetchApplications(this.state.pagination);
    })
  }

  deleteApplication (id) {
    this.setState({showModal: true, deleteRowID: id});
  }

  deleteConfirm (){
    this.props.actions.deleteApplication(this.state.deleteRowID);
  }

  deleteCancel (){
    this.setState({showModal: false});
  }

  columns = [
    {dataField: 'displayName', isKey: true, dataSort: true, dataFormat: 'link', displayName: 'Display Name'},
    {dataField: 'emailContact', isKey: false, dataSort: true, displayName: 'Email'},
    {dataField: 'logoUrl', isKey: false, dataSort: true, displayName: 'Logo Url'},
    {dataField: 'siteUrl', isKey: false, dataSort: true, displayName: 'Site Url'},
    {dataField: 'buttons', isKey: false, dataFormat: 'buttons', displayName: 'Actions'},    
  ];

  navigateTo = (menuItem) => {
    this.props.actions.push(menuItem);
  };

  filterChange = (event) => {
    this.filterValue = event && event.target && event.target.value ? event.target.value : this.filterValue;

    this.setState({pagination: {...this.state.pagination, filter: `${this.sortBy}/${this.filterValue}`}}, () => {
      this.props.actions.fetchApplications(this.state.pagination);
    })
  };

  onSortChange = (sortBy) => {
    // console.log(sortBy);
    this.sortBy = sortBy;
    this.filterChange();
  }

  breadcrumbs = [{url:'/', name:'Home'}, {url:'', name:'Applications'}];

  mapApplications (applications) {
    this.data = applications.map(app => {
      return {
        ...app,
        buttons: [
          {
            tooltip: 'Edit',
            icon: 'pencil-square-o',
            color: 'primary',
            onClick: this.navigateTo,
          },
          {
            tooltip: 'Remove',
            icon: 'remove',
            color: 'danger',
            onClick: this.deleteApplication,
          },          
        ]
      }
    });
  }

  render() {
    return (
      <div>
        { this.data && 
          <GridList
            listData={this.data}
            ajaxRequestsInProgress={this.props.ajaxRequestsInProgress}
            columnsDef={this.columns}
            breadcrumbs={this.breadcrumbs}
            navigateTo={this.navigateTo}
            location={this.props.location}
            onPageChange={this.onPageChange}
            onPageSizeChange={this.onPageSizeChange}
            pagination={this.state.pagination}
            refreshClick={this.onRefresh}
            filterChange={this.filterChange}
            filterValue={this.filterValue}
            filterPlaceholder='Search by Application Name'
            onSortChange={this.onSortChange}/>
        }
        <ConfirmationModal header={`Delete`} body={`Are you sure you want to delete the application?`} confirm={{text: 'Delete', color:'danger', callBack:this.deleteConfirm, isDisabled:false}} cancel={{text: 'Cancel', color:'primary', callBack:this.deleteCancel, isDisabled: false}} showModal={this.state.showModal}/>
      </div>
    );
  }
}

const mapStateToProps = selectApplicationsListContainer();

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, applicationsActions, {push,showLoading}), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsListContainer);
