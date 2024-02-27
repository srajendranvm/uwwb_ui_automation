// import './commands'
// //require('../support/commands.js')

const customCommands = require('./commands.js')
import './dashboard'

module.exports = {
  commands: customCommands
}

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
    });