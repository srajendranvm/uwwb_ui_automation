/// <reference types="cypress-xpath" />
/// <reference types="cypress" />
import { login } from '../../page-objects/login-page.js';
const Login = new login;

describe("Spec_VerifyInvalidLoginUnqork.js", () => {

    it('Open Unqork Application', function () {
       Login.openUnqorkApplication();
    });

    it("'Login without any input and verify the error message', 'Enter only the 'username' and verify the error message' ,  " +
        "'Enter only the 'password' and verify the error message' , " +
        "'Enter invalid credentials and verify the error message' , 'Save Username' should exist'", function () {
        Login.verifyInvalidCredenditialsUnqork();
    });

});
    