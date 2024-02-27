/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
import dayjs from "dayjs";

require('cypress-file-upload')
require('cypress-xpath');
require('moment');
var createReport = require('../fixtures/testData/CreateReport.json');
const btn_fileUpload = "input[type=file]"
const btn_upload = "#batch_processing_submit"
const ele_batchProcess = "#batch_processing_batch_process"
const ele_fileType = "//select[@formcontrolname='fileTypeModuleId']"
const ele_browse = "//span[contains(text(),'Browse')]"
const ele_successMsg = "#batch_upload_success_messages"
const ele_uploadMsg = "//div[starts-with(@id, 'batch_upload_')]"

export class batchProcessPage {


    VerfiyBatchProcess() {
        cy.get(ele_batchProcess).find('option').each((item, index) => {
            cy.wrap(item).should('contain.text', createReport.BatchProcess[index])
        })
    }

    ProcessBatch(batch, type) {
        cy.selectDropDownValue(ele_batchProcess, batch);
        cy.wait(1500)
        cy.xpath(ele_fileType).select(type)
        cy.wait(1500)
    }

    SelectProcessBatch(batch) {
        cy.selectDropDownValue(ele_batchProcess, batch);
        cy.wait(1500)
    }


    UploadDocumentAndVerify(filename, filepath) {
        cy.xpath(ele_browse).click({force: true});
        cy.wait(1500)

        cy.get(btn_fileUpload).invoke("removeClass", "file_input_hidden").attachFile(filepath+filename)
        cy.wait(3000);

        cy.get(btn_upload).click({force: true});
        cy.wait(15000);
         cy.xpath(ele_uploadMsg).invoke('text').then((msg) => {
            expect(createReport.FileUploadSuccessMsg).to.equal(msg.trim())
        })
        cy.wait(3000);
    }

    UploadDelinquencyDocumentAndVerify(filename, filepath) {
        cy.xpath(ele_browse).click({force: true});
        cy.wait(1500)

        cy.get(btn_fileUpload).invoke("removeClass", "file_input_hidden").attachFile(filepath+filename)
        cy.wait(3000);

        cy.get(btn_upload).click({force: true});
        cy.wait(5000);
        cy.xpath(ele_uploadMsg).invoke('text').then((msg) => {
            expect(createReport.FileUploadDelinquencySuccessMsg).to.equal(msg.trim())
        })
        cy.wait(3000);
    }


    UploadAndVerifyDocument(filename, filepath) {
        cy.get(btn_fileUpload).invoke("removeClass", "file_input_hidden").attachFile(filepath+filename)
        cy.wait(3000);

        cy.get(btn_upload).click({force: true});
        cy.wait(5000);
            cy.xpath(ele_uploadMsg).invoke('text').then((msg) => {
                expect(createReport.FileUploadSuccessMsg).to.equal(msg.trim())
            })
            cy.wait(3000);
    }


    UploadHardshipDocumentAndVerify(filename, filepath) {
        cy.xpath(ele_browse).click({force: true});
        cy.wait(1500)

        cy.get(btn_fileUpload).invoke("removeClass", "file_input_hidden").attachFile(filepath+filename)
        cy.wait(3000);

        cy.get(btn_upload).click({force: true});
        cy.wait(5000);
        cy.xpath(ele_uploadMsg).invoke('text').then((msg) => {
            expect(createReport.FileUploadHardshipSuccessMsg).to.equal(msg.trim())
        })
        cy.wait(3000);
    }



    }


