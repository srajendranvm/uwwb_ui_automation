/// <reference types="cypress" />
require('cypress-xpath');
import testData from "../fixtures/testData/TestData.json";

// Elements
const userName = "input#username";
const password = "input#password";
const loginBtn = "input.login-btn"
const loginBtnPW = "button#submitLogin"
const warningMsg = "//div[@class='error-icon ng-binding']"
const warningMsgPW = "div#warningMessage"
const forgetPassword= "//a[@ui-sref='auth.forgotPassword']"
const loginAlert = "div.login-title"
const loginAlertPW = "div#loginContainer"
const saveUserName= "//input[@id='saveUsername']//following-sibling::label"

// Env variables
const user = Cypress.env("userName");
const pwd = Cypress.env("pwd");
const unqork = Cypress.env("baseUrl");
const policyWriter = Cypress.env("pwUrl");

export class login{
    openUnqorkApplication(){
        cy.visit(unqork);
    }

    openPolicyWriterApplication(){
        cy.visit(policyWriter);
    }

    loginUnqork(){
        cy.enterText(userName,user);
        cy.enterText(password,pwd);
        cy.clickElement(loginBtn);

        cy.get(loginAlert).should('not.exist');
    }

    loginPolicyWriter(){
        cy.enterText(userName,user);
        cy.enterText(password,pwd);
        cy.clickElement(loginBtnPW);

        cy.get(loginAlertPW).should('not.exist');
    }

    verifyInvalidCredenditialsUnqork(){
        //case1
        cy.log("1. Login with empty credentials")
        cy.clickElement(loginBtn);
        cy.xpath(warningMsg).invoke('text').then((errorMsg) => {
            expect(testData.loginEmptyCredentialErrorMsg).to.equal(errorMsg.trim())
        })

        //case2
        cy.log("2. Login only with username")
        cy.enterText(userName,user);
        cy.clickElement(loginBtn);
        cy.wait(500)
        cy.xpath(warningMsg).invoke('text').then((errorMsg) => {
            expect(testData.loginOnlyWithUsernameErrorMsg).to.equal(errorMsg.trim())
        })

        //case3
        cy.log("3. Login only with password")
        cy.get(userName).clear();
        cy.enterText(password,pwd);
        cy.clickElement(loginBtn);
        cy.wait(500)
        cy.xpath(warningMsg).invoke('text').then((errorMsg) => {
            expect(testData.loginOnlyWithPasswordErrorMsg).to.equal(errorMsg.trim())
        })

        //case4
        cy.log("4. Login with invalid credentials")
        cy.get(password).clear();
        cy.enterText(userName,user);
        cy.enterText(password,pwd);
        cy.clickElement(loginBtn);
        cy.wait(500)
        cy.xpath(warningMsg).invoke('text').then((errorMsg) => {
            expect(testData.LoginWithInvalidCredentialErrorMsg).to.equal(errorMsg.trim())
        })

        cy.xpath(forgetPassword).should('exist');

        cy.xpath(forgetPassword).invoke('text').then((actualText) => {
            expect(testData.LoginForgetPassword).to.equal(actualText.trim())
        })

    }

    verifyInvalidCredenditialsPolicyWriter(){
        //case1
        cy.log("1. Login with empty credentials")
        cy.clickElement(loginBtnPW);
        cy.get(warningMsgPW).invoke('text').then((errorMsg) => {
            expect(testData.loginEmptyCredentialErrorMsgPW).to.equal(errorMsg.trim())
        })

        //case2
        cy.log("2. Login only with username")
        cy.enterText(userName,user);
        cy.clickElement(loginBtnPW);
        cy.wait(500)
        cy.get(warningMsgPW).invoke('text').then((errorMsg) => {
            expect(testData.loginOnlyWithUsernameErrorMsgPW).to.equal(errorMsg.trim())
        })

        //case3
        cy.log("3. Login only with password")
        cy.get(userName).clear();
        cy.enterText(password,pwd);
        cy.clickElement(loginBtnPW);
        cy.wait(500)
        cy.get(warningMsgPW).invoke('text').then((errorMsg) => {
            expect(testData.loginOnlyWithPasswordErrorMsgPW).to.equal(errorMsg.trim())
        })

        //case4
        cy.log("4. Login with invalid credentials")
        cy.get(password).clear();
        cy.enterText(userName,user);
        cy.enterText(password,pwd);
        cy.clickElement(loginBtnPW);
        cy.wait(500)

        cy.enterText(userName,user);
        cy.enterText(password,pwd);
        cy.clickElement(loginBtnPW)

        cy.get(warningMsgPW).invoke('text').then((errorMsg) => {
            expect(testData.LoginWithInvalidCredentialErrorMsgPW).to.equal(errorMsg.trim())
        })

        cy.xpath(saveUserName).should('exist');

        cy.xpath(saveUserName).invoke('text').then((actualText) => {
            expect(testData.LoginSaveUserNamePW).to.equal(actualText.trim())
        })

    }
}
