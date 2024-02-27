/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
import promisify from "cypress-promise";
require('cypress-xpath');
import dayjs from 'dayjs';
const partyDetails = require('../fixtures/testData/CreateParty.json');

const userName = "input#username";
const password = "input#password";
const loginButton = "div#kc-form-buttons";

const partyName = 'input#party_party_basic_information_party_first_name';
const partyNickName = 'input#party_party_basic_information_party_nick_name';
const partyType = 'select#party_party_basic_information_party_type';
const awbNumber = 'input#party_party_basic_information_party_abn_number';
const partyReferenceID = 'input#party_party_optional_information_partyrefid';
const partyLmitRefID = 'input#party_party_optional_information_almirefid';
const addressTypePhysical = 'input#party_party_address_type_0';
const addressTypeMail = 'input#party_party_address_type_1';
const addressAttn = 'input#party_address_attn_P';
const addressLineOne = 'input#party_address_line1_P';
const addressCity = 'input#party_address_city_P';
const addressProvince = 'select#party_address_state_province_P';
const addressPostCode = 'input#party_address_postcode_P';
const addressCountry = 'select#party_address_country_P';
const partyRoleOriginator = 'input#party_party_role_0';
const partyRoleServicer = 'input#party_party_role_1';
const partyRoleReinsurer = 'input#party_party_role_2';
const partyRoleParentParty = 'input#party_party_role_3';
const partyContactType = 'select#party_party_contact_type_0';
const partyContactName = 'input#party_party_contact_name_0';
const partyContactEmail = 'input#party_party_contact_email_0';
const partyPreferenceType = 'select#party_party_preference_type_0';
const parpartyPreferenceMedia = 'input#party_party_preference_media_0';
const partyComments = 'textarea#party_party_comment';
const savePartyInformation = 'button#party_create_maintain_party_save_button';
const partyinfoSuccessMessage = 'div.successField';

const insuranceInfoTab = 'div#contract_create_maintain_contract_progressbar_insurance_contract';
const LifeOfLoan = 'input#contract_create_maintain_contract_LfOfLn_fdo_0';
const refundable = 'input#contract_create_maintain_contract_Rfnd_fdo_0';
const maxLoanAmount = 'input#contract_create_maintain_contract_MaxLoan_fdov_0';
const servicer = 'select#contract_create_maintain_contract_servicer';
const saveContractInformation = 'button#contract_create_maintain_contract_save_button';

const leadReinsurerName = 'input#reinsurance_lead_name'
const batchSchedule = 'select#reinsurance_create_maintain_reinsurance_batchschedule'
const addParty = 'input#add_party_id';
const reinsurerName = "input[formcontrolname='reinsurerName']"
const reinsurerQuotaShare = "input[formcontrolname='reinsurerQuota']"
const premium ='input#reinsurance_create_maintain_reinsurance_fdov_0'
const premiumaxValue = 'input#reinsurance_create_maintain_reinsurance_fdov_1'
const startDate = "//label[text()='Program Start Date']/..//input"
const endDate = "//label[text()='Program End Date']/..//input"
const reinsuranceProgramName = "//input[@formcontrolname='programName']"
const saveReinsuranceContract = 'button#reinsurance_create_maintain_reinsurance_save'
const sideMenuButton = "button#header_sidenav_toggle_button"
const searchPartyInput = ".ui-state-default th input"
const partyStatus = "select#party_party_basic_information_party_status";
const viweCommentsButton ="label.onoffswitch-label";
const tableCells = "td>span.ui-cell-data";

const FHBInput = "input#contract_create_maintain_contract_FTHBDisc_fdov_0";
const selftEmployedBarrowersInput = "input#contract_create_maintain_contract_SEBFact_fdov_0";
const nonOwnersOccupiedInput = "input#contract_create_maintain_contract_NOOSFact_fdov_0";
const specialLoanPurposeInput = "input#contract_create_maintain_contract_LPOFact_fdov_0";

const refundStampDutyAmount = "select#contract_create_maintain_contract_Rfndble_fdov_0";
const refundGSTAmount = "select#contract_create_maintain_contract_GSTRfndble_fdov_1";
const premiumTolarance = "input#contract_create_maintain_contract_TolrnceAmt_fdov_2";

