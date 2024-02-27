/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
require('cypress-xpath');
import promisify from "cypress-promise";
import dayjs from 'dayjs';

var createPolicy = require('../fixtures/testData/CreatePolicy.json');

// policy details
const partyIdInput = "input#policy_originator_party_id";
const partyIdSearchButton = "button#originator_search_id";
const selectPartyRadio = "input[name='party']";
const partySelectButton = "button#policy_orginator_select";
const documentationTypeSelect = "select#origination_policy_0_Documentation\\ Type";
const underWritingTypeSelect = "select#origination_policy_0_Underwriting\\ Type";
const paymentPLanSelect = "select#origination_policy_0_Payment\\ Plan";
const underWritingLevelSelect = "select#origination_policy_0_Underwriting\\ Level";
const policyTermSelect = "select#origination_policy_0_Policy\\ Term";
const lendingProgramSelect = "select#origination_policy_0_Lending\\ Program";
const premiumBalanceTypeSelect = "select#origination_policy_0_Premium\\ Balance\\ Type";
const refundTypeSelect = "select#origination_policy_0_Refund\\ Type";
const brokerOriginatedSelect = "select#origination_policy_0_Broker\\ Originated";
const capitalizedPremiumIndicatorSelect = "select#origination_policy_0_Capitalized\\ Premium\\ Indicator";
const applicationSourceInput = "input#origination_policy_0_Application\\ Score";
const originationFileName = "input#origination_policy_0_Origination\\ Filename";
const basePremiumInput = "input#origination_policy_1_Base\\ Premium";
const GSTInput = "input#origination_policy_1_GST";
const policyStatus = "select#origination_policy_0_Policy\\ Status";
const policyTermination = "select#origination_policy_0_Termination\\ Reason";
const selectServicerParty = "select#policy_servicer_party_id";
const selectOriginatorParty = "select#policy_originator_party_id"

// Loan details
const loanNumberInput = "input#origination_loan_0_Loan\\ Number";
const loanAmountInput = "input#origination_loan_0_Loan\\ Amount";
const laonTermInput = "input#origination_loan_0_Loan\\ Term\\ \\(in\\ Months\\)";
const dradownDateInput = "#origination_loan_0_Draw\\ Down\\ Date input";
const expireDateInput = "input.undefined\\ ui-inputtext\\ ui-corner-all\\ ui-state-default\\ ui-widget";
const applicationNumberInput = "input#origination_loan_0_Application\\ Number";
const LMIReferenceNumberInput = "input#origination_loan_0_LMI\\ Reference\\ Number";
const loanAmountUpdateReason = "select#origination_loan_0_Loan\\ Amount\\ Update\\ Reason";
const interestType = "select#origination_loan_0_Interest\\ Type";
const loanPurpose = "select#origination_loan_0_Loan\\ Purpose";
const loanType = "select#origination_loan_0_Loan\\ Type";
const repaymentType = "select#origination_loan_0_Repayment\\ Type";
const FHBIndicator = "select#origination_loan_0_FHB\\ Indicator";
const securitisationIndicator = "select#origination_loan_1_Securitisation\\ Indicator";
const loanPropertyAddressLine = "input#loan_origination_property_0_Address\\ Line\\ 1";
const loanPropertycity = "input#loan_origination_property_0_City";
const loanPropertyState = "select#loan_origination_property_0_State";
const postCode = "input#loan_origination_property_0_Post\\ Code";
const loanPropertyCountry = "select#loan_origination_property_0_Country";
const propertyPurpose = "select#loan_origination_property_0_Property\\ Purpose";
const propertyType = "select#loan_origination_property_0_Property\\ Type";
const propertyStatus = "select#loan_origination_property_0_Property\\ Status";
const zoningType = "select#loan_origination_property_0_Zoning\\ Type";
const purchasePrice = "input#loan_origination_property_0_Purchase\\ Price";
const projectCost = "input#loan_origination_property_0_Construction\\ \\|\\ Project\\ Cost";

const valutionDate = "#origination_property_0_Date\\ input";
const valutionAmount = "#loan_origination_property_0_Amount";

const barrowerType = "select#loan_origination_borrower_0_Borrower\\ Type";
const barrowerApplicationType = "select#loan_origination_borrower_0_Applicant\\ Type";
const barrowerFirstName = "input#loan_number_origination_borrower_0_First\\ Name";
const barrowerLastName = "input#loan_number_origination_borrower_0_Last\\ Name";
const barrowerDateOfBirth = "#loan_origination_borrower_0_Date\\ of\\ Birth input";
const barrowerLicenceNumber = "input#loan_number_origination_borrower_0_License\\ Number";
// const projectCost ="input#";
const barrowerGender = "select#loan_origination_borrower_0_Gender";
const barrowerMarritalStatus = "select#loan_origination_borrower_0_Marital\\ Status";
const barrowerNumberofDependents = "input#loan_number_origination_borrower_0_No\\ of\\ Dependents";
const barrowerSelfEmployed = "select#loan_origination_borrower_0_Self\\ Employed";
const barrowerAddressLine = "input#loan_number_origination_borrower_0_Address\\ Line\\ 1";
const barrowerCity = "input#loan_number_origination_borrower_0_City";
const barrowerState = "input#loan_number_origination_borrower_0_State";
const barrowerPostcode = "input#loan_number_origination_borrower_0_Post\\ Code";
const barrowerCountry = "select#loan_origination_borrower_0_Country";

const sideMenuButton = "button#header_sidenav_toggle_button"
const validationinfoSuccessMessage = '#policy_create_maintain_policy_success_messages div';
const FieldColumn = "//tbody[@class='ui-datatable-data ui-widget-content']/tr/td[4]";
const oldValueColumn = "//tbody[@class='ui-datatable-data ui-widget-content']/tr/td[5]";
const newValuedColumn = "//tbody[@class='ui-datatable-data ui-widget-content']/tr/td[6]";
const cppBasePremium = "input#origination_policy_1_Base\\ Premium";
const cppGST = "input#origination_policy_1_GST";
const cppTotalPremium = "input#origination_policy_1_Stamp\\ Duty";
const transctionSummaryTableRows = "table tbody tr[class='ui-widget-content ui-datatable-even']";

const ScpPremiumType = "//div[text()='System Calculated Premium Details']/..//table//tr/td[1]";
const scpBasePremium = "//div[text()='System Calculated Premium Details']/..//table//tr/td[4]";
const scpTotalPremium = "//div[text()='System Calculated Premium Details']/..//table//tr/td[7]";

const CcpPremiumType = "//div[text()='Customer Provided Premium Details']/..//table//tr/td[1]";
const CcpBasePremium = "//div[text()='Customer Provided Premium Details']/..//table//tr/td[4]";
const CcpTotalPremium = "//div[text()='Customer Provided Premium Details']/..//table//tr/td[7]";

const searchPolicyStatus = "select#policyorigination_search_policy_enter_search_criteria_policy_status";
const searchPolicyId = "input#policyorigination_search_policy_enter_search_criteria_policy_number";
const searchPolicyLmi = "input#policyorigination_search_policy_enter_search_criteria_lmi_reference_number"
const searchLoanNumber = "input#policyorigination_search_policy_enter_search_criteria_loan_number"
const NavigateLastPage = "a[class*='ui-paginator-last']";
const searchPolicyTable = "tbody[class='ui-datatable-data ui-widget-content'] tr";

const performTopupBtn = "button[class='btn custombtn-secondary pull-left mrm']";
const existingSumInsuredInput = "input[id='origination_policy_0_Existing Sum Insured']";
const ptopenLoanDetails = "div[formarrayname='loanDetailsArray'] a[role='tab']";
const ptLoanNumber = "input[id='origination_loan_1_Loan Number']";
const ptLoanAmount = "input[id='origination_loan_1_Loan Amount']";
const ptupdateReason = "select[id='origination_loan_1_Loan Amount Update Reason']";
const ptTerm = "input[id='origination_loan_1_Loan Term (in Months)']";
const ptDrawdownDate = "div[id='selected_loan_details_origination_loan_1_Draw Down Date'] input";
const ptInterestType = "select[id='origination_loan_1_Interest Type']";
const ptLoanPurpose = "select[id='origination_loan_1_Loan Purpose']";
const ptLoanType = "select[id='origination_loan_1_Loan Type']";
const ptExpiryDate = "div[id='selected_loan_details_origination_loan_1_Expiry Date'] input";
const ptDealType = "select[id='origination_loan_1_Deal Type']";
const ptApplicationNumber = "input[id='origination_loan_1_Application Number']";
const ptLMI = "input[id='origination_loan_1_LMI Reference Number']";
const ptRepayment = "select[id='origination_loan_1_Repayment Type']";
const ptFHB = "select[id='origination_loan_1_FHB Indicator']";

const ptopenPropertyDetails = "div[formarrayname='propertyTabArray'] a[role='tab']";
const ptloanPropertyAddressLine = "input#loan_origination_property_0_Address\\ Line\\ 1";
const ptloanPropertycity = "input#loan_origination_property_0_City";
const ptloanPropertyState = "select#loan_origination_property_0_State";
const ptptpostCode = "input#loan_origination_property_0_Post\\ Code";
const ptptloanPropertyCountry = "select#loan_origination_property_0_Country";
const ptpropertyPurpose = "select#loan_origination_property_0_Property\\ Purpose";
const ptpropertyType = "select#loan_origination_property_0_Property\\ Type";
const ptpropertyStatus = "select#loan_origination_property_0_Property\\ Status";
const ptzoningType = "select#loan_origination_property_0_Zoning\\ Type";
const ptpurchasePrice = "input#loan_origination_property_0_Purchase\\ Price";
const ptprojectCost = "input#loan_origination_property_0_Construction\\ \\|\\ Project\\ Cost";

