/// <reference types="cypress-xpath" />
/// <reference types="cypress" />
import { login } from '../../page-objects/login-page.js';
const Login = new login;

describe("Spec_VerifyLoginUnqork.js", () => {

    it('Open Unqork Application', function () {
       Login.openUnqorkApplication();
    });

    it("'Login with username and password' and verify the 'Login alert' doesn't exist'", function () {
        Login.loginUnqork();
    });

});
    