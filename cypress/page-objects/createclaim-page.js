/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
import dayjs from "dayjs";

require('cypress-file-upload')
require('cypress-xpath');
require('moment');
var createClaim = require('../fixtures/testData/CreateClaim.json');

const btn_viewClaim = "#claims_summary_view_claim"
const ele_propertyName = "//select[@formcontrolname='propertyNames']"
const ele_saleMethod = "//select[@formcontrolname='saleMethod']"
const ele_saleType = "//select[@formcontrolname='saleType']"
const sel_claimStatus = "//select[@formcontrolname='claimStatus']"
const lnk_addComment = "//div[@class='col-sm-12 col-md-12 col-lg-12 pln prn']//a[contains(text(),'Add Comment')]"
const btn_claimSave = "#claims_create_maintain_claims_save"
const ele_addCommentInput = "//div[@class='ui-dialog-content ui-widget-content']//input"
const btn_addCommentSave = "//button[@icon='fa-check']"
const ele_commentTxt = "//td[@style='display: table-cell;']//span"
const ele_getCommentTxt = "//div[@style='word-wrap: break-word;']"
const lnk_addViewComments = "#claims_create_maintain_claims_add_view_comments_label"
const ele_addCommentTxtArea = "#department_comments_comment_field"
const ele_addCommentTxtAreaSave = "#department_comments_save_button"
const ele_settlementDate = "//p-calendar[starts-with(@id,'claims_details_mip_settlement_date_')]//input"
const ele_soldDate = "//p-calendar[starts-with(@id,'claims_details_sold_date_')]//input"
const ele_paidDate = "//p-calendar[starts-with(@id,'claims_settlement_options_paid_date_')]//input"
const ele_saleAmount = "//input[starts-with(@id,'foreclosure_sal_amount_')]"
const ele_SaveMsgSuccess = "#claims_create_maintain_claims_success_messages"
const ele_SaveMsgError = "#claims_create_maintain_claims_error_messages"
const btn_back = "#department_comments_back_button"
const btn_uploadBack = "#document_upload_back_button"
const ele_claimStatus = "//select[@id='claims_details_claim_status']"
const ele_claimNumber = "//a[@class='ng-tns-c1-59']//header"
const btn_fileUpload = "input[type=file]"
const btn_upload = "#documentUpload_uploadDocuments_upload"
const lnk_claimHistory = "#claims_create_maintain_claims_history"
const lnk_documenUpload = "#hardship_create_maintain_hardship_upload_documents_label"
const ele_tableEntry = "//tr[@class='ui-widget-content ui-datatable-even']//span"
const btn_claimReopen = "#claims_create_maintain_claims_reopen"
const ele_creator = "#wq_creator"
const ele_TransactionSummaryTable ="//tr[starts-with(@class,'ui-widget-content ')]"
const ele_TransactionEntry = "span.ui-cell-data"
const btn_claimHistoryBack ="claims_history_back_button"
const ele_RecoveryTab = "//a[contains(text(), 'Recovery')]"
const ele_RecoveryDate = "//p-calendar[starts-with(@id,'claims_recovery_details_date_of_recovery')]//input"
const ele_RecoveryAmount = "//input[@id='claims_recovery_details_recovery_amount']"
const ele_RecoveryComments = "//input[@id='claims_recovery_details_comments']"
const ele_AddRecovery = "//a[contains(text(), 'Add Recovery')]"
const ele_GetRecoveryData = "//tr[@class='ui-widget-content ui-datatable-even']//span[@class='ui-cell-data']"
const ele_EditRecovery = "//i[@class='fa fa-pencil-square-o']"
const ele_UpdateRecovery = "//a[contains(text(), 'Update Recovery')]"
const ele_DeleteRecovery = "//i[@class='fa fa-trash-o']"

export class ClaimPolicy {