const lvrPreCapitalizationMax = "input#contract_create_maintain_contract_LvrPreCap_fdov_0";
const lvrPostCapitalizationMax = "input#contract_create_maintain_contract_LvrPostCap_fdov_1";
const lvrPostCapitalizationMin = "input#contract_create_maintain_contract_LvrPostCap_fdov_2";
const lvrPostCapMinNonResident = "input#contract_create_maintain_contract_PstCpNREMn_fdov_5";
const lvrPostCapMaxNonResident = "input#contract_create_maintain_contract_PstCpNREMx_fdov_6";
const lvrPostCapMinExpac = "input#contract_create_maintain_contract_PstCpEptMn_fdov_7";
const lvrPostCapMaxExpac = "input#contract_create_maintain_contract_PstCpEptMx_fdov_8";
const ParticipatingLenders ="ul.ui-listbox-list li div span";
const generatedPartyID= "#party_party_basic_information_party_id ";


    const user = Cypress.env("userName");
    const pwd = Cypress.env("pwd");
    const baseUrl = Cypress.env("baseUrl");
    var searchPartyName;
    var searchPartyNickName;
    var searchPartyID;
    var GeneratedIDParty;

export class CrParty {


    OpenPartyModule() {
        cy.clickElement(sideMenuButton)
        cy.clickByText('a', 'Party');
        cy.wait(5000);
    }

    NavigateToCreateParty() {
        cy.clickByText('a', 'Create Party');
        cy.wait(5000);
    }

    NavigateToSearchParty() {
        cy.OpenPartyModule();
        cy.clickByText('a', 'Search Party');
        cy.wait(3000);
    }

    EnterPartyID(timeStamp) {
        searchPartyName = partyDetails.partyName + timeStamp;
        searchPartyNickName = partyDetails.partyNickName + timeStamp;
        cy.enterText(partyName, searchPartyName);
        cy.selectDropDownValue(partyType, partyDetails.partyType);
        cy.enterText(awbNumber, partyDetails.awbNumber);
        cy.enterText(partyNickName, searchPartyNickName);
        // cy.get(awbNumber).type(,{force: true})

        // cy.get().select(,{force: true})
        // cy.get().type(,{force: true})
        // cy.log(partyDetails.partyType)
        // cy.get().type(,{force: true})
    }

    EnterAddress() {
        cy.enterText(addressAttn, partyDetails.addressAttn);
        cy.enterText(addressLineOne, partyDetails.addressLineOne);
        cy.enterText(addressCity, partyDetails.addressCity);
        cy.enterText(addressPostCode, partyDetails.addressPostCode);
        // cy.selectDropDownValue(,);
        // cy.selectDropDownValue(,);
        // cy.get().type(,{force: true})
        // cy.get().type(,{force: true})
        // cy.get().type(,{force: true})
        // cy.get().type(,{force: true})
        cy.get(addressProvince).select(partyDetails.addressState, {force: true})
        cy.get(addressCountry).select(partyDetails.addressCountry, {force: true})
    }

    SelectPartyRolse() {
        // if((partyDetails.partyRoleOriginator).equal('yes')){
        // cy.log(partyDetails.partyRoleOriginator);
        // console.log(partyDetails.partyRoleOriginator);
        cy.selectCheckBox(partyRoleOriginator, partyDetails.partyRoleOriginator)
        cy.selectCheckBox(partyRoleServicer, partyDetails.partyRoleServicer)
        cy.selectCheckBox(partyRoleReinsurer, partyDetails.partyRoleReinsurer)
        cy.selectCheckBox(partyRoleParentParty, partyDetails.partyRoleParentParty)
        // cy.pause();
        //  cy.get(partyRoleOriginator).check({force: true}).should('be.checked')
        // }
        // if((partyDetails.partyRoleOriginator).equal('yes')){
        //  cy.get(partyRoleServicer).check({force: true}).should('be.checked')
        // }
        // if((partyDetails.partyRoleOriginator).equal('yes')){
        //  cy.get(partyRoleReinsurer).check({force: true}).should('be.checked')
        // }
    }

    EnterComments() {
        cy.enterText(partyComments, partyDetails.partyComments);
        // cy.get().type(partyDet,{force: true})
    }

    SavePartyInformation() {
        // cy.get(savePartyInformation).click()
        cy.clickElement(savePartyInformation);
        cy.wait(3000);
        cy.get(generatedPartyID).then(($el)=>{
             GeneratedIDParty = $el.text();
            
        })
        
    }

    NavigateToInsuranceContract() {
        // cy.get('div').contains('Insurance Contract').click({force: true})
        cy.get('div:contains("Insurance contract")').click({force: true});
    }

    EnterPremiumDetails() {
        cy.selectCheckBox(LifeOfLoan, partyDetails.termCoverageLifeOfLoan);
        // cy.enterText(premiumTolarance,partyDetails.premiumtolaranceAmount);
//  cy.get().check({force: true})
    }

