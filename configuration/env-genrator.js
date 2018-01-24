/* This file is run from package.json file.
  At the moment it creates environment variables for two environments i.e: DEVELOPMENT and PRODUCTION.
  To create more environments follow the steps:
  First add enviromnment to constants.json
  Add new create enviromnent TASK to package.json
*/

const fs = require('fs');
const chalk = require('chalk');

function addEnvironmentVariables() {
    //get the whole file as json object
    const env_file = JSON.parse(fs.readFileSync('constants.json', 'utf8'));
    
    //Since its a JavaScript file, a variable need to be exported to accessed by other files.
    const api_var = "export const ApiSettings = ";
    
    //Append the select environment to variable created
    const api_settings = api_var + JSON.stringify(env_file[process.env.NODE_ENV]);

    //Log it to the console, so user know what kind of environment variables are generated.
    console.log(`Environment file built using ${process.env.NODE_ENV} environment ${chalk.green('✓')}`);
    
    fs.writeFileSync('app/_shared/config/environment.js', api_settings);
    
  }

  addEnvironmentVariables();