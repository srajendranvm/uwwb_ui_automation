/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
import dayjs from "dayjs";

require('cypress-file-upload')
require('cypress-xpath');
require('moment');
var createReport = require('../fixtures/testData/CreateReport.json');

const btn_viewClaim = "#claims_summary_view_claim"
const ele_propertyName = "//select[@formcontrolname='propertyNames']"
const ele_saleMethod = "//select[@formcontrolname='saleMethod']"
const ele_saleType = "//select[@formcontrolname='saleType']"
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
const ele_reportType = "#report_generation_select_report_type"
const ele_newItem = "//ul[@class='ui-widget-content ui-picklist-list ui-picklist-source ui-corner-bottom']//div"
const ele_addItem = "//span[@class='ui-button-icon-left ui-c fa fa-fw fa-angle-right']"
const ele_selectedItem = "//ul[@class='ui-widget-content ui-picklist-list ui-picklist-target ui-corner-bottom']//div"
const ele_removeItem = "//span[@class='ui-button-icon-left ui-c fa fa-fw fa-angle-left']"
const ele_addAllItem = "//span[@class='ui-button-icon-left ui-c fa fa-fw fa-angle-double-right']"
const ele_removeAllItem = "//span[@class='ui-button-icon-left ui-c fa fa-fw fa-angle-double-left']"
const ele_reportSubmit = "#report_generation_submit_button"
const ele_reportSuccessMsg = "#report_generation_success_messages"
const ele_PolicyNumber = "input[formcontrolname='policyNumber']"

export class CrReport {

    VerfiyAvailableReports() {
        cy.get(ele_reportType).find('option').each((item, index) => {
            cy.wrap(item).should('contain.text', createReport.ReportList[index])
                })
    }

    SelectReport(report) {
        cy.selectDropDownValue(ele_reportType, report);
        cy.wait(1500)
    }

