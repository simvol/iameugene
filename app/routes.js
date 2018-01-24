// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';
import TokenInterceptor  from './_shared/config/token-interceptor';
import pathToRegexp from 'path-to-regexp';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      // onEnter: TokenInterceptor,
      path: '/signin',
      name: 'loginContainer',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/LoginContainer/reducer'),
          System.import('containers/LoginContainer/sagas/sagas'),
          System.import('containers/LoginContainer'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('loginContainer', reducer.default);
          injectSagas('loginContainer', sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, 
    {
      // onEnter: TokenInterceptor,
      path: '/home',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/MainPage'),
          System.import('containers/NavigationContainer/reducer'),
          System.import('containers/NavigationContainer/sagas'),
          System.import('containers/HeaderContainer/reducer'),
          System.import('containers/HeaderContainer/sagas/index')
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component, navReducer, navSagas, headerReducer, headerSagas]) => {
          injectReducer('sidemenu', navReducer.default);
          injectSagas('navigationContainer', navSagas.default);
          injectReducer('header', headerReducer.default);
          injectSagas('headerContainer', headerSagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      childRoutes: [
        {
          path: '/applications/:id',
          name: 'applicationDetailsContainer',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/Applications/ApplicationDetailsContainer/reducer'),
              System.import('containers/Applications/ApplicationDetailsContainer/sagas/index'),
              System.import('containers/Applications/ApplicationDetailsContainer'),
            ]);
    
            const renderRoute = loadModule(cb);
    
            importModules.then(([reducer, sagas, component]) => {
              injectReducer('applicationDetails', reducer.default);
              injectSagas('applicationDetailsContainer', sagas.default);
              renderRoute(component);
            });
    
            importModules.catch(errorLoading);
          },
        },
        {
          path: '/applications',
          name: 'applicationsListContainer',
          getComponent(location, cb) {
            const importModules = Promise.all([
              System.import('containers/Applications/ApplicationsListContainer/reducer'),
              System.import('containers/Applications/ApplicationsListContainer/sagas/index'),
              System.import('containers/Applications/ApplicationsListContainer'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('applicationsList', reducer.default);
              injectSagas('applicationsListContainer', sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/users/:id',
          name: 'userDetailsContainer',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/Users/UserDetailsContainer/reducer'),
              System.import('containers/Users/UserDetailsContainer/sagas/index'),
              System.import('containers/Users/UserDetailsContainer'),
            ]);
    
            const renderRoute = loadModule(cb);
    
            importModules.then(([reducer, sagas, component]) => {
              injectReducer('userDetails', reducer.default);
              injectSagas('userDetailsContainer', sagas.default);
              renderRoute(component);
            });
    
            importModules.catch(errorLoading);
          },
        },
        {
          path: '/users',
          name: 'usersListContainer',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/Users/UsersListContainer/reducer'),
              System.import('containers/Users/UsersListContainer/sagas/sagas'),
              System.import('containers/Users/UsersListContainer'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('usersList', reducer.default);
              injectSagas('usersListContainer', sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/',
          name: 'dashboardContainer',
          getComponent(location, cb) {
            const importModules = Promise.all([
              System.import('containers/DashboardContainer/reducer'),
              System.import('containers/DashboardContainer/sagas'),
              System.import('containers/DashboardContainer'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('dashboardContainer', reducer.default);
              injectSagas('dashboardContainer', sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/:link/upcoming',
          name: 'upComingContainer',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/UpcomingContainer'),
            ]);
    
            const renderRoute = loadModule(cb);
    
            importModules.then(([component]) => {
              renderRoute(component);
            });
    
            importModules.catch(errorLoading);
          },
        }
      ],
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