const ptvalutionDate = "#origination_property_0_Date\\ input";
const ptvalutionAmount = "#loan_origination_property_0_Amount";

const ptbarrowerType = "select#loan_origination_borrower_0_Borrower\\ Type";
const ptbarrowerApplicationType = "select#loan_origination_borrower_0_Applicant\\ Type";
const ptbarrowerFirstName = "input#loan_number_origination_borrower_0_First\\ Name";
const ptbarrowerLastName = "input#loan_number_origination_borrower_0_Last\\ Name";
const ptbarrowerDateOfBirth = "#loan_origination_borrower_0_Date\\ of\\ Birth input";
const ptbarrowerLicenceNumber = "input#loan_number_origination_borrower_0_License\\ Number";
// const projectCost ="input#";
const ptbarrowerGender = "select#loan_origination_borrower_0_Gender";
const ptbarrowerMarritalStatus = "select#loan_origination_borrower_0_Marital\\ Status";
const ptbarrowerNumberofDependents = "input#loan_number_origination_borrower_0_No\\ of\\ Dependents";
const ptbarrowerSelfEmployed = "select#loan_origination_borrower_0_Self\\ Employed";
const ptbarrowerAddressLine = "input#loan_number_origination_borrower_0_Address\\ Line\\ 1";
const ptbarrowerCity = "input#loan_number_origination_borrower_0_City";
const ptbarrowerState = "input#loan_number_origination_borrower_0_State";
const ptbarrowerPostcode = "input#loan_number_origination_borrower_0_Post\\ Code";
const ptbarrowerCountry = "select#loan_origination_borrower_0_Country";

const numberOfLoansExist = "div[class='pvm ng-untouched ng-pristine ng-valid']";
const numberOfPropertyExist = "div[formarrayname='propertyTabArray'] div[class='ptm ng-untouched ng-pristine ng-valid']";
const numberOfBarrowerExist = "div[formarrayname='borrowerTabArray'] div[class='ptm ng-untouched ng-pristine ng-valid']";
const addPropertyToLoan = "label[id='loan_available_property_label'] input";
const addbarrowerToLoan = "label[id='create_maintain_origination_borrower_tab_label'] input";

const numberOfLoansExistnpv = " div[formarrayname='loanTabArray'] div[class='ptm ng-untouched ng-pristine ng-valid']";

const loanNumber = "select[formcontrolname='loanNumber']";
const hardshipstatusSelect="#policyorigination_search_policy_enter_search_criteria_hardship_status"
const hardshipScheduleLoanAmount = "input[id='hardship_create_maintain_hardship_scheduledLoanAmount']";
const hardshiparrearsAmount = "input[id='hardship_create_maintain_hardship_arrearsAmount']";
const hardshipCurrentMonthlyRepayment = "input[id='hardship_create_maintain_hardship_currentMonthlyRepayment']";
const hardshipCapitalisedAmount = "input[id='hardship_create_maintain_hardship_capitalisedAmount']";
const hardshipInterestOnly = "select[id='hardship_create_maintain_interest_only']";
const hardshipCurrentInterestRate = "input[id='hardship_create_maintain_current_interest_rate']";
const hardshipNewLVR = "input[id='hardship_create_maintain_new_LVR']";
const hardshipReason = "select[id='hardship_create_maintain_hardship_reason']";
const hardshipDateReceived = "#hardship_create_maintain_date_received input";

const hardsipAssistAggrement = "select[id='hardship_create_maintain_hardship_assist_agreement']";
const hardshipStartpropSolution = "#hardship_create_maintain_start_date_of_proposed_solution input"
const hardshipEndPropSolution = "#hardship_create_maintain_end_date_of_proposed_solution input"
const hardshipHoldoutEndDate = "#hardship_create_maintain_holdout_end_date input";
const hardshipstatus = "#hardship_create_maintain_hardship_loan_status";
const hardshipminMonthlyPmt = "input[id='hardship_create_maintain_hardship_minMonthlyPmt']";
const hardshipPostAssistBalance = "input[id='hardship_create_maintain_hardship_postAssistBalanceLVR']";
const hardshipPostAssistLVR = "input[id='hardship_create_maintain_hardship_postAssistBalanceLVR']";
const hardshipAddAccounts = "select[id='hardship_create_maintain_add_accounts']";
const hardshipCrossedCollaterised = "input[id='hardship_create_maintain_crossedCollaterised']";
const hardshipReasonDescription = "textarea[id='hardship_create_maintain_hardship_reason_description']";
const securityAddress = "input[id='hardship_create_maintain_hardship_address']";
const securitySuburb = "input[id='hardship_create_maintain_hardship_suburb']";
const securityPostCode = "input[id='hardship_create_maintain_hardship_postcode']";
const securityState = "select[id='hardship_create_maintain_state']";
const securityActualValuation = "input[id='hardship_create_maintain_hardship_actual_valuation_amount']";
const securityFullValuation = "select[id='hardship_create_maintain_full_valuation']";
const securityAvmConducted = "select[id='hardship_create_maintain_avm_conducted']";
const securityCurrentValuationDate = "div[id='hardship_create_maintain_current_valuation_date'] input";

const ele_oldValue = "#policy_history_details tr td:nth-child(5) span"
const ele_newValue = "#policy_history_details tr td:nth-child(6) span span"
const originationPropertyAmount = "//*[starts-with(@id,'loan_origination_property_index_Amount')]"
const originationPropertyDate = "//*[starts-with(@id,'origination_property_')]/span/input"
const ele_hardshipStatus = "//table/tbody/tr[1]/td[3]/span"
const ele_delinquencyStatus = "//table/tbody/tr[1]/td[2]/span"
const ele_servicer = "//input[@id='policy_servicer_selected_servicer_name']"
const ele_originator = "//input[@id='policy_originator_selected_originator_name']"
const ele_Status = "//select[@id='origination_policy_0_Policy Status']"
//const ele_servicer = "div#serInfo-form"


const ele_policyStatus = "#policyorigination_search_policy_enter_search_criteria_policy_status"
const ele_policyOriginator = "#policyorigination_search_policy_enter_search_criteria_originator_number"
const btn_search ="#policyorigination_search_policy_enter_search_criteria_search_button"
const ele_searchResultsGrid = "#policyorigination_search_policy_title"
//const ele_sortGrid = "//*[contains(text(),'Hardship Status')]/following-sibling::span"
const ele_sortGrid = "//span[@class='fa fa-step-forward']"
const val_partyID ="//td[@style='display: table-cell;']/span"
const ele_property = "//header[starts-with(@id,'loan_origination_property')]"
const ele_borrower = "//header[starts-with(@id,'loan_number_origination_borrower')]"
const ele_loan = "//header[starts-with(@id,'loan_origination1_header')]"
const ele_stepForward ="//span[@class='fa fa-step-forward']"
const ele_exisitingLoan = "//header[starts-with(@id,'loan_origination0_header')]"
const ele_eLoanAmount = "#origination_loan_0_Loan Amount"
const ele_mapPropertyToLoan = "//input[@id='0_loan_number_available_property_value']"
const ele_mapBorrowerToLoan = "//input[@id='0_loan_number_origination_borrower_available_borrower0']"
const ele_addLoan = "#loan_loan_details_add_property"
const ele_removeLoan ="#loan_origination1_remove"
const ele_addProperty ="#loan_loan_details_add_property"
const ele_removeProperty = "#loan_origination_property1_remove"
const ele_addBorrower ="#loan_loan_details_add_borrower"
const ele_removeBorrower= "//header[@id='loan_number_origination_borrower1_header']/a[@id='loan_origination_property1_remove']"
const ele_sideTogglebtn = "button#header_sidenav_toggle_button"
const ele_errorMessage = "#policy_create_maintain_policy_error_messages"
const ele_successMessage = "#policy_create_maintain_policy_success_messages"
const btn_save = "#policy_create_maintain_policy_save_button"
const ele_policyDetails = "//div[@class='info-title-completed']";
const ele_propertyId = "//input[@id='loan_origination_property_0_Property Id']"
//const ele_propertyId = "input#loan_origination_property_0_Property\\ Id";
const ele_TransactionSummaryGrid = "//div[contains(text(),'Transaction Summary')]"
const ele_PolicyDetailsGrid = "//div[contains(text(),'Policy Details')]"
const ele_TransactionSummaryTable ="//tr[starts-with(@class,'ui-widget-content ')]"
const ele_TransactionEntry = "span.ui-cell-data"
const ele_PolicyStatus ="//label[@id='policy_originator_policy_status_label']//span"
const lnk_ClaimSearch = "//div[@id='collapseClaims']//a[@id='side_nav_claims_search_policy_link']"
const lnk_ClaimWorkQueue = "//div[@id='collapseClaims']//a[@id='side_nav_work_queue_link']"
const lnk_SearchParty = "#side_nav_search_party_link"
const lnk_SearchHardship = "#side_nav_hardships_search_policy_link"
const lnk_SearchDelinquency = "#side_nav_delinquency_search_policy_link"
const lnk_SearchPolicy = "//a[@id='side_nav_search_policy_link']"
const lnk_CreatePolicy = "#side_nav_create_policy_link"
const lnk_GenerateReport ="#side_nav_generate_reports_link"
const lnk_ProcessBatch = "#side_nav_batch_processing_batch_upload_link"
const lnk_AdhocJobExecution = "#adhoc_job_execution_link"