    AddRemoveFilterAndVerifyReinsuranceReport()
    {
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})

        cy.xpath(ele_selectedItem).last().click({force: true})
        cy.xpath(ele_removeItem).click({force: true})
        cy.xpath(ele_selectedItem).last().click({force: true})
        cy.xpath(ele_removeItem).click({force: true})
        cy.get(ele_reportSubmit).click({force: true});
        cy.wait(2500)

        cy.get(ele_reportSuccessMsg).should('include.text',createReport.ReinsuranceReportSuccessMsg)


        cy.xpath(ele_addAllItem).click({force: true})
        cy.get(ele_reportSubmit).click({force: true});
        cy.wait(2500)
        cy.get(ele_reportSuccessMsg).should('include.text',createReport.ReinsuranceReportSuccessMsg)

        cy.xpath(ele_removeAllItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.get(ele_reportSubmit).click({force: true});
        cy.wait(2500)
        cy.get(ele_reportSuccessMsg).should('include.text',createReport.ReinsuranceReportSuccessMsg)


    }

    AddRemoveFilterAndVerifyPDRReport() {
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})

        cy.xpath(ele_selectedItem).last().click({force: true})
        cy.xpath(ele_removeItem).click({force: true})
        cy.xpath(ele_selectedItem).last().click({force: true})
        cy.xpath(ele_removeItem).click({force: true})
        cy.get(ele_reportSubmit).click({force: true});
        cy.wait(2500)
        cy.get(ele_reportSuccessMsg).should('include.text',createReport.PortfolioDetailReportSuccessMsg)

        cy.xpath(ele_addAllItem).click({force: true})
        cy.get(ele_reportSubmit).click({force: true});
        cy.wait(2500)
        cy.get(ele_reportSuccessMsg).should('include.text',createReport.PortfolioDetailReportSuccessMsg)

        cy.xpath(ele_removeAllItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.get(ele_reportSubmit).click({force: true});
        cy.wait(2500)
        cy.get(ele_reportSuccessMsg).should('include.text',createReport.PortfolioDetailReportSuccessMsg)

    }

    AddRemoveFilterAndVerifyPremiumReport()
    {
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})

        cy.xpath(ele_selectedItem).last().click({force: true})
        cy.xpath(ele_removeItem).click({force: true})
        cy.xpath(ele_selectedItem).last().click({force: true})
        cy.xpath(ele_removeItem).click({force: true})
        cy.get(ele_reportSubmit).click({force: true});
        cy.wait(2500)
        // cy.get(ele_reportSuccessMsg).invoke('text').then((actValue) => {
        //     expect(createReport.PremiumReportSuccessMsg).to.contains(actValue.trim())
        // })

        cy.get(ele_reportSuccessMsg).should('include.text',createReport.PremiumReportSuccessMsg)

        cy.xpath(ele_addAllItem).click({force: true})
        cy.get(ele_reportSubmit).click({force: true});
        cy.wait(2500)
        // cy.get(ele_reportSuccessMsg).invoke('text').then((actValue) => {
        //     expect(createReport.PremiumReportSuccessMsg).to.contains(actValue.trim())
        // })

        cy.get(ele_reportSuccessMsg).should('include.text',createReport.PremiumReportSuccessMsg)

        cy.xpath(ele_removeAllItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.get(ele_reportSubmit).click({force: true});
        cy.wait(2500)
        // cy.get(ele_reportSuccessMsg).invoke('text').then((actValue) => {
        //     expect(createReport.PremiumReportSuccessMsg).to.contains(actValue.trim())
        // })

        cy.get(ele_reportSuccessMsg).should('include.text',createReport.PremiumReportSuccessMsg)

    }

    VerifyRecoveryReport()
    {
        cy.get(ele_PolicyNumber).type("123",{force: true})
        cy.get(ele_reportSubmit).click({force: true});
        cy.wait(2500)

        cy.get(ele_reportSuccessMsg).should('include.text',createReport.RecoveryReportSuccessMsg)

    }


    AddRemoveFilterAndVerifyDelinquencyStatusReport()
    {
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})

        cy.xpath(ele_selectedItem).last().click({force: true})
        cy.xpath(ele_removeItem).click({force: true})
        cy.xpath(ele_selectedItem).last().click({force: true})
        cy.xpath(ele_removeItem).click({force: true})
        cy.get(ele_reportSubmit).click({force: true});
        cy.wait(2500)
        cy.get(ele_reportSuccessMsg).should('include.text',createReport.DelinquencyStatusReportSuccessMsg)


        cy.xpath(ele_addAllItem).click({force: true})
        cy.get(ele_reportSubmit).click({force: true});
        cy.wait(2500)
        cy.get(ele_reportSuccessMsg).should('include.text',createReport.DelinquencyStatusReportSuccessMsg)

        cy.xpath(ele_removeAllItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.get(ele_reportSubmit).click({force: true});
        cy.wait(2500)
        cy.get(ele_reportSuccessMsg).should('include.text',createReport.DelinquencyStatusReportSuccessMsg)

    }


    AddRemoveFilterAndVerifyHardshipsReport()
    {
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})

        cy.xpath(ele_selectedItem).last().click({force: true})
        cy.xpath(ele_removeItem).click({force: true})
        cy.xpath(ele_selectedItem).last().click({force: true})
        cy.xpath(ele_removeItem).click({force: true})
        cy.get(ele_reportSubmit).click({force: true});
        cy.wait(2500)
        cy.get(ele_reportSuccessMsg).should('include.text',createReport.HardshipsReportSuccessMsg)

        cy.xpath(ele_addAllItem).click({force: true})
        cy.get(ele_reportSubmit).click({force: true});
        cy.wait(2500)
        cy.get(ele_reportSuccessMsg).should('include.text',createReport.HardshipsReportSuccessMsg)

        cy.xpath(ele_removeAllItem).click({force: true})
        cy.xpath(ele_newItem).first().click({force: true})
        cy.xpath(ele_addItem).click({force: true})
        cy.get(ele_reportSubmit).click({force: true});
        cy.wait(2500)
        cy.get(ele_reportSuccessMsg).should('include.text',createReport.HardshipsReportSuccessMsg)

    }


}