    CreateClaim() {
       cy.get(btn_viewClaim).click();
       cy.wait(2000);
       cy.selectDropDown(ele_propertyName,1 )
       cy.selectDropDown(ele_saleMethod,createClaim.SaleMethod ).scrollIntoView()
       cy.selectDropDown(ele_saleType,createClaim.SaleType ,{force: true}).scrollIntoView()
       cy.wait(1000);
       cy.xpath(ele_soldDate).type(dayjs().format('DD/MM/YYYY'), {force: true})
       cy.xpath(ele_settlementDate).type(dayjs().add(1,"days").format('DD/MM/YYYY'), {force: true})
       cy.xpath(ele_saleAmount).type(createClaim.SaleAmount, {force: true}).scrollIntoView()
        cy.get(btn_claimSave).click({force: true}).scrollIntoView()

        const randomString = "Automation "+ (Math.random() + 1).toString(36).substring(7)
        cy.log("randomString : "+randomString)

       cy.get(lnk_addViewComments).click({force: true});
       cy.get(ele_addCommentTxtArea).type(randomString )
       cy.get(ele_addCommentTxtAreaSave).click({force: true});
        cy.wait(1500);

       cy.xpath(ele_commentTxt).first().invoke('text').then((message) => {
            expect(randomString).to.equal(message.trim())
        })
        cy.get(btn_back).click({force: true});
        cy.wait(3000);
        // cy.xpath(ele_getCommentTxt).first().invoke('text').then((message) => {
        //     expect(randomString).to.equal(message.trim())
        // }) //Commented - Bug

        cy.xpath(lnk_addComment).scrollIntoView().click();
        cy.wait(1000);
        cy.log();
        cy.xpath(ele_addCommentInput).type(randomString+ " other")
        cy.xpath(btn_addCommentSave).click({force: true});
        cy.xpath(ele_getCommentTxt).first().invoke('text').then((message) => {
            expect(randomString+ " other").to.equal(message.trim())
        })  //Commented - Bug

       cy.get(btn_claimSave).click({force: true})
       cy.get(ele_SaveMsgSuccess).invoke('text').then((message) => {
            expect(createClaim.SuccessMessage).to.equal(message.trim())
        })
        cy.wait(1500);
        cy.selectDropDown(ele_claimStatus,createClaim.CloseStatus )
        cy.get(btn_claimSave).click({force: true});

        cy.get(ele_SaveMsgError).invoke('text').then((message) => {
            expect(createClaim.ErrorMessage).to.equal(message.trim())
        })

        cy.get(lnk_documenUpload).click({force: true});
        cy.wait(1500)

        cy.get(btn_fileUpload).invoke("removeClass","file_input_hidden").attachFile(createClaim.UploadFile)
        cy.wait(3000);

        cy.get(btn_upload).click({force: true});
        cy.wait(3000);

        cy.xpath(ele_tableEntry).first().invoke('text').then((fileName) => {
            expect(createClaim.UploadFile).to.equal(fileName.trim())
        })

        cy.get(btn_uploadBack).click({force: true});
        cy.wait(3000);

        cy.xpath(ele_claimNumber).invoke('text').then((claim) => {
            cy.log("Claim Number : " + claim)
            expect(claim).to.not.equal('')
        })


    }