const lnk_CreatePreApplication ="#side_nav_search_policy_link"
const ele_NoRecords = "#policyorigination_search_policy_error_messages"
const ele_Norecordserror="#policyorigination_search_policy_error_messages div"
const ele_Warning = "#policy_create_maintain_policy_warning_messages"
const ele_PolicyNumber = "//label[@id='policy_originator_policy_number_label']/span"
const ele_TransactionSummaryStatus = "//label[@id='policy_originator_policy_status_label']/span"
const ele_TransactionSummaryData = "//td[@style='display: table-cell;']/span"
const ele_TransactionSummaryTotalPolicy = "//label[@id='policy_originator_total_policy_premium_label']/span"
const ele_TransactionSummaryTotalBilled = "//label[@id='policy_originator_total_Billed_premium_label']/span"
const ele_ClaimNumberSort = "//span[text()='Claim Number']/following-sibling::span"
const ele_HardshipStatus = "//span[contains(text(),'Hardship Status')]"
const ele_PolicyInfoSuccessMessage = 'div.successField';
const ele_ReopenHardship = "#hardship_create_maintain_hardship_reopen_latest_hardship"
const ele_DelinquencyStatus = "//span[contains(text(),'Delinquency Status')]"
const ele_DelinquencyCurrentLoanBalanceAmount = "#delinquency_create_maintain_delinquency_currentLoanBalance_amount"
const ele_DelinquencyArrearAmount = "#delinquency_create_maintain_delinquency_delinquency_amount"
const ele_DelinquencyScheduledRepaymentAmount = "#delinquency_create_maintain_delinquency_scheduled_Repayment_Amount"
const ele_DelinquencyReceivedDate = "span[class='ng-tns-c1-5 ui-calendar'] input"
const ele_DelinquencyLastReportedDate = "span[class='ng-tns-c1-6 ui-calendar'] input"
const ele_DelinquencyUpdateReceivedDate = "span[class='ng-tns-c1-17 ui-calendar'] input"
const ele_DelinquencyUpdateLastReportedDate = "span[class='ng-tns-c1-18 ui-calendar'] input"
const ele_DelinquencyMsgHeader = "#contract_create_maintain_delinquency_success_messages"
const ele_DelinquencyPolicyStatus = "select[id='delinquency_create_maintain_delinquency_delinquency_status']";
const ele_FilterSearchInput = "//input[@class='ui-column-filter ui-inputtext ui-corner-all ui-state-default ui-widget']";
const ele_SortPartyID="#party_search_party_search_results tr th:nth-child(1) span:nth-child(2)";

// Env variables
const user = Cypress.env("userName");
const pwd = Cypress.env("pwd");
const baseUrl = Cypress.env("baseUrl");

const policyIDTimeStamp = +Date.now()
let basepremium;
let maximum = 999999
let minimum = 0
const randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
export class CrPolicy {

    OpenPolicyModule() {
        cy.clickElement(sideMenuButton)
        cy.clickByText('a', 'Policy Origination');
    }

    NavigateToCreatePolicy() {
        cy.clickElement(sideMenuButton)
        cy.get(lnk_CreatePolicy).click({force: true});
        cy.wait(15000)
    }

    NavigateToSearchPolicy() {
        cy.clickElement(sideMenuButton)
        cy.xpath(lnk_SearchPolicy).last().click({force: true});
        cy.wait(15000)
    }

    NavigateToClaimsSearchPolicy() {
        cy.clickElement(sideMenuButton)
        cy.xpath(lnk_ClaimSearch).click({force: true});
        cy.wait(15000)
    }

    NavigateToSearchParty() {
        cy.clickElement(sideMenuButton)
        cy.get(lnk_SearchParty).click({force: true});
        cy.wait(15000)
    }

    NavigateToSearchHardship() {
        cy.clickElement(sideMenuButton)
        cy.get(lnk_SearchHardship).click({force: true});
        cy.wait(10000)
    }

    NavigateToSearchDelinquency() {
        cy.clickElement(sideMenuButton)
        cy.get(lnk_SearchDelinquency).click({force: true});
        cy.wait(10000)
    }


    NavigateToClaimsWorkQueue() {
        cy.clickElement(sideMenuButton)
        cy.xpath(lnk_ClaimWorkQueue).click({force: true});
        cy.wait(10000)
        cy.pause();
    }

    NavigateToSearchParty() {
        cy.clickElement(sideMenuButton)
        cy.get(lnk_SearchParty).click({force: true});
        cy.wait(10000)
    }

    NavigateToGenerateReport() {
        cy.clickElement(sideMenuButton)
        cy.get(lnk_GenerateReport).click({force: true});
        cy.wait(10000)
    }

    NavigateToProcessBatch() {
        cy.clickElement(sideMenuButton)
        cy.get(lnk_ProcessBatch).click({force: true});
        cy.wait(3000)
    }

    NavigateToCreatePreApplication() {
        cy.clickElement(sideMenuButton)
        cy.get(lnk_CreatePreApplication).click({force: true});
        cy.wait(10000)
    }

    NavigateToAdhocJobExecution() {
        cy.clickElement(sideMenuButton)
        cy.get(lnk_AdhocJobExecution).click({force: true});
        cy.wait(3000)
    }


    SelectPolicyOriginator() {
        cy.wait(5000)
        cy.selectDropDownValue(selectOriginatorParty, createPolicy.Party);
        cy.wait(2000)
        cy.selectDropDownValue(selectServicerParty, createPolicy.Party);
        cy.wait(2000)
        // cy.enterText(partyIdInput, createPolicy.partyID);
        // cy.clickElement(partyIdSearchButton);
        // cy.selectCheckBox(selectPartyRadio, true);
        // cy.clickElement(partySelectButton);
        // cy.wait(2000)
    }

    EnterPolicyDetails() {
        cy.selectDropDownValue(documentationTypeSelect, createPolicy.DocumentationType)
        cy.selectDropDownValue(underWritingTypeSelect, createPolicy.UnderwritingType)
        cy.selectDropDownValue(underWritingLevelSelect, createPolicy.UnderwritingLevel)
        cy.selectDropDownValue(policyTermSelect, createPolicy.PolicyTerm);
        cy.selectDropDownValue(lendingProgramSelect, createPolicy.LendingProgram);
        cy.selectDropDownValue(premiumBalanceTypeSelect, createPolicy.PremiumBalanceType);
        cy.selectDropDownValue(refundTypeSelect, createPolicy.RefundType);
        cy.selectDropDownValue(brokerOriginatedSelect, createPolicy.BrokerOriginated);
    }

    EnterPolicyDetailsInCommitmentStatus() {
        cy.selectDropDownValue(documentationTypeSelect, createPolicy.DocumentationType)
        cy.selectDropDownValue(underWritingTypeSelect, createPolicy.UnderwritingType)
        cy.selectDropDownValue(policyStatus, createPolicy.PolicyStatus);
        cy.selectDropDownValue(underWritingLevelSelect, createPolicy.UnderwritingLevel)
        cy.selectDropDownValue(policyTermSelect, createPolicy.PolicyTerm);
        cy.selectDropDownValue(lendingProgramSelect, createPolicy.LendingProgram);
        cy.selectDropDownValue(premiumBalanceTypeSelect, createPolicy.PremiumBalanceType);
        cy.selectDropDownValue(refundTypeSelect, createPolicy.RefundType);
        cy.selectDropDownValue(brokerOriginatedSelect, createPolicy.BrokerOriginated);
    }

    EntercustomerProvidedPremiumDetails() {
    }

    EnterUpfrontPaymentDetails() {
    }

    SavePolicyInformation() {
        // cy.clickByText('button','SAVE');
        cy.clickElement("button#policy_create_maintain_policy_save_button");
    }

    EnteCustomerInfo() {
        cy.enterText(cppBasePremium, 4000);
        cy.enterText(cppGST, 400);
        cy.enterText(cppTotalPremium, 127);

    }

    UpdateLoanAmount(LoanAmount) {
        cy.clickByText('div', 'Loan Details');
        cy.wait(5000)
        cy.get(loanAmountInput).clear();
        cy.enterText(loanAmountInput, LoanAmount);
    }

    EnterLoanDetails() {
        cy.clickByText('div', 'Loan Details')
        cy.wait(10000)
        cy.enterText(loanNumberInput, createPolicy.LoanNumber + policyIDTimeStamp)
        cy.wait(1500)
        cy.enterText(loanAmountInput, createPolicy.LoanAmount).scrollIntoView();
        cy.selectDropDownValue(loanAmountUpdateReason, createPolicy.LoanAmountUpdateReason);
        cy.enterText(laonTermInput, createPolicy.LoanTerm);
        // cy.get('input').should("contain",'origination_loan_0_Loan\\ Term').type(createPolicy.LoanTerm,{forse:true})
        cy.enterText(dradownDateInput, dayjs().format('DD/MM/YYYY'), {force: true}).scrollIntoView();
        cy.selectDropDownValue(interestType, createPolicy.InterestType);
        cy.selectDropDownValue(loanPurpose, createPolicy.LoanPurpose);
        cy.selectDropDownValue(loanType, createPolicy.LoanType);
        // cy.enterText(expireDateInput,createPolicy.ExpiryDate);
        // cy.selectDropDownValue(createPolicy.DealType);
        cy.enterText(applicationNumberInput, createPolicy.LoanNumber + policyIDTimeStamp).scrollIntoView();
        cy.enterText(LMIReferenceNumberInput, createPolicy.LoanNumber + policyIDTimeStamp).scrollIntoView();
        cy.selectDropDownValue(repaymentType, createPolicy.RepaymentType);
        cy.selectDropDownValue(FHBIndicator, createPolicy.FHBIndicator);
    }

    EnterPtLoanDetails() {

        let countOfElements = 0;
        cy.get(numberOfLoansExist).then($elements => {
            countOfElements = $elements.length - 1;
            cy.get(numberOfLoansExist).last().click({force: true}).scrollIntoView();
            cy.wait(1000)
            cy.enterText(loanNumberInput.replace('0', countOfElements), createPolicy.LoanNumber + policyIDTimeStamp).scrollIntoView();
            cy.wait(1000)
            cy.enterText(loanAmountInput.replace('0', countOfElements), createPolicy.LoanAmount).scrollIntoView();
            cy.selectDropDownValue(loanAmountUpdateReason.replace('0', countOfElements), createPolicy.LoanAmountUpdateReason);
            cy.enterText(laonTermInput.replace('0', countOfElements), createPolicy.LoanTerm);
            // cy.get('input').should("contain",'origination_loan_0_Loan\\ Term').type(createPolicy.LoanTerm,{forse:true})
            cy.enterText(dradownDateInput.replace('0', countOfElements), dayjs().format('DD/MM/YYYY'), {force: true});
            cy.selectDropDownValue(interestType.replace('0', countOfElements), createPolicy.InterestType);
            cy.selectDropDownValue(loanPurpose.replace('0', countOfElements), createPolicy.LoanPurpose);
            cy.selectDropDownValue(loanType.replace('0', countOfElements), createPolicy.LoanType);
            // cy.enterText(expireDateInput,createPolicy.ExpiryDate);
            // cy.selectDropDownValue(createPolicy.DealType);
            cy.enterText(applicationNumberInput.replace('0', countOfElements), createPolicy.LoanNumber + policyIDTimeStamp).scrollIntoView();
            cy.enterText(LMIReferenceNumberInput.replace('0', countOfElements), createPolicy.LoanNumber + policyIDTimeStamp).scrollIntoView();
            cy.selectDropDownValue(repaymentType.replace('0', countOfElements), createPolicy.RepaymentType);
            cy.selectDropDownValue(FHBIndicator.replace('0', countOfElements), createPolicy.FHBIndicator);
        });
    }

    EnterLoanDetailsNpv() {

        let countOfElements = 0;
        cy.get(numberOfLoansExistnpv).then($elements => {
            countOfElements = $elements.length - 1;
            cy.get(numberOfLoansExistnpv).last().click({force: true});
            cy.wait(1000)
            cy.xpath(ele_loan).last().click({force: true});
            cy.wait(2000)
            cy.enterText(loanNumberInput.replace('0', countOfElements), createPolicy.LoanNumber + policyIDTimeStamp).scrollIntoView();
            cy.wait(1000)
            cy.enterText(loanAmountInput.replace('0', countOfElements), createPolicy.LoanAmount).scrollIntoView();
            cy.selectDropDownValue(loanAmountUpdateReason.replace('0', countOfElements), createPolicy.LoanAmountUpdateReason).scrollIntoView();
            // cy.get(laonTermInput).clear();
            cy.wait(1000)
            //cy.enterText(laonTermInput.replace('0', countOfElements), createPolicy.LoanTerm);
            // cy.get('input').should("contain",'origination_loan_0_Loan\\ Term').type(createPolicy.LoanTerm,{forse:true})
            cy.enterText(dradownDateInput.replace('0', countOfElements), dayjs().format('DD/MM/YYYY'), {force: true});
            cy.selectDropDownValue(interestType.replace('0', countOfElements), createPolicy.InterestType);
            cy.selectDropDownValue(loanPurpose.replace('0', countOfElements), createPolicy.LoanPurpose);
            cy.selectDropDownValue(loanType.replace('0', countOfElements), createPolicy.LoanType);
            // cy.enterText(expireDateInput,createPolicy.ExpiryDate);
            // cy.selectDropDownValue(createPolicy.DealType);
            cy.enterText(applicationNumberInput.replace('0', countOfElements), createPolicy.LoanNumber + policyIDTimeStamp);
            cy.enterText(LMIReferenceNumberInput.replace('0', countOfElements), createPolicy.LoanNumber + policyIDTimeStamp);
            cy.selectDropDownValue(repaymentType.replace('0', countOfElements), createPolicy.RepaymentType);
            cy.selectDropDownValue(FHBIndicator.replace('0', countOfElements), createPolicy.FHBIndicator);
        });
    }

    EnterPtPropertyDetails() {

        let countOfElements = 0;
        cy.get(numberOfPropertyExist).then($elements => {
            countOfElements = $elements.length - 1;
            cy.get(numberOfPropertyExist).last().click({force: true});
            cy.wait(2000)
            cy.xpath(ele_property).last().scrollIntoView().click({force: true});
            cy.wait(2000)
            cy.enterText(loanPropertyAddressLine.replace('0', countOfElements), createPolicy.AddressLine1 + (Math.random() + 1).toString(36).substring(7));

            //cy.enterText(loanPropertyAddressLine, createPolicy.AddressLine1 + (Math.random() + 1).toString(36).substring(7));

            cy.wait(3000)
            cy.enterText(loanPropertycity.replace('0', countOfElements), createPolicy.City);
            cy.selectDropDownValue(loanPropertyState.replace('0', countOfElements), createPolicy.State);
            cy.enterText(postCode.replace('0', countOfElements), createPolicy.PostCode);
            cy.selectDropDownValue(loanPropertyCountry.replace('0', countOfElements), createPolicy.Country);
            cy.selectDropDownValue(propertyPurpose.replace('0', countOfElements), createPolicy.PropertyPurpose);
            cy.selectDropDownValue(propertyType.replace('0', countOfElements), createPolicy.PropertyType);
            cy.enterText(purchasePrice.replace('0', countOfElements), createPolicy.PurchasePrice);
            cy.selectDropDownValue(propertyStatus.replace('0', countOfElements), createPolicy.PropertyStatus);
            cy.selectDropDownValue(zoningType.replace('0', countOfElements), createPolicy.ZoningType);
            cy.enterText(projectCost.replace('0', countOfElements), createPolicy.ProjectCost);
            cy.wait(3000);


            var d_originationPropertyAmount   = originationPropertyAmount
            var regex = /index/;

            if (d_originationPropertyAmount.match(regex)) {
                d_originationPropertyAmount = d_originationPropertyAmount.replace(regex, countOfElements);
                cy.log(d_originationPropertyAmount)
            }

            cy.xpath(d_originationPropertyAmount).last().type(createPolicy.OrginationPropertyAmount)
            cy.wait(2000);
            cy.xpath(originationPropertyDate).last().type(dayjs().format('DD/MM/YYYY'),{force: true});
            cy.wait(2000);
            //cy.xpath(reinsuranceProgramName).first().type(partyDetails.ReinsuranceProgram + partyIDTimeStamp, {force: true})
            //cy.enterText(dradownDateInput.replace('0', countOfElements), dayjs().format('DD/MM/YYYY'), {force: true});
            cy.xpath(ele_property).last().click({force: true});
            // cy.enterText();
            // cy.enterText();
        });
    }

    EnterPropertyDetails(partyIDTimeStamp) {
        cy.clickByText('a', 'Property Details');
        cy.wait(3000)
        cy.enterText(loanPropertyAddressLine, createPolicy.AddressLine1 + partyIDTimeStamp);
        cy.enterText(loanPropertycity, createPolicy.City);
        cy.selectDropDownValue(loanPropertyState, createPolicy.State);
        cy.enterText(postCode, createPolicy.PostCode);
        cy.selectDropDownValue(loanPropertyCountry, createPolicy.Country);
        cy.selectDropDownValue(propertyPurpose, createPolicy.PropertyPurpose);
        cy.selectDropDownValue(propertyType, createPolicy.PropertyType);
        cy.enterText(purchasePrice, createPolicy.PurchasePrice);
        cy.selectDropDownValue(propertyStatus, createPolicy.PropertyStatus);
        cy.selectDropDownValue(zoningType, createPolicy.ZoningType);
        cy.enterText(projectCost, createPolicy.ProjectCost);

    }


    EnterBarrowerDetails() {
        cy.clickByText('a', 'Borrower Details');
        cy.wait(3000)
        cy.selectDropDownValue(barrowerType, createPolicy.BorrowerType);
        cy.wait(3000)
        cy.selectDropDownValue(barrowerApplicationType, createPolicy.ApplicantType);
        cy.enterText(barrowerFirstName, createPolicy.FirstName);
        cy.enterText(barrowerLastName, createPolicy.LastName)
        cy.enterText(barrowerDateOfBirth, createPolicy.DateofBirth);
        cy.enterText(barrowerLicenceNumber, createPolicy.LicenseNumber);
        // cy.enterText();
        cy.selectDropDownValue(barrowerGender, createPolicy.Gender);
        cy.selectDropDownValue(barrowerMarritalStatus, createPolicy.MaritalStatus);
        cy.enterText(barrowerNumberofDependents, createPolicy.NoofDependents);
        cy.selectDropDownValue(barrowerSelfEmployed, createPolicy.SelfEmployed);
        cy.enterText(barrowerAddressLine, createPolicy.BarrowerAddressLine1);
        cy.enterText(barrowerCity, createPolicy.BarrowerCity);
        // cy.enterText();
        cy.selectDropDownValue(barrowerCountry, createPolicy.BarrowerCountry);
        cy.wait(3000)
        cy.enterText(barrowerState, createPolicy.BarrowerState);
        cy.enterText(barrowerPostcode, createPolicy.BarrowerPostCode);
    }

