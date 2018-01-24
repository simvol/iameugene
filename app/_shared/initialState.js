export default {
  applicationsList: {
    list: [],
  },
  applicationDetails: {
    applicationDetails: {},
  },
  usersList: {
    list: [],
    totalUsers: 0,
  },
  userDetails: {
    userDetails: {
      applications: []
    },
  },
  lists: {},
  loginContainer: {
    appInfo: {},
    isFailed: false,
    userImgURL: '//ssl.gstatic.com/accounts/ui/avatar_2x.png'
  },
  requests: {
    ajaxRequestsInProgress: 0,
    showSpinner: true  
  },
  language: {
    locale: 'en',
  },
  userPrefrences:{
    pagination: {
      page: 1,
      size: 10,
      filter: 'date%20desc'
    },
    totalPages: []
  },
  dashboardContainer : {},
  sidemenu: {
    expanded: true,
  },
  header: {
    currentUser: {}
  }
};