    CloseReopenClaim(){

        cy.selectDropDownValue(ele_creator,createClaim.Creator);
        cy.pause();
        cy.wait(1500)
        cy.clickByText('button', 'SUBMIT');
        cy.wait(1500)

        const partyID = cy.xpath(ele_tableEntry).first().invoke('text');
        cy.log(partyID)
        cy.xpath(ele_tableEntry).first().click({force: true});
        cy.wait(3000)

        cy.selectDropDown(ele_claimStatus,createClaim.CloseStatusOther )
        cy.xpath(ele_paidDate).type(dayjs().format('DD/MM/YYYY'), {force: true})
        cy.get(btn_claimSave).click({force: true});
        cy.wait(3000);
        cy.clickByText('a', 'Claims History');
        cy.wait(1500)

        cy.xpath(ele_TransactionSummaryTable).eq(0).find(ele_TransactionEntry).eq(4).invoke('text').then((oldValue) => {
            cy.log("Transaction Type : " + oldValue)
            expect(createClaim.InprogressStatus).to.equal(oldValue.trim())
        })

        cy.xpath(ele_TransactionSummaryTable).eq(0).find(ele_TransactionEntry).eq(5).invoke('text').then((oldValue) => {
            cy.log("Transaction Type : " + oldValue)
            expect(createClaim.CloseStatusOther).to.equal(oldValue.trim())
        })

        cy.clickByText('button', 'BACK');

        cy.get(btn_claimReopen).click({force: true});
        cy.wait(1500);
        cy.xpath(ele_paidDate).clear({force: true})
        cy.wait(3000);
        cy.get(btn_claimSave).click({force: true});
        cy.wait(3000);
        cy.clickByText('a', 'Claims History');
        cy.wait(1500)

        cy.xpath(ele_TransactionSummaryTable).eq(0).find(ele_TransactionEntry).eq(4).invoke('text').then((oldValue) => {
            cy.log("Transaction Type : " + oldValue)
            expect(createClaim.CloseStatusOther).to.equal(oldValue.trim())
        })

        cy.xpath(ele_TransactionSummaryTable).eq(0).find(ele_TransactionEntry).eq(5).invoke('text').then((oldValue) => {
            cy.log("Transaction Type : " + oldValue)
            expect(createClaim.InprogressStatus).to.equal(oldValue.trim())
        })
        cy.clickByText('button', 'BACK');


    }

    VerifyRecovery() {
        cy.get(btn_viewClaim).click();
        cy.wait(2000);
        //cy.selectDropDown(ele_propertyName,1 )
        //ele_claimStatus
        cy.selectDropDown(sel_claimStatus,createClaim.RecoveryStatus ).scrollIntoView()
        cy.get(btn_claimSave).click({force: true}).scrollIntoView()
        cy.wait(1500)
        cy.xpath(ele_RecoveryTab).first().click({force: true})
        cy.wait(2000)
        cy.log("Hiiiii")
        cy.xpath(ele_RecoveryDate).type(dayjs().format('DD/MM/YYYY'), {force: true})
        cy.wait(1500)
        //cy.get(ele_RecoveryAmount).click({force: true}).scrollIntoView()
        cy.xpath(ele_RecoveryAmount).type(createClaim.RecoveryAmount,{force: true})
        cy.wait(1500)
        const randomString = "Recovery by Automation"+ (Math.random() + 1).toString(36).substring(7)
        cy.log("randomString : "+randomString)
        cy.xpath(ele_RecoveryComments).type(randomString ,{force: true})
        cy.xpath(ele_AddRecovery).click({force: true})

        cy.xpath(ele_GetRecoveryData).eq(0).invoke('text').then((actValue) => {
            cy.log("Recovery Date : " + actValue)
            expect(dayjs().format('DD/MM/YYYY')).to.equal(actValue.trim())
        })

        cy.xpath(ele_GetRecoveryData).eq(1).invoke('text').then((actValue) => {
            cy.log("Recovery Amount : " + actValue)
            expect(createClaim.RecoveryAmount).to.equal(actValue.trim())
        })


        cy.xpath(ele_GetRecoveryData).eq(2).invoke('text').then((actValue) => {
            cy.log("Recovery Comments : " + actValue)
            expect(randomString).to.equal(actValue.trim())
        })

        cy.xpath(ele_EditRecovery).click({force: true})
        cy.wait(1500)
        cy.xpath(ele_RecoveryAmount).clear({force: true});
        cy.wait(1500)
        cy.xpath(ele_RecoveryAmount).type(createClaim.RecoveryAmount+1,{force: true})
        cy.wait(1500)

        cy.xpath(ele_UpdateRecovery).click({force: true})
        cy.wait(1500)

        cy.xpath(ele_GetRecoveryData).eq(1).invoke('text').then((actValue) => {
            cy.log("Recovery Amount : " + actValue)
            expect(createClaim.RecoveryAmount+1).to.equal(actValue.trim())
        })


    }

}


