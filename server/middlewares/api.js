const low = require('lowdb');
const bodyParser = require('body-parser');
const uuid = require('uuid');

function setupDb() {
  const db = low();

  db.defaults({ applications: [], users: [], adetails: [], udetails: [], alist: [] })
    .value();


  // applications = []
  // application = {}

  // applicationsList = []
  // users = []
  // user = {}

  const application1 = { id: 54, clientId: 'iam-brown-local', secretKey: '55997e30-3341-4408-8c4a-83f4ae96564c', displayName: 'Company - Local', domains: null, emailContact: 'eugene.makarov@atmail.com', siteUrl: 'https://eugene.global/', callbackUrl: 'http://localhost:7000/authorization', logoUrl: 'https://eugene.global/wp-content/uploads/2016/05/logo1.png', createDate: '2017-08-25T17:33:38.797', createBy: 'Brad Pitt', lastUpdateDate: null, lastUpdateBy: ' ', isActive: true };
  const application2 = { id: 53, clientId: 'iam-white-dev', secretKey: '59b27332-ab9c-4387-aa69-6e4c646b7814', displayName: 'Comapny - Development', domains: null, emailContact: 'eugene.makarov@atmail.com', siteUrl: 'https://eugene.global/', callbackUrl: 'http://ec2-51-143-135-65.compute-1.amazonaws.com/authorization', logoUrl: 'https://eugenecrm.global/wp-content/uploads/2016/05/logo1.png', createDate: '2017-08-01T15:58:12.157', createBy: 'Brad Pitt', lastUpdateDate: '2017-08-24T15:24:25.813', lastUpdateBy: 'Brad Pitt', isActive: true };
  const application3 = { id: 51, clientId: 'ourcrm-branches', secretKey: '18533E03-1F72-493D-8F2E-E1826CDCBCA8', displayName: 'Company (Branches)', domains: '*', emailContact: 'eugene.makarov@atmail.com', siteUrl: 'http://www.eugene.com', callbackUrl: 'http://eugene-branches-web.azurewebsites.net/Auth', logoUrl: 'https://eugenecrm-branches-web.azurewebsites.net/img/logo.png', createDate: '2017-04-05T21:20:53.54', createBy: 'CRM Developers', lastUpdateDate: null, lastUpdateBy: ' ', isActive: true };

  db.get('applications').push(application1).value();
  db.get('applications').push(application2).value();
  db.get('applications').push(application3).value();


  const user1 = { id: 1183, firstName: 'Leo', lastName: 'Turner', email: 'leo.turner@eugenecrmcrm.com', createDate: '2017-07-06T19:41:05.113', createBy: 'Snoop Dogg', lastUpdateDate: '2017-08-25T17:37:35.84', lastUpdateBy: 'Brad Pitt', isActive: true, birthday: null, phone: null, location: null, aboutMe: null, profilePictureUrl: '/../img/avatar_2x.png', applications: null };
  const user2 = { id: 2, firstName: 'Simon', lastName: 'Smith', email: 'simon.smith@eugenecrmcrm.com', createDate: '2015-10-15T15:54:49.273', createBy: 'CRM Developers', lastUpdateDate: '2017-08-24T16:01:11.58', lastUpdateBy: 'Brad Pitt', isActive: true, birthday: null, phone: null, location: null, aboutMe: null, profilePictureUrl: 'https://eugenecrmdevstorage.blob.core.windows.net/public/images/profile/6dc4ed34-d21f-4ab3-a2aa-731a6ca1bc16imgUserId2.png', applications: null };
  const user3 = { id: 1185, firstName: 'Kate', lastName: 'Rino', email: 'kate.rino@eugenecrmcrm.com', createDate: '2017-07-10T19:16:10.95', createBy: 'Snoop Dogg', lastUpdateDate: '2017-08-24T16:00:39.567', lastUpdateBy: 'Brad Pitt', isActive: true, birthday: null, phone: null, location: null, aboutMe: null, profilePictureUrl: 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png', applications: null };
  const user4 = { id: 1186, firstName: 'Snoop Dogg', lastName: '(customer-service-operator)', email: 'snoop@eugenecrmcrm.com', createDate: '2017-08-11T22:16:05.643', createBy: 'Eugene Makarov', lastUpdateDate: '2017-08-11T22:17:38.453', lastUpdateBy: 'Eugene Makarov', isActive: true, birthday: null, phone: null, location: null, aboutMe: null, profilePictureUrl: 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png', applications: null };
  const user5 = { id: 1184, firstName: 'Matt', lastName: 'Casso', email: 'matt.casso@eugenecrmcrm.com', createDate: '2017-07-10T19:14:13.917', createBy: 'Snoop Dogg', lastUpdateDate: '2017-07-10T19:32:16.343', lastUpdateBy: 'Matt Casso', isActive: true, birthday: null, phone: null, location: null, aboutMe: null, profilePictureUrl: 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png', applications: null };
  const user6 = { id: 7, firstName: 'Lisa', lastName: 'Todd', email: 'lisa.todd@eugenecrmcrm.com', createDate: '2015-10-15T15:54:51.597', createBy: 'CRM Developers', lastUpdateDate: '2017-04-12T21:14:08.077', lastUpdateBy: 'lisa Todd', isActive: true, birthday: '1992-04-13T07:00:00', phone: '', location: 'Langley, Canada', aboutMe: '', profilePictureUrl: 'https://eugenecrmdevstorage.blob.core.windows.net/public/images/profile/ed28efca-8e22-47e0-a1d2-f525764a77beimgUserId7.png', applications: null };


  db.get('users').push(user1).value();
  db.get('users').push(user2).value();
  db.get('users').push(user3).value();
  db.get('users').push(user4).value();
  db.get('users').push(user5).value();
  db.get('users').push(user6).value();

  const application = {  
    id:1,
    clientId:"eugene-test",
    secretKey:"7E896E39-B32C-4698-93D5-3348575588CD",
    displayName:"CRM Test Environment",
    domains:"*",
    emailContact:"support@eugenecrmcrm.com",
    siteUrl:"http://www.eugenecrmcrm.com",
    callbackUrl:"http://eugenecrm-dev-web.azurewebsites.net/Auth",
    userEditCallbackUrl:"http://eugenecrm-dev-api.azurewebsites.net/api/users/iam",
    logoUrl:"https://eugenecrm-dev-web.azurewebsites.net/img/logo.png",
    createDate:"2015-10-15T15:54:56.857",
    createBy:"CRM Developers",
    lastUpdateDate:null,
    lastUpdateBy:" ",
    isActive:true
  };

  db.get('adetails').push(application).value();

  const user = {  
    id:1,
    firstName:"Snoop Dogg",
    lastName:"(customer-service-operator)",
    email:"snoop@eugenecrmcrm.com",
    createDate:"2017-08-11T22:16:05.643",
    createBy:"Eugene Makarov",
    lastUpdateDate:"2017-08-11T22:17:38.453",
    lastUpdateBy:"Eugene Makarov",
    isActive:true,
    birthday:null,
    phone: null,
    location:null,
    aboutMe:null,
    profilePictureUrl:"http://ssl.gstatic.com/accounts/ui/avatar_2x.png",
    applications:[  
      {  
        applicationId:1,
        clientId:"eugenecrmcrm-dev",
        displayName:"CRM Development",
        applicationIsActive:true,
        userApplicationIsActive:true
      },       
      {            
        applicationId:2,
        clientId:"eugenecrmcrm-test",
        displayName:"CRM Test Environment",
        applicationIsActive:true,
        userApplicationIsActive:true
      }
    ]
 };
 
 db.get('udetails').push(user).value();

  let alist = [  
    {  
      "id":53,
      "name":"ADHouse - Development"
    },
    {  
      "id":54,
      "name":"ADHouse - Local"
    },
    {  
      "id":51,
      "name":"CRM (Branches)"
    },
    {  
      "id":1,
      "name":"CRM Development"
    },
    {  
      "id":2,
      "name":"CRM Test Environment"
    },
    {  
      "id":3,
      "name":"IAM Admin (Test)"
    },
    {  
      "id":4,
      "name":"IAM Development"
    },
    {  
      "id":50,
      "name":"PaymentsApiLog"
    }
  ];

  alist.map(a=>{
    db.get('alist').push(a).value();
  });

  return db;
}

module.exports = (app) => {
  const db = setupDb();

  app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    // Pass to next layer of middleware
    next();
  });

  app.use(bodyParser.json());

  app.get('/api/applications', (req, res) => {
    res.send(db.get('applications').toArray().value());
  });

  app.get('/api/lists/applications', (req, res) => {
    res.send(db.get('alist').toArray().value());
  });

  app.get('/api/applications/all', (req, res) => {
    res.send(db.get('adetails').toArray().value());
  });

  app.get('/api/applications/:id', (req, res) => {
    const details = db.get('adetails')
      .find({id: 1})
      .value();

    res.send(details);
  });

  app.get('/api/users/:id', (req, res) => {
    const details = db.get('udetails')
      .find({id: 1})
      .value();

    res.send(details);
  });

  app.get('/api/users', (req, res) => {
    res.send(db.get('users').toArray().value());
  });

  app.get('/api/applications/:name/links', (req, res) => {
    const links = db.get('links').filter((l) =>
      l.topicName === req.params.name
    ).value();
    res.send(links);
  });

  app.post('/api/applications/:name/links', (req, res) => {
    const existingLink = db.get('links').find({ url: req.body.url }).value();
    if (existingLink) {
      return res.send(403);
    }

    const link = Object.assign({}, req.body, {
      id: uuid(),
      voteCount: 0,
      voters: [],
    });
    db.get('links').push(link).value();
    return res.send(link);
  });

  app.post('/api/links/:id/vote', (req, res) => {
    const link = db.get('links').find({ id: req.params.id }).value();
    if (link.voters && link.voters.indexOf(req.body.email) > -1) {
      return res.send(403);
    }

    link.voters.push(req.body.email);
    link.voteCount += req.body.increment;
    return res.send(link);
  });
};