    EnterPtBarrowerDetails() {
        let countOfElements = 0;
        cy.get(numberOfBarrowerExist).then($elements => {
            countOfElements = $elements.length - 1;
            cy.get(numberOfBarrowerExist).last().click({force: true});
            cy.wait(3000)
            cy.xpath(ele_borrower).last().scrollIntoView().click({force: true});
            cy.wait(2000)
            cy.selectDropDownValue(barrowerType.replace('0', countOfElements), createPolicy.BorrowerType);
            cy.wait(3000)
            cy.selectDropDownValue(barrowerApplicationType.replace('0', countOfElements), createPolicy.ApplicantType);
            cy.enterText(barrowerFirstName.replace('0', countOfElements), createPolicy.FirstName);
            cy.enterText(barrowerLastName.replace('0', countOfElements), "Automation "+ (Math.random() + 1).toString(36).substring(7))
            cy.wait(3000)
            cy.enterText(barrowerDateOfBirth.replace('0', countOfElements), createPolicy.DateofBirth);
            cy.enterText(barrowerLicenceNumber.replace('0', countOfElements), createPolicy.LicenseNumber);
            // cy.enterText();
            cy.selectDropDownValue(barrowerGender.replace('0', countOfElements), createPolicy.Gender);
            cy.selectDropDownValue(barrowerMarritalStatus.replace('0', countOfElements), createPolicy.MaritalStatus);
            cy.enterText(barrowerNumberofDependents.replace('0', countOfElements), createPolicy.NoofDependents);
            cy.selectDropDownValue(barrowerSelfEmployed.replace('0', countOfElements), createPolicy.SelfEmployed);
            cy.enterText(barrowerAddressLine.replace('0', countOfElements), createPolicy.BarrowerAddressLine1);
            cy.enterText(barrowerCity.replace('0', countOfElements), createPolicy.BarrowerCity);
            // cy.enterText();
            cy.selectDropDownValue(barrowerCountry.replace('0', countOfElements), createPolicy.BarrowerCountry);
            cy.wait(3000)
            cy.enterText(barrowerState.replace('0', countOfElements), createPolicy.BarrowerState);
            cy.enterText(barrowerPostcode.replace('0', countOfElements), createPolicy.BarrowerPostCode);
            cy.xpath(ele_borrower).last().click({force: true});
        });
    }


    selectPolicyCommitmentStatus() {
        cy.selectDropDownValue(policyStatus, createPolicy.plocyStatusCommitment);
    }

    selectPolicyStatus(status) {
        cy.selectDropDownValue(policyStatus, status);
    }

    terminatePolicy(reason) {
        cy.selectDropDownValue(policyStatus, 'Terminated');
        cy.selectDropDownValue(policyTermination, reason);
    }

    selectPolicyApplicationStatus() {
        cy.selectDropDownValue(policyStatus, createPolicy.plocyStatusApplication);
    }

// Cypress.Commands.add('getBasePremium', () => {

//      basepremium = 2.44 * createPolicy.LoanAmount/100;
//    return basepremium;
// });
// Cypress.Commands.add('getGST', () => {

//    return basepremium * 10/100;
// });

// Cypress.Commands.add('getTotalPremium', () => {
//     const stampDuty = 9.4;
//     const GST = 10;
//    return basepremium + basepremium * 35/100+basepremium * stampDuty/100+basepremium*GST/100;
// });
// Cypress.Commands.add('getAppBasePremium', () => {
//     cy.get(validationinfoSuccessMessage).eq('1').then(($div) => {
//         const baseprm = $div.text()
//         searchPartyID = baseprm.split(' ')[7].replace(',','').trim();
//            })
//    return searchPartyID;
// });

// Cypress.Commands.add('getAppGST', () => {
//     cy.get(validationinfoSuccessMessage).eq('1').then(($div) => {
//         const baseprm = $div.text()
//         searchPartyID = baseprm.split(' ')[11].replace(',','').trim();
//            })
//    return searchPartyID;
// });

// Cypress.Commands.add('getAppTotalPremium', () => {
//     cy.get(validationinfoSuccessMessage).eq('2').then(($div) => {
//         const totalPrm = $div.text()
//         searchPartyID = totalPrm.split(' ')[7].replace(',','').trim();
//            })
//    return searchPartyID;
// });

    RemoveLoadingFactors() {
        cy.clickByText('div', 'Loan Details');
        cy.wait(3000)

        cy.selectDropDownValue(loanPurpose, "Extension");
        cy.selectDropDownValue(FHBIndicator, "No");

        cy.clickByText('a', 'Property Details');
        cy.selectDropDownValue(propertyPurpose, "OwnerOccupied");

        cy.clickByText('a', 'Borrower Details');
        cy.selectDropDownValue(barrowerSelfEmployed, "No");
    }

    verifyOldValueNewValueColumns(field, expOldValue, expNewValue) {

        cy.xpath(FieldColumn).each(($el, index, $list) => {
            var val = $el.text()
            if (val.includes(field)) {
                cy.xpath(oldValueColumn).eq(index).then(function (oldvalue) {
                    var actualOldValue = oldvalue.text()
                    expect(actualOldValue.trim()).to.equal(expOldValue)
                })
                cy.xpath(newValuedColumn).eq(index).then(function (newVal) {
                    var actualNewValue = newVal.text()
                    expect(actualNewValue.trim()).to.equal(expNewValue)
                })
            }
        })
    }

    EnterCPPInfo() {
        cy.enterText(cppBasePremium, createPolicy.cppBasePremium);
        cy.enterText(cppGST, createPolicy.cppGST);
        cy.enterText(cppTotalPremium, createPolicy.cppTotalPremium);
    }

    verifySCPValues(field, expbasePremium, exptotalPremium) {

        cy.xpath(ScpPremiumType).each(($el, index, $list) => {
            var val = $el.text()
            if (val == (field)) {
                cy.xpath(scpBasePremium).eq(index).then(function (basepremium) {
                    var actualBasePremium = basepremium.text()
                    expect(actualBasePremium.trim()).to.equal(expbasePremium)
                })
                cy.xpath(scpTotalPremium).eq(index).then(function (totalPremium) {
                    var actualTotalPremium = totalPremium.text()
                    expect(actualTotalPremium.trim()).to.equal(exptotalPremium)
                })
            }
        })
    }

    verifyCCPValues(field, expbasePremium, exptotalPremium) {

        cy.xpath(CcpPremiumType).each(($el, index, $list) => {
            var val = $el.text()
            if (val == (field)) {
                cy.xpath(CcpBasePremium).eq(index).then(function (basepremium) {
                    var actualBasePremium = basepremium.text()
                    expect(actualBasePremium.trim()).to.equal(expbasePremium)
                })
                cy.xpath(CcpTotalPremium).eq(index).then(function (totalPremium) {
                    var actualTotalPremium = totalPremium.text()
                    expect(actualTotalPremium.trim()).to.equal(exptotalPremium)
                })
            }
        })
    }

    verifyHardshipHistory(field, expbasePremium, exptotalPremium) {

        cy.xpath(CcpPremiumType).each(($el, index, $list) => {
            var val = $el.text()
            if (val == (field)) {
                cy.xpath(CcpBasePremium).eq(index).then(function (basepremium) {
                    var actualBasePremium = basepremium.text()
                    expect(actualBasePremium.trim()).to.equal(expbasePremium)
                })
                cy.xpath(CcpTotalPremium).eq(index).then(function (totalPremium) {
                    var actualTotalPremium = totalPremium.text()
                    expect(actualTotalPremium.trim()).to.equal(exptotalPremium)
                })
            }
        })
    }

    openScpCppDetails() {
        cy.get(transctionSummaryTableRows).last().click();
    }

    SearchSelectPolicy(policyNumber) {
        // cy.selectDropDownValue(searchPolicyStatus,policyType);
        cy.enterText(searchPolicyId, policyNumber)
        cy.wait(1000)
        cy.clickByText('button', 'SEARCH');
        cy.wait(4000)
        // cy.get(NavigateLastPage).click();
        // cy.pause();
        // cy.wait(4000)
        // cy.get('td').contains('In Force').click();
        // cy.wait(4000)
        // cy.pause();
    }

    selectPropertyBorrower(policyNumber) {
        cy.get(addPropertyToLoan).last().click({force: true});
        cy.get(addbarrowerToLoan).last().click({force: true});
    }

    addLoanHardship() {
        cy.get(loanNumber).last().select(1);
        cy.wait(3000)
        //cy.get("div[class*='pvm ng-untouched ng-pristine']").last().enterText(hardshipScheduleLoanAmount, createPolicy.hardshipScheduleLoanAmount);
        cy.get(hardshipScheduleLoanAmount).last().type(createPolicy.hardshipScheduleLoanAmount);
        cy.get(hardshiparrearsAmount).last().type(createPolicy.hardshiparrearsAmount);
        cy.get(hardshipCurrentMonthlyRepayment).last().type(createPolicy.hardshipCurrentMonthlyRepayment);
        cy.get(hardshipCapitalisedAmount).last().type(createPolicy.hardshipCapitalisedAmount);
        cy.get(hardshipInterestOnly).last().type(createPolicy.hardshipInterestOnly);
        cy.get(hardshipCurrentInterestRate).last().type(createPolicy.hardshipCurrentInterestRate);
        cy.get(hardshipNewLVR).last().type(createPolicy.hardshipNewLVR);
        // cy.selectDropDownValue(hardshipReason,createPolicy.hardshipReason);
        cy.get(hardshipDateReceived).clear({force:true})
        cy.get(hardshipDateReceived).type(dayjs().format('DD/MM/YYYY'),{force: true})
        cy.selectDropDownValue(hardsipAssistAggrement, createPolicy.hardsipAssistAggrement);
        cy.get(hardshipStartpropSolution).clear({force:true})
        cy.get(hardshipStartpropSolution).type(dayjs().format('DD/MM/YYYY'),{force: true})
        cy.get(hardshipEndPropSolution).clear({force:true})
        cy.get(hardshipEndPropSolution).type(dayjs().format('DD/MM/YYYY'),{force: true})
        cy.get(hardshipHoldoutEndDate).clear({force:true})
        cy.get(hardshipHoldoutEndDate).type(dayjs().format('DD/MM/YYYY'),{force: true});
        cy.get(hardshipminMonthlyPmt).last().type(createPolicy.hardshipminMonthlyPmt);
        cy.get(hardshipstatus).last().select(createPolicy.hardshipstatus)
        cy.get(hardshipPostAssistBalance).last().type(createPolicy.hardshipPostAssistBalance);
        cy.get(hardshipPostAssistLVR).last().type(createPolicy.hardshipPostAssistLVR);
        cy.get(hardshipAddAccounts).last().type(createPolicy.hardshipAddAccounts);
        cy.get(hardshipCrossedCollaterised).last().type(createPolicy.hardshipCrossedCollaterised);
        cy.get(hardshipReasonDescription).last().type(createPolicy.hardshipReasonDescription);
    }

