/*
 *
 * UsersListContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectUsersListContainer from './selectors';
import GridList from '../../../components/GridList';
import * as usersActions from './actions';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { showLoading } from '../../../_shared/actions';
import { SORT_OPTIONS } from '../../../_shared/constants';
import moment from 'moment';

import ConfirmationModal from '../../../components/ConfirmationModal';

export class UsersListContainer extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired
  }

  constructor(props){
    super(props);

    this.navigateTo = this.navigateTo.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onPageSizeChange = this.onPageSizeChange.bind(this);
    this.onRefresh = this.onRefresh.bind(this);

    this.deleteUser = this.deleteUser.bind(this);
    this.deleteConfirm = this.deleteConfirm.bind(this);
    this.deleteCancel = this.deleteCancel.bind(this);
    this.filterChange = this.filterChange.bind(this);
    this.sortBy = SORT_OPTIONS.DATE_DESC;
    this.filterValue = '';
    
    this.state = {
      pagination: {
        total: 1,
        page: 1,
        size: 10,
        filter: this.sortBy
      },
      showModal: false,
      deleteRowID: -1
    }
  }
  
  componentWillMount() {
    this.props.actions.requestUsers(this.state.pagination);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list && nextProps.list){
      this.mapDataUsers(nextProps.list);
      this.setState({pagination: {...this.state.pagination, total: +nextProps.totalUsers }});
      this.state.showModal == true ? this.setState({showModal: false}) : '';
    }
  }

  onPageChange(event) {
    this.setState({pagination: { ...this.state.pagination, page: +event.target.value}}, () => {this.props.actions.showLoading(false); this.props.actions.requestUsers(this.state.pagination)});
  }  


  onPageSizeChange(event) {
    
    this.setState({pagination: {...this.state.pagination, page: 1, size: +event.target.value}}, () => {this.props.actions.showLoading(true); this.props.actions.requestUsers(this.state.pagination)});
    
  }

  onRefresh(){
    this.filterValue = '', this.sortBy = SORT_OPTIONS.DATE_DESC;
       
    this.setState({pagination: {...this.state.pagination, page: 1, filter: `${this.sortBy}/${this.filterValue}`}}, () => {
      this.props.actions.showLoading(false);
      this.props.actions.fetchUsers(this.state.pagination);
    })
  }

  columns = [
    {dataField: 'email', isKey: true, dataSort: true, dataFormat: 'link', displayName: 'Email', width: '27%'},
    {dataField: 'name', isKey: false, dataSort: true, displayName: 'Name', width: '27%'},
    {dataField: 'updated', isKey: false, displayName: 'Updated Date', width: '27%'},
    {dataField: 'active', isKey: false, dataFormat: 'active', displayName: 'Active', width: '60px'},
    {dataField: 'buttons', isKey: false, dataFormat: 'buttons', displayName: 'Actions'},
  ];

  deleteUser (id) {
    this.setState({showModal: true, deleteRowID: id});
  }

  deleteConfirm (){
    this.props.actions.deleteUser(this.state.deleteRowID);
  }

  deleteCancel (){
    this.setState({showModal: false});
  }
  

  navigateTo (menuItem) {
    this.props.actions.push(menuItem);
  };

  filterChange = (event) => {
    this.filterValue = event && event.target && event.target.value ? event.target.value : '';

    this.setState({pagination: {...this.state.pagination, filter: `${this.sortBy}/${this.filterValue}`}}, () => {
      this.props.actions.fetchUsers(this.state.pagination);
    })
  };

  onSortChange = (sortBy) => {
    
    sortBy = sortBy === 'name' ? 'firstName' : sortBy;

    this.sortBy = sortBy;
    this.filterChange();
  }

  breadcrumbs = [{url:'/', name:'Home'}, {name:'Users'}];
  
  // Mapping properties we want to display
  mapDataUsers(users) {
    this.data = users.map(user => {
      return {
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        updated: user.lastUpdateDate ?
          `${moment(user.lastUpdateDate).format('MMM DD, YYYY - h:mm a')} (${user.lastUpdateBy})`
          :
          `${moment(user.createDate).format('MMM DD, YYYY - h:mm a')} (${user.createBy})`,
        active: user.isActive,
        id: user.id,
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
            onClick: this.deleteUser,
          },          
        ]
      };
    });
  }

  render() {
    return (
      <div>
        {this.data &&
          <GridList
            listData={this.data}
            ajaxRequestsInProgress={this.props.ajaxRequestsInProgress}
            columnsDef={this.columns}
            breadcrumbs={this.breadcrumbs}
            navigateTo={this.navigateTo}
            location={this.props.location}
            onPageSizeChange={this.onPageSizeChange}
            onPageChange={this.onPageChange}
            pagination={this.state.pagination}
            refreshClick={this.onRefresh}
            filterChange={this.filterChange}
            filterValue={this.filterValue}
            filterPlaceholder='Search by User Name'
            onSortChange={this.onSortChange}/>            
        }
        <ConfirmationModal header={`Delete`} body={`Are you sure you want to delete the user?`} confirm={{text: 'Delete', color:'danger', callBack:this.deleteConfirm, isDisabled:false}} cancel={{text: 'Cancel', color:'primary', callBack:this.deleteCancel, isDisabled: false}} showModal={this.state.showModal}/>
      </div>
    );
  }
}

const mapStateToProps = selectUsersListContainer();

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({},usersActions, {push, showLoading}), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersListContainer);