    EnterRefundDetails() {
        cy.selectCheckBox(refundable, partyDetails.Refundable);
        cy.selectDropDownValue(refundStampDutyAmount, partyDetails.RefundStampDutyAmount);
        cy.selectDropDownValue(refundGSTAmount, partyDetails.RefundGSTAmount);

        // cy.get().check({force: true})
    }

    EnterLoanDetails() {
        cy.enterClearText(maxLoanAmount, partyDetails.MaximumLoanAmount);
        // cy.get().type(,{force: true})
        // cy.get().type(partyDetails.partyComments,{force: true})
    }

    SelectServicer() {
        cy.selectDropDownValue(servicer, partyDetails.Servicer);
        // cy.get().select(,{force: true})
    }

    SaveInsuranceContract() {
        cy.clickElement(saveContractInformation);
        // cy.get().click({force: true})
    }

    NavigateToReinsuranceContract() {

        // cy.get('div:contains("Reinsurance Contract")').click({force: true});
        cy.get('div').contains('Reinsurance Contract').click({force: true});
        cy.wait(3000)
    }

    EnterParticipatingLender() {
        // cy.enterText(leadReinsurerName,partyDetails.LeadReinsurerName);
        cy.get(addParty).first().type(GeneratedIDParty, {force: true})
        cy.wait(3000)
        cy.get('a').contains('Add Party').click({force: true})
        cy.get(ParticipatingLenders).click({force: true})
    }

    EnterParticipatingReinsurer() {
        // cy.enterText();
        // cy.enterText();
        cy.get(reinsurerName).first().type(partyDetails.ReinsurerName, {force: true})
        cy.get(reinsurerQuotaShare).first().type(partyDetails.QuotaShare, {force: true})
    }

    EnterReinsurerProgramDetails(partyIDTimeStamp) {
        cy.get(premium).first().type(partyDetails.PremiumLossValue, {force: true})
        cy.get(premium).eq(1).type(partyDetails.CommissionValue, {force: true})
        cy.get(premium).eq(2).type(partyDetails.LVRRangeMinValue, {force: true})
        cy.get(premiumaxValue).first().type(partyDetails.LVRRangeMaxValue, {force: true})
        cy.xpath(startDate).first().type(dayjs().format('DD/MM/YYYY'), {force: true})
        cy.xpath(endDate).first().type(partyDetails.ProgramEndDate, {force: true})
        cy.get(leadReinsurerName).type(partyDetails.LeadReinsurerName, {force: true})
        cy.get(batchSchedule).select(partyDetails.BatchSchedule, {force: true})
        // cy.pause();
        cy.xpath(reinsuranceProgramName).first().type(partyDetails.ReinsuranceProgram + partyIDTimeStamp, {force: true})
    }

    SaveReinsuranceContract() {
        cy.get(saveReinsuranceContract).click({force: true})
    }

    EnterSearchPartyId() {
        cy.get(searchPartyInput).eq('0').type(searchPartyID, {force: true})
    }

    EnterSearchPartyName() {
        cy.get(searchPartyInput).eq('1').type(searchPartyName, {force: true})
    }

    EnterSearchPartyNickName() {
        cy.get(searchPartyInput).eq('2').type(searchPartyNickName, {force: true})
    }

    GetPartyID() {
        cy.get(partyinfoSuccessMessage).should(($div) => {
            const textPartyID = $div.text()
            searchPartyID = textPartyID.split(' ')[8].replace('.', '').trim();
        })
        return searchPartyID;
    }

    UpdatePartyDetails() {
        // cy.enterText(addressCity,partyDetails.updateAddressCity);

        cy.wait(3000)
        cy.get(addressCity)
            .click({force: true}).clear({force: true}).type(partyDetails.updateAddressCity, {force: true});

        cy.get(addressLineOne)
            .click({force: true}).clear({force: true}).type(partyDetails.updateaddressLineOne, {force: true});
        cy.selectCheckBox(partyRoleOriginator, partyDetails.updatePartyRoleOriginator)
    }

    VerifyUpdatedInformation() {

        // cy.get("input#party_address_city_P").should("have.value","Sydney")
        cy.get(addressCity).should('have.value', partyDetails.updateAddressCity);
        cy.get(addressLineOne).should('have.value', partyDetails.updateaddressLineOne);

    }

    updatePartyStatusActive() {
        cy.selectDropDownValue(partyStatus, partyDetails.partyStatusActive)
    }

    viewComments() {
        cy.clickElement(viweCommentsButton)
    }

}