    addSecurityHardship() {

        cy.get(securityAddress).last().type(createPolicy.securityAddress);
        cy.get(securitySuburb).last().type(createPolicy.securitySuburb);
        cy.get(securityPostCode).last().type(createPolicy.securityPostCode);

        cy.get(securityState).last().type(createPolicy.securityState);
        cy.get(securityActualValuation).last().type(createPolicy.securityActualValuation);

        cy.get(securityFullValuation).last().type(createPolicy.securityFullValuation);

        cy.get(securityAvmConducted).last().type(createPolicy.securityAvmConducted);
        cy.get(securityCurrentValuationDate).last().type(createPolicy.securityCurrentValuationDate);
    }

    addLoanDelinquencyOnlyMandatory() {
        cy.selectDropDownValue(loanNumber, 1);
        cy.wait(6000)
        cy.get(ele_DelinquencyCurrentLoanBalanceAmount).type(createPolicy.delinqunecyCurrentLoanBalanceAmount);
        cy.get(ele_DelinquencyArrearAmount).type(createPolicy.delinquencyArrearsAmount)
        cy.get(ele_DelinquencyScheduledRepaymentAmount).type(createPolicy.delinquencyScheduledRepaymentAmount);
        //cy.get(ele_DelinquencyReceivedDate).type(dayjs().format('DD/MM/YYYY'), {force: true})
        //cy.get(ele_DelinquencyLastReportedDate).type(dayjs().format('DD/MM/YYYY'), {force: true})
        cy.get(ele_DelinquencyReceivedDate).type(dayjs().subtract(1, 'year').format('DD/MM/YYYY'), {force: true})
        cy.get(ele_DelinquencyLastReportedDate).type(dayjs().subtract(2, 'year').format('DD/MM/YYYY'), {force: true})
    }

    saveDelinquencyAndVerify(){
        cy.clickByText('button','Save');
        cy.wait(15000)
        cy.get(ele_DelinquencyMsgHeader).should("include.text",createPolicy.delinquencySuccessMsg);
    }

    updateDelinquency() {
        cy.wait(3000)
        cy.get(ele_DelinquencyCurrentLoanBalanceAmount).type(createPolicy.delinqunecyCurrentLoanBalanceAmount+1);
        cy.get(ele_DelinquencyArrearAmount).type(createPolicy.delinquencyArrearsAmount+1)
        cy.get(ele_DelinquencyScheduledRepaymentAmount).type(createPolicy.delinquencyScheduledRepaymentAmount+1);
        cy.get(ele_DelinquencyUpdateReceivedDate).clear();
        cy.wait(1500);
        cy.get(ele_DelinquencyUpdateReceivedDate).type(dayjs().format('DD/MM/YYYY'), {force: true})
        cy.get(ele_DelinquencyUpdateLastReportedDate).clear();
        cy.wait(1500);
        cy.get(ele_DelinquencyUpdateLastReportedDate).type(dayjs().format('DD/MM/YYYY'), {force: true})
    }
    cureDelinquency(){
        cy.selectDropDownValue(ele_DelinquencyPolicyStatus, createPolicy.delinquencyStatus);
        cy.clickByText('button','Save');
        cy.wait(5000)
        cy.get(ele_DelinquencyMsgHeader).should("include.text",createPolicy.delinquencySuccessMsg);
    }

    addLoanHardshipOnlyMandatory() {
        cy.selectDropDownValue(loanNumber, 1);
        cy.wait(3000)
        cy.enterText(hardshipScheduleLoanAmount, createPolicy.hardshipScheduleLoanAmount);
        cy.selectDropDownValue(hardshipReason,createPolicy.hardshipReason);
    }

    addSecurityHardshipOnlyMandatory() {

        cy.enterText(securityAddress, createPolicy.securityAddress);
        //cy.enterText(securitySuburb, createPolicy.securitySuburb);
        cy.enterText(securityPostCode, createPolicy.securityPostCode);

        cy.selectDropDownValue(securityState, createPolicy.securityState);
        //cy.enterText(securityActualValuation, createPolicy.securityActualValuation);

        // cy.selectDropDownValue(securityFullValuation, createPolicy.securityFullValuation);
        //
        // cy.selectDropDownValue(securityAvmConducted, createPolicy.securityAvmConducted);
        // cy.enterText(securityCurrentValuationDate, createPolicy.securityCurrentValuationDate);
    }

    saveHardshipAndVerify(){
        cy.clickByText('button','Save');
        cy.wait(5000)
        cy.get(ele_PolicyInfoSuccessMessage).should("include.text",createPolicy.hardshipSaveSuccessMsg);
    }

    updateHardship() {
        cy.enterText(hardshipScheduleLoanAmount, createPolicy.hardshipScheduleLoanAmount+1);
        cy.selectDropDownValue(hardshipReason,createPolicy.hardshipReasonOther);
        cy.wait(3000)
        cy.enterText(securitySuburb, createPolicy.securitySuburb)
        cy.selectDropDownValue(securityState, createPolicy.securityStateOther)
        cy.enterText(securityPostCode, createPolicy.securityPostCodeOther);
    }

    cureHardship(){
        cy.selectDropDownValue(hardshipstatus, createPolicy.hardshipstatus);
        cy.clickByText('button','Save');
        cy.wait(5000)
        cy.get(ele_PolicyInfoSuccessMessage).should("include.text",createPolicy.hardshipSaveSuccessMsg);
    }



    reopenHardship(){
        cy.get(ele_ReopenHardship).click({force: true});
        cy.wait(3000);
        cy.selectDropDownValue(hardshipstatus, createPolicy.hardshipstatusOther);
        cy.clickByText('button','Save');
        cy.wait(5000)
        cy.get(ele_PolicyInfoSuccessMessage).should("include.text",createPolicy.hardshipSaveSuccessMsg);
    }


    verifyPolicyHistoryOldAndNewValue(expOldValue, expNewValue) {

 cy.get(ele_oldValue).contains("Terminated")
          
cy.get(ele_newValue).contains("Commitment")
          

    }

    verifyHardShipStatus(expStatus) {
        cy.xpath(ele_hardshipStatus).invoke('text').then((message) => {
            expect(expStatus).to.equal(message.trim())
        })
    }

    verifyServicer(expServicer) {
        cy.xpath(ele_servicer).invoke('val').then((message) => {
            cy.log(message)
            expect(expServicer).to.equal(message.trim())
        })
    }

    checkHardShipStatus(expStatus) {
        cy.clickByText('a','History');
        cy.xpath(ele_hardshipStatus).invoke('text').then((message) => {
            expect(expStatus).to.equal(message.trim())
        })
        cy.clickByText('button','BACK');
    }
    checkDelinquencyStatus(expStatus) {
        cy.clickByText('a','History');
        cy.wait(5000);
        cy.xpath(ele_delinquencyStatus).invoke('text').then((message) => {
            expect(expStatus).to.equal(message.trim())
        })
        cy.clickByText('button','BACK');
    }


    verifyOriginator(expOrigniator) {
        cy.xpath(ele_originator).invoke('val').then((message) => {
            cy.log(message)
            expect(expOrigniator).to.equal(message.trim())
        })
    }

    verifyPolicyStatus(expPolicyStatus) {
        cy.xpath(ele_Status).invoke('val').then((message) => {
            cy.xpath(ele_Status).find('option').eq(message).invoke('text').then((status) => {
                cy.log(status)
                expect(expPolicyStatus).to.equal(status.trim())
            })
        })
    }

    VerifyTransactionSummary(expStatus, basePremium, properyAmount, premiumRate, gst, stampduty){
        cy.xpath(ele_PolicyNumber).invoke('text').then((policyNumber1) => {
            cy.xpath(ele_TransactionSummaryGrid).click({force: true});
            cy.wait(1500);
            cy.xpath(ele_PolicyNumber).invoke('text').then((policyNumber2) => {
                expect(policyNumber1.trim()).to.equal(policyNumber2.trim())
            })
        });

        cy.xpath(ele_TransactionSummaryStatus).invoke('text').then((actStatus) => {
            expect(expStatus).to.equal(actStatus.trim())
        })

        cy.xpath(ele_TransactionSummaryData).eq(5).invoke('text').then((actPremium) => {
            const expbasePremium = basePremium * premiumRate / 100
            cy.log("expbasePremium : "+ expbasePremium)
            const f_expbasePremium = (expbasePremium).toLocaleString('en-US', {style: 'currency',currency: 'USD',});
            cy.log("f_expbasePremium : "+f_expbasePremium);
            cy.log("actPremium : "+actPremium);
            expect(f_expbasePremium).to.equal("$"+actPremium)

            cy.xpath(ele_TransactionSummaryData).eq(6).invoke('text').then((actGst) => {
                const GST = expbasePremium * gst / 100
                const f_GST = (GST).toLocaleString('en-US', {style: 'currency',currency: 'USD',})
                cy.log("f_GST : "+ f_GST)
                expect(f_GST).to.equal("$"+actGst)

                cy.xpath(ele_TransactionSummaryData).eq(7).invoke('text').then((actStampDuty) => {
                    const StampDuty = (expbasePremium + GST) * stampduty / 100
                    cy.log("StampDuty : "+ StampDuty)
                    cy.log((StampDuty).toLocaleString('en-US', {style: 'currency',currency: 'USD',}));
                    expect((StampDuty).toLocaleString('en-US', {style: 'currency',currency: 'USD',})).to.equal("$"+actStampDuty.trim())

                    cy.xpath(ele_TransactionSummaryData).eq(8).invoke('text').then((actAmount) => {
                        const amount = (expbasePremium + GST + StampDuty)
                        cy.log((amount).toLocaleString('en-US', {style: 'currency',currency: 'USD',}));
                        expect((amount).toLocaleString('en-US', {style: 'currency',currency: 'USD',})).to.equal("$"+actAmount.trim())

                            cy.xpath(ele_TransactionSummaryTotalPolicy).invoke('text').then((totalPolicy) => {
                                expect((amount).toLocaleString('en-US', {style: 'currency',currency: 'USD',})).to.equal("$"+totalPolicy.trim())
                            })

                    })


                })
            })

        })

        cy.xpath(ele_TransactionSummaryData).eq(9).invoke('text').then((actPmtAmount) => {
            expect('').to.equal(actPmtAmount.trim())
        })

    }

