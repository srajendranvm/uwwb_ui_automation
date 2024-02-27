/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
require('cypress-file-upload')
require('cypress-xpath');
require('moment');
import { writeFileSync } from "fs";
import * as XLSX from "xlsx";
var createClaim = require('../fixtures/testData/CreateClaim.json');
const lnk_addComment = "//div[@class='col-sm-12 col-md-12 col-lg-12 pln prn']//a[contains(text(),'Add Comment')]"
const ele_commentTxt = "//td[@style='display: table-cell;']//span"
const lnk_addViewComments = "#claims_create_maintain_claims_add_view_comments_label"
const ele_addCommentTxtArea = "#department_comments_comment_field"
const ele_addCommentTxtAreaSave = "#department_comments_save_button"
const btn_back = "#department_comments_back_button"
const ele_commentTxtArea = "#party_party_comment"
const ele_viewCommentsToggle = "//input[@id='myonoffswitch']"
const ele_tableEntry = "//tr[@class='ui-widget-content ui-datatable-even']//span"
const btn_fileUpload = "input[type=file]"
const btn_upload = "#documentUpload_uploadDocuments_upload"
const ele_uploadDelete = "//button[@class='custom-delete-btn']"
const ele_uploadErrorMsg = "#document_upload_search_policy_error_messages"


export class PAS {
    AddCommentAndVerify() {
        const randomString = "Automation "+ (Math.random() + 1).toString(36).substring(7)
        cy.log("randomString : "+randomString)
        console.log("randomString : "+randomString)
        //cy.pause();
        cy.clickByText('a', 'Add | View Comments')
        cy.get(ele_addCommentTxtArea).type(randomString )
        cy.get(ele_addCommentTxtAreaSave).click({force: true});
        cy.wait(1500);

        cy.xpath(ele_commentTxt).first().invoke('text').then((message) => {
            expect(randomString).to.equal(message.trim())
        })
        cy.get(btn_back).click({force: true});
        cy.wait(3000);
    }
    AddCommentParty() {
        cy.wait(12000)
        const randomString = "Automation "+ (Math.random() + 1).toString(36).substring(7)
        cy.log("randomString : "+randomString)
        cy.wait(3000)
        cy.get(ele_commentTxtArea).type(randomString )
        cy.wait(3000)
        cy.clickByText('button', 'SAVE')
        cy.xpath(ele_viewCommentsToggle).click({force: true});
        cy.wait(9000);

        cy.xpath(ele_commentTxt).last().invoke('text').then((message) => {
            expect(randomString).to.equal(message.trim())
        })
        cy.wait(3000);
    }

    UploadDocumentAndVerify(){
        cy.clickByText('a', 'Document Upload');
        //cy.get(lnk_documentUpload).click({force: true});
        cy.wait(6000)

        cy.get(btn_fileUpload).invoke("removeClass","file_input_hidden").attachFile(createClaim.UploadFile)
        cy.wait(10000);

        cy.get(btn_upload).click({force: true});
        cy.wait(6000);

        cy.xpath(ele_tableEntry).first().invoke('text').then((fileName) => {
            expect(createClaim.UploadFile).to.equal(fileName.trim())
        })



        cy.xpath(ele_uploadDelete).its('length').then((beforeCount) => {
            cy.log("beforeCount :"+beforeCount)
            cy.xpath(ele_uploadDelete).first().click({force: true})
            cy.wait(3000)
            cy.clickByText('button', 'OK')
            cy.wait(6000)

            if (beforeCount =="1"){

            }
            else if(beforeCount !="1") {
                cy.xpath(ele_uploadDelete).its('length').then((afterCount) => {
                expect(beforeCount-1).to.equal(afterCount)
            })
            }

        })

        cy.get(btn_fileUpload).invoke("removeClass","file_input_hidden").attachFile(createClaim.UploadInvalidFile)
        cy.wait(6000);

        cy.get(btn_upload).click({force: true});
        cy.wait(6000);

        cy.get(ele_uploadErrorMsg).invoke('text').then((errorMsg) => {
            expect(createClaim.UploadErrorMsg).to.equal(errorMsg.trim())
        })

    }

    CovertToJSON () {

        try {
            const workBook = XLSX.readFile("cypress/fixtures/sample.xlsx");
            const jsonData = XLSX.utils.sheet_to_json(workBook.Sheets.testData);
            writeFileSync(
                "cypress/fixtures/samplejson.json",
                JSON.stringify(jsonData, null, 4),
                "utf-8"
            );
        } catch (e) {
            throw Error(e);
        }
    }


}


