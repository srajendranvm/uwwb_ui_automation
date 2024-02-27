/// <reference types="Cypress" />
// ***********************************************************
const fs = require('fs-extra');
const path = require('path');


function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('./cypress', 'config', `${file}.json`);
  return fs.readJson(pathToConfigFile);
}

module.exports = (on, config) => {
  console.log(config);
 const file = config.env.configFile || 'dev';
 //const file = config.env.configFile || 'qa';
  const pathToConfigFile = path.resolve('./cypress', 'config', `${file}.json`);
  return getConfigurationByFile(file);

}