    selectPartyID (status, originator) {
        cy.selectDropDownValue(ele_policyStatus, status);
        cy.wait(1500)
        cy.selectDropDownValue(ele_policyOriginator, originator);
        cy.wait(1500)
        cy.get(btn_search).click({force: true});
        cy.wait(15000)
        cy.get(ele_searchResultsGrid).scrollIntoView();
        cy.wait(1500)
        cy.xpath(ele_sortGrid).click({force: true});
        cy.wait(1500)
        //cy.pause();
        const partyID = cy.xpath(val_partyID).first().invoke('text');
        cy.log(partyID)
        cy.xpath(val_partyID).first().click({force: true});
        cy.wait(3000)
    }

    selectPartyFromSearchParty () {
        cy.wait(6000)
        cy.xpath(ele_sortGrid).click({force: true});
        cy.wait(1500)
        const partyID = cy.xpath(val_partyID).first().invoke('text');
        cy.log(partyID)
        cy.xpath(val_partyID).first().click({force: true});
        cy.wait(3000)
    }

    selectPartyIDForTermination (status, originator) {
        cy.selectDropDownValue(ele_policyStatus, status);
        cy.wait(1500)
        cy.selectDropDownValue(ele_policyOriginator, originator);
        cy.wait(1500)
        cy.get(btn_search).click({force: true});
        cy.wait(15000)
        cy.get(ele_searchResultsGrid).scrollIntoView();
        cy.wait(1500)
        cy.xpath(ele_sortGrid).click({force: true});
        cy.wait(1500)
        const partyID = cy.xpath(val_partyID).first().invoke('text');
        cy.log(partyID)
        cy.xpath(val_partyID).first().click({force: true});
        cy.wait(3000)
    }

    selectPartyIDForNPV (status, originator) {
        cy.selectDropDownValue(ele_policyStatus, status);
        cy.wait(1500)
        cy.selectDropDownValue(ele_policyOriginator, originator);
        cy.wait(1500)
        cy.get(btn_search).click({force: true});
        cy.wait(15000)
        cy.get(ele_searchResultsGrid).scrollIntoView();
        cy.wait(1500)
        cy.xpath(ele_stepForward).click({force: true});
        cy.wait(1500)
        const partyID = cy.xpath(val_partyID).last().invoke('text');
        cy.log(partyID)
        cy.xpath(val_partyID).first().click({force: true});
        cy.wait(3000)
    }

    selectPartyIDForClaim (status, originator) {
        cy.selectDropDownValue(ele_policyStatus, status);
        cy.wait(1500)
        cy.selectDropDownValue(ele_policyOriginator, originator);
        cy.wait(1500)
        cy.get(btn_search).click({force: true});
        cy.wait(15000)
        cy.get(ele_searchResultsGrid).scrollIntoView();
        cy.wait(1500)
        cy.xpath(ele_stepForward).click({force: true});
        cy.wait(1500)
        cy.xpath(ele_ClaimNumberSort).click({force: true});
        cy.wait(1500)
        const partyID = cy.xpath(val_partyID).last().invoke('text');
        cy.log(partyID)
        cy.xpath(val_partyID).first().click({force: true});
        cy.wait(3000)
    }

    selectPartyIDForRecovery (status, originator, claimstatus) {
        cy.selectDropDownValue(ele_policyStatus, status);
        cy.wait(1500)
        //cy.selectDropDownValue(ele_policyOriginator, originator);
        cy.wait(1500)
        cy.get(btn_search).click({force: true});
        cy.wait(15000)
        cy.xpath(ele_FilterSearchInput).last().type(claimstatus);
        cy.wait(1500)
        const partyID = cy.xpath(val_partyID).last().invoke('text');
        cy.log(partyID)
        cy.xpath(val_partyID).first().click({force: true});
        cy.wait(3000)
    }

    selectPartyID (status, originator) {
        cy.selectDropDownValue(ele_policyStatus, status);
        cy.wait(1500)
        cy.selectDropDownValue(ele_policyOriginator, originator);
        cy.wait(1500)
        cy.get(btn_search).click({force: true});
        cy.wait(15000)
        cy.get(ele_searchResultsGrid).scrollIntoView();
        cy.wait(1500)
        cy.xpath(ele_stepForward).click({force: true});
        cy.wait(1500)
        const partyID = cy.xpath(val_partyID).last().invoke('text');
        cy.log(partyID)
        cy.xpath(val_partyID).first().click({force: true});
        cy.wait(3000)
    }

    selectHardshipStatusIsEmpty(status, originator) {
        cy.selectDropDownValue(ele_policyStatus, status);
        cy.wait(1500)
        cy.selectDropDownValue(ele_policyOriginator, originator);
        cy.wait(1500)
        cy.get(btn_search).click({force: true});
        cy.wait(15000)
        cy.get(ele_searchResultsGrid).scrollIntoView();
        cy.wait(1500)
        cy.xpath(ele_HardshipStatus).click({force: true});
        cy.wait(5000)
        const partyID = cy.xpath(val_partyID).first().invoke('text');
        cy.log(partyID)
        cy.xpath(val_partyID).first().click({force: true});
        cy.wait(3000)
    }

    selectDelinquencyStatusIsEmpty(status, originator) {
        cy.selectDropDownValue(ele_policyStatus, status);
        cy.wait(1500)
        cy.selectDropDownValue(ele_policyOriginator, originator);
        cy.wait(1500)
        cy.get(btn_search).click({force: true});
        cy.wait(15000)
        cy.get(ele_searchResultsGrid).scrollIntoView();
        cy.wait(1500)
        cy.xpath(ele_DelinquencyStatus).click({force: true});
        cy.wait(5000)
        const partyID = cy.xpath(val_partyID).first().invoke('text');
        cy.log(partyID)
        cy.xpath(val_partyID).first().click({force: true});
        cy.wait(3000)
    }


    UpdateLoanDetailsNpv() {
        cy.xpath(ele_exisitingLoan).click({force: true});
            cy.wait(2000)
        cy.get(loanAmountInput).invoke('val').then((amount) => {
           cy.log(amount)
           var updateLoanAmount = (parseInt(amount) - 1);
           cy.log(updateLoanAmount);
           cy.enterText(loanAmountInput, updateLoanAmount+'000')
        })
        cy.selectDropDownValue(loanAmountUpdateReason, createPolicy.LoanAmountUpdateReason).scrollIntoView();
            cy.wait(1000)
    }

    MapPropertyToLoanNpv() {
        cy.xpath(ele_exisitingLoan).click({force: true});
        cy.wait(2000)
        cy.xpath(ele_mapPropertyToLoan).last().click({force: true});
        cy.wait(2000)
    }


    MapBorrowerToLoanNpv() {
        cy.xpath(ele_exisitingLoan).click({force: true});
        cy.wait(2000)
        cy.xpath(ele_mapBorrowerToLoan).last().click({force: true});
        cy.wait(2000)
    }

    AddandRemoveLoan() {
        cy.get(ele_addLoan).click({force: true});
        cy.wait(2000)
        cy.get(ele_removeLoan).eq(0).click({force: true});
        cy.wait(2000)
        cy.clickByText('button',' OK ');
        cy.wait(2000)
    }

    RemoveProperty() {
        cy.get(ele_removeProperty).eq(0).click({force: true});
        cy.wait(2000)
        cy.clickByText('button',' OK ');
        cy.wait(2000)
    }

    AddandRemoveProperty() {
        cy.get(ele_addProperty).eq(0).click({force: true});
        cy.wait(2000)
        cy.get(ele_removeProperty).eq(0).click({force: true});
        cy.wait(2000)
        cy.clickByText('button',' OK ');
        cy.wait(2000)
    }

    AddandRemoveBorrower() {
        cy.get(ele_addBorrower).click({force: true});
        cy.wait(2000)
        cy.xpath(ele_removeBorrower).click({force: true});
        cy.wait(3000)
        cy.clickByText('button',' OK ');
        cy.wait(2000)
    }

    SearchPolicy(policyNumber) {
        cy.clickElement(ele_sideTogglebtn);
        cy.clickByText('a','Policy Origination');
        cy.clickByText('a','Search Policy');
        cy.enterText(searchPolicyId, policyNumber)
        cy.wait(1000)
        cy.clickByText('button', 'SEARCH');
        cy.wait(4000)
    }

    SearchPolicyByLMI(lmiNumber) {
        cy.get(searchPolicyLmi).clear({force: true});
        cy.wait(2000)
        cy.enterText(searchPolicyLmi, lmiNumber)
        cy.wait(1000)
        cy.clickByText('button', 'SEARCH');
        cy.wait(4000)
    }

    SearchPolicyByLoanNumber(LoanNumber) {
        cy.get(searchLoanNumber).clear({force: true});
        cy.wait(2000)
        cy.enterText(searchLoanNumber, LoanNumber)
        cy.wait(1000)
        cy.clickByText('button', 'SEARCH');
        cy.wait(4000)
    }

    RecordAvailable(){
       cy.get(ele_NoRecords).should('not.exist');
    }

    VerifyWarningMsg(expWarning){
        cy.get(ele_Warning).invoke('text').then((warning) => {
            expect(warning.trim()).to.should(expWarning)
        })
    }
    VerifyWarningMsgContains(expWarning){
        cy.get(ele_Warning).invoke('text').then((warning) => {
            expect(warning.trim()).to.contain(expWarning)
        })
    }

    ClickButton(name) {
        cy.clickByText('button',name);
        cy.wait(4000)
    }



    VerifyLVRErrorMessageForCommitmentValidation() {
        cy.get(ele_errorMessage).invoke('text').then((msg) => {
            var ApplicationStatusErrorMsg = msg
            expect(ApplicationStatusErrorMsg.trim()).to.equal(createPolicy.applicationPolicyLVRErrorMsg)
            cy.wait(3000);
            cy.selectDropDownValue(policyStatus, "Commitment");
            cy.wait(2000);
            cy.get(btn_save).click({force: true});
            cy.wait(2000);
            cy.clickByText('button', 'SYSTEM PREMIUM');
            //cy.pause();
            cy.wait(2000);
            cy.get(ele_errorMessage).invoke('text').then((msg1) => {
                var CommitmentStatusErrorMsg = msg1
                expect(ApplicationStatusErrorMsg.trim()).to.equal(CommitmentStatusErrorMsg.trim())
            })
        })

    }
    VerifyMessageForCommitmentValidation() {

            cy.xpath(ele_policyDetails).first().click({force: true});
            cy.wait(5000);
            cy.selectDropDownValue(policyStatus, "Commitment");
            cy.wait(2000);
            cy.get(btn_save).click({force: true});
            cy.wait(3000);
            cy.clickByText('button', 'SYSTEM PREMIUM');
            cy.wait(9000);
            //cy.pause();
            cy.get(ele_successMessage).invoke('text').then((msg1) => {
                var CommitmentStatusErrorMsg = msg1
                expect(CommitmentStatusErrorMsg.trim()).to.equal(createPolicy.policySuccessMsg)
            })


    }

  VerifyPropertyID () {
      cy.wait(3000);
        cy.xpath(ele_propertyId).invoke('val').then((msg1) => {
            var propertyID = msg1
            cy.log("propertyID : " +propertyID)
            expect(propertyID).to.not.equal('')
        })
    }

    ClickGrid(val) {
        if(val == "Transaction Summary"){
            cy.xpath(ele_TransactionSummaryGrid).click({force: true});
            cy.wait(3000);
        }
        else if(val == "Policy Details"){
            cy.xpath(ele_PolicyDetailsGrid).click({force: true});
            cy.wait(3000);
        }
    }





    VerifyTransactionAfterTermination () {
        cy.xpath(ele_TransactionSummaryTable).its('length').then((beforeValue) => {
            cy.log("value: " + beforeValue)
            cy.xpath(ele_PolicyDetailsGrid).click({force: true});
            cy.wait(3000);
            cy.selectDropDownValue(policyStatus, "Terminated");
            cy.wait(2000);
            cy.selectDropDownValue(policyTermination, createPolicy.terminationReason);
            cy.wait(2000);
            cy.get(btn_save).click({force: true});
            cy.wait(3000);
            cy.clickByText('button', 'OK');
            cy.wait(5000);
            cy.xpath(ele_TransactionSummaryGrid).click({force: true});
            cy.wait(3000);
            //cy.clickByText('button', 'SYSTEM PREMIUM');
            cy.xpath(ele_TransactionSummaryTable).its('length').then((afterValue) => {
                cy.log("value: " + afterValue)

                expect(beforeValue).to.equal(afterValue)

            })

        })
    }

    VerifyRefundAfterTermination () {
        cy.xpath(ele_TransactionSummaryTable).its('length').then((rowCount) => {
            cy.log("value: " + rowCount)
            cy.wait(5000);

            cy.xpath(ele_PolicyDetailsGrid).click({force: true});
            cy.wait(3000);
            cy.selectDropDownValue(policyStatus, "Terminated");
            cy.wait(2000);
            cy.selectDropDownValue(policyTermination, createPolicy.terminationReasonOther);
            cy.wait(2000);
            cy.get(btn_save).click({force: true});
            cy.wait(3000);
            //cy.clickByText('button', 'OK');
            cy.clickByText('button', 'Terminate the Pended Application');
            cy.wait(5000);
            cy.xpath(ele_TransactionSummaryGrid).click({force: true});
            cy.wait(3000);

            cy.xpath(ele_TransactionSummaryTable).eq(1).find(ele_TransactionEntry).eq(2).invoke('text').then((basePremium) => {
              cy.log("basePremium : "+basePremium)

                var fBasePremium=basePremium;
                fBasePremium=fBasePremium.replace(/\,/g,'');
                fBasePremium=parseFloat(fBasePremium)
                cy.log("fBasePremium : "+fBasePremium)

              var expBasePremium = ((40/ 100) * fBasePremium);
                cy.log("calculateBasePremium : "+expBasePremium)
                cy.xpath(ele_TransactionSummaryTable).eq(rowCount-2).find(ele_TransactionEntry).eq(2).invoke('text').then((actBasePremium) => {
                    cy.log("actBasePremium : " + actBasePremium)
                    var expfBasePremium = -Math.abs(expBasePremium)
                    cy.log("expfBasePremium :"+expfBasePremium)
                    expect(expfBasePremium).to.equal(parseFloat(actBasePremium))
                })
            })
            cy.wait(3000)
            cy.xpath(ele_TransactionSummaryTable).eq(rowCount-2).find(ele_TransactionEntry).eq(8).invoke('text').then((type) => {
                cy.log("Transaction Type : " + type)
                expect('REFUND').to.equal(type)
            })

        })
    }


    ReinstatePolicyFromTransactionSummaryAndVerifyTransaction() {
        cy.xpath(ele_PolicyDetailsGrid).click({force: true});
        cy.wait(3000);
        cy.clickByText('button','Reinstate');
        cy.wait(5000)
        cy.clickByText('button',' OK ');
        cy.wait(7000)

        cy.xpath(ele_TransactionSummaryGrid).click({force: true});
        cy.wait(3000);

        cy.xpath(ele_PolicyStatus).invoke('text').then((status) => {
            expect(status.trim()).to.equal(createPolicy.policyStatus)
        })
        cy.wait(3000);

        cy.xpath(ele_TransactionSummaryTable).its('length').then((rowCount) => {
        cy.xpath(ele_TransactionSummaryTable).eq(1).find(ele_TransactionEntry).eq(2).invoke('text').then((basePremium) => {
            cy.log("basePremium : "+basePremium)

            var fBasePremium=basePremium;
            fBasePremium=fBasePremium.replace(/\,/g,'');
            fBasePremium=parseFloat(fBasePremium)
            cy.log("fBasePremium : "+fBasePremium)

            var expBasePremium = ((40/ 100) * fBasePremium);
            cy.log("calculateBasePremium : "+expBasePremium)
            cy.xpath(ele_TransactionSummaryTable).eq(rowCount-2).find(ele_TransactionEntry).eq(2).invoke('text').then((actBasePremium) => {
                cy.log("actBasePremium : " + actBasePremium)
                var expfBasePremium = -Math.abs(expBasePremium)
                cy.log("expfBasePremium :"+expfBasePremium)
                expect(expfBasePremium).to.equal(parseFloat(actBasePremium))
            })
        })
        cy.wait(3000)
        cy.xpath(ele_TransactionSummaryTable).eq(rowCount-2).find(ele_TransactionEntry).eq(8).invoke('text').then((type) => {
            cy.log("Transaction Type : " + type)
            expect('REFUND').to.equal(type)
        })
        })
        }
        selectPartyIDhardship (status, originator,Status) {
            cy.selectDropDownValue(ele_policyStatus, status);
            cy.wait(1500)
            cy.selectDropDownValue(ele_policyOriginator, originator);
            cy.wait(1500)
            cy.selectDropDownValue(hardshipstatusSelect,Status)
            cy.get(btn_search).click({force: true});
            cy.wait(15000)
            cy.get(ele_searchResultsGrid).scrollIntoView();
            cy.wait(1500)
            cy.xpath(ele_sortGrid).click({force: true});
            cy.wait(1500)
            //cy.pause();
            const partyID = cy.xpath(val_partyID).first().invoke('text');
            cy.log(partyID)
            cy.xpath(val_partyID).first().click({force: true});
            cy.wait(3000)
        }

        NoRecordAvailable(){
            cy.get(ele_Norecordserror).should('include.text',createPolicy.noRecordsErrormesage);
         }



         selectPartyFromSearchPartySorting() {
            cy.wait(6000)
            cy.get(ele_SortPartyID).click();
            cy.get(ele_SortPartyID).click();
            const partyID = cy.xpath(val_partyID).first().invoke('text');
            cy.log(partyID)
            cy.xpath(val_partyID).first().click({force: true});
            cy.wait(3000)
        }

}