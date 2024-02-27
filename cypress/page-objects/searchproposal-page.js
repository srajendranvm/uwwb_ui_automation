/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
import createPolicy from "../fixtures/testData/CreatePolicy.json";

require('cypress-xpath');
import promisify from "cypress-promise";
import dayjs from 'dayjs';
const filePath = "testData/CreateProposal.json"
const filePathMonthly = "testData/CreateProposalMonthly.json"
var proposal= require('../fixtures/testData/TestData.json');

const sideMenuButton = "button#header_sidenav_toggle_button"
const lnk_SearchProposal = "#side_nav_proposal_search_proposal_link"
const ele_ApplicationNumber = "#search_policy_enter_search_criteria_policy_number"
const ele_Search = "#policyorigination_search_policy_enter_search_criteria_search_button"
const ele_SearchRecord = "//span[@class='ui-cell-data']"
const ele_ProposalStatus = "//label[@id='proposal_create_maintain_proposal_status_label']//span"

const ele_ProposalDetails_ApplicationNumber = "//label[@id='proposal_create_maintain_proposal_application_number_label']//span"
const ele_ProposalDetails_Status = "//label[@id='proposal_create_maintain_proposal_status_label']//span"
const ele_ProposalDetails_ApplicationDate = "//label[@id='proposal_create_maintain_proposal_date']//span"
const ele_ProposalDetails_Channel = "//label[@id='proposal_create_maintain_proposal_channel']//span"

const ele_PremiumDetails_PlanType = "//label[contains(text(),'Plan Type')]//span"
const ele_PremiumDetails_Rate = "//label[contains(text(),'Rate')]//span"
const ele_PremiumDetails_BasePremium = "//label[contains(text(),'Base Premium')]//span"
const ele_PremiumDetails_GST = "//label[contains(text(),'GST')]//span"
const ele_PremiumDetails_StampDuty = "//label[contains(text(),'Stamp Duty')]//span"
const ele_PremiumDetails_TotalPremium = "//label[contains(text(),'Total Premium')]//span"
const ele_PremiumDetails_GovtCredits = "//label[contains(text(),'Govt Credits')]//span"
const ele_ErrorDetails = "//header[contains(text(),'Error Details')]"

const ele_PolicyDetails = "//header[contains(text(),'Policy Details')]"
const ele_PolicyDetails_ApplicationDate = "//label[contains(text(),'Application Date')]//span"
const ele_PolicyDetails_ApplicationNumber = "//label[contains(text(),'Application Number')]//span"
const ele_PolicyDetails_ExisitingPolicyNumber = "//label[contains(text(),'Existing Policy Number')]//span"
const ele_PolicyDetails_PaymentPlan = "//label[contains(text(),'Payment Plan')]//span"
const ele_PolicyDetails_ProductType = "//label[contains(text(),'Product Type')]//span"
const ele_PolicyDetails_BrokerName = "//label[contains(text(),'Broker Name')]//span"
const ele_PolicyDetails_BrokerNumber = "//label[contains(text(),'Broker Number')]//span"
const ele_PolicyDetails_Introducer = "//label[contains(text(),'Introducer')]//span"
const ele_PolicyDetails_PartyName = "//label[contains(text(),'Party Name')]//span"
const ele_PolicyDetails_CampaignCode = "//label[contains(text(),'Campaign Code')]//span"
const ele_PolicyDetails_PrecapLVR = "//label[contains(text(),'Pre-Cap LVR')]//span"
const ele_PolicyDetails_PostcapLVR = "//label[contains(text(),'Post-Cap LVR')]//span"

const ele_BorrowerDetails_Header = "//header[contains(text(),'Borrower Details')]"
const ele_BorrowerDetails = "//a[contains(text(),'Borrower 1')]"
const ele_BorrowerDetails_BorrowerType = "//label[contains(text(),'Borrower Type')]//span"
const ele_BorrowerDetails_ApplicationType = "//label[contains(text(),'Applicant Type')]//span"
const ele_BorrowerDetails_DOB = "//label[contains(text(),'Date Of Birth')]//span"
const ele_BorrowerDetails_ResidencyStatus = "//label[contains(text(),'Residency Status')]//span"
const ele_BorrowerDetails_VisaType = "//label[contains(text(),'Visa Type')]//span"
const ele_BorrowerDetails_ContactNumber = "//label[contains(text(),'Contact Number')]//span"
const ele_BorrowerDetails_Email = "//label[contains(text(),'Email')]//span"
const ele_BorrowerDetails_PostalCode = "//label[contains(text(),'Postal Code')]//span"
const ele_BorrowerDetails_Country = "//label[contains(text(),'Country')]//span"
const ele_BorrowerDetails_City = "//label[contains(text(),'City')]//span"
const ele_BorrowerDetails_DocumentType = "//label[contains(text(),'Document Type')]//span"
const ele_BorrowerDetails_DocumentNumber = "//label[contains(text(),'Document Number')]//span"
const ele_BorrowerDetails_CompanyName= "//label[contains(text(),'Company Name')]//span"
const ele_BorrowerDetails_CompanyId = "//label[contains(text(),'Company Id')]//span"
const ele_BorrowerDetails_ContactNumber_Other = "//label[contains(text(),'Contact Number')]//span"
const ele_BorrowerDetails_EmployerName = "//label[contains(text(),'Name Of Employer')]//span"
const ele_BorrowerDetails_EmployerContact = "//label[contains(text(),'Employer Contact Number')]//span"

const ele_LoanDetails_Header = "//header[contains(text(),'Loan Details')]"
const ele_LoanDetails = "//a[contains(text(),'Loan 1')]"
const ele_LoanDetails_LoanNumber = "//label[contains(text(),'Loan Number')]//span"
const ele_LoanDetails_IntiaialInterestRate = "//label[contains(text(),'Initial Interest Rate')]//span"
const ele_LoanDetails_LoanAmount = "//label[contains(text(),'Loan Amount')]//span"
const ele_LoanDetails_LoanType = "//label[contains(text(),'Loan Type')]//span"
const ele_LoanDetails_LoanDrawDate = "//label[contains(text(),'Loan Draw Down Date')]//span"
const ele_LoanDetails_LoanTerm = "//label[contains(text(),'Loan Term')]//span"
const ele_LoanDetails_InterestOnlyTerm = "//label[contains(text(),'Interest Only Term')]//span"
const ele_LoanDetails_InterestRateType= "//label[contains(text(),'Interest Rate Type')]//span"
const ele_LoanDetails_RepaymentFrequency = "//label[contains(text(),'Repayment Frequency')]//span"

const ele_SecurityDetails_Header = "//header[contains(text(),'Security Details')]"
const ele_SecurityDetails = "//a[contains(text(),'Security 1')]"
const ele_SecurityDetails_ConstructionPrice = "//label[contains(text(),'Construction Price')]//span"
const ele_SecurityDetails_BuilderName = "//label[contains(text(),'Builder Name')]//span"
const ele_SecurityDetails_BuilderCost = "//label[contains(text(),'Building Project Cost')]//span"
const ele_SecurityDetails_StreetName = "//label[contains(text(),'Street Name')]//span"
const ele_SecurityDetails_PostCode = "//label[contains(text(),'Post Code')]//span"
const ele_SecurityDetails_ValuationType = "//label[contains(text(),'Valuation Type')]//span"
const ele_SecurityDetails_ValuerRegistrationNumber = "//label[contains(text(),'Valuer Registration Number')]//span"
const ele_SecurityDetails_NumberOfDwellings = "//label[contains(text(),'Number Of Dwellings')]//span"
const ele_SecurityDetails_LandArea = "//label[contains(text(),'Land Or Site Area')]//span"
const ele_SecurityDetails_RiskRating= "//label[contains(text(),'Risk Rating')]//span"
const ele_SecurityDetails_InspectionDate = "//label[contains(text(),'Inspection Date')]//span"
const ele_SecurityDetails_Beds= "//label[contains(text(),'Number Of Beds')]//span"
const ele_SecurityDetails_CurrentUse = "//label[contains(text(),'Current Use')]//span"

export class SrProposal {
    NavigateToSearchProposal() {
        cy.clickElement(sideMenuButton)
        cy.get(lnk_SearchProposal).click({force: true});
        cy.wait(10000)
    }

    SearchProposal(applicationNumber) {
        cy.enterText(ele_ApplicationNumber, applicationNumber);
        cy.get(ele_Search).click({force: true});
        cy.wait(5000)
        cy.xpath(ele_SearchRecord).should('be.visible')
        cy.xpath(ele_SearchRecord).first().click({force: true})
    }

    CheckProposalStatus(expStatus){
        cy.xpath(ele_ProposalStatus).first().should("include.text",expStatus);
    }

    VerifyProposalDetails(applicationNumber, partyName){
        cy.fixture(filePath).then((data) => {
            cy.xpath(ele_ProposalDetails_ApplicationNumber).should("include.text",applicationNumber);
            cy.xpath(ele_ProposalDetails_ApplicationDate).should("include.text",data.package.content.application.policy.applicationDate);
            var dti = data.package.content.application.borrowers[0].dti
            if (dti == "10") {
                cy.xpath(ele_ProposalDetails_Status).should("include.text","Approved");
            }
            cy.xpath(ele_ProposalDetails_Channel).should("include.text",partyName);
        })
    }

        VerifyPremiumDetails(partyName, planType){
        cy.fixture(filePath).then((data) => {
            cy.fixture(filePathMonthly).then((dataMonthly) => {
            
            if (planType === "Single") {
                cy.xpath(ele_PremiumDetails_PlanType).should("include.text",proposal.planType);  
            }
            if (planType === "Monthly") {
                cy.xpath(ele_PremiumDetails_PlanType).should("include.text",proposal.planTypeOther);
            }

            cy.xpath(ele_PremiumDetails_StampDuty).should("include.text",proposal.stampDuty);
            
            if ((partyName === "ColCap") &&  (planType === "Single")){
                cy.xpath(ele_PremiumDetails_Rate).should("include.text",proposal.rateColcap);
                cy.xpath(ele_PremiumDetails_BasePremium).should("include.text",proposal.basePremiumColcap);
                cy.xpath(ele_PremiumDetails_GST).should("include.text",proposal.gstColcap);
                cy.xpath(ele_PremiumDetails_TotalPremium).should("include.text",proposal.totalPremiumColcap);
                cy.xpath(ele_PremiumDetails_GovtCredits).should("include.text",proposal.govtCreditsColcap);
            }
            if ((partyName === "ColCap") &&  (planType === "Monthly")){
                cy.xpath(ele_PremiumDetails_Rate).should("include.text",proposal.rateColcapMonthly);
                cy.xpath(ele_PremiumDetails_BasePremium).should("include.text",proposal.basePremiumColcap);
                cy.xpath(ele_PremiumDetails_GST).should("include.text",proposal.gstColcap);
                cy.xpath(ele_PremiumDetails_TotalPremium).should("include.text",proposal.totalPremiumColcap);
                cy.xpath(ele_PremiumDetails_GovtCredits).should("include.text",proposal.govtCreditsColcap);
            }
            if (partyName === "RAMS") {
                cy.xpath(ele_PremiumDetails_Rate).should("include.text",proposal.rateRams);
                cy.xpath(ele_PremiumDetails_BasePremium).should("include.text",proposal.basePremiumRams);
                cy.xpath(ele_PremiumDetails_GST).should("include.text",proposal.gstRams);
                cy.xpath(ele_PremiumDetails_TotalPremium).should("include.text",proposal.totalPremiumRams);
                cy.xpath(ele_PremiumDetails_GovtCredits).should("include.text",proposal.govtCreditsRams);
            }

            if (partyName === "WBC") {
                cy.xpath(ele_PremiumDetails_Rate).should("include.text",proposal.rateWbc);
                cy.xpath(ele_PremiumDetails_BasePremium).should("include.text",proposal.basePremiumWbc);
                cy.xpath(ele_PremiumDetails_GST).should("include.text",proposal.gstWbc);
                cy.xpath(ele_PremiumDetails_TotalPremium).should("include.text",proposal.totalPremiumWbc);
                cy.xpath(ele_PremiumDetails_GovtCredits).should("include.text",proposal.govtCreditsWbc);
            }

            if (partyName == "SGB") {
                cy.xpath(ele_PremiumDetails_Rate).should("include.text",proposal.rateStg);
                cy.xpath(ele_PremiumDetails_BasePremium).should("include.text",proposal.basePremiumStg);
                cy.xpath(ele_PremiumDetails_GST).should("include.text",proposal.gstStg);
                cy.xpath(ele_PremiumDetails_TotalPremium).should("include.text",proposal.totalPremiumStg);
                cy.xpath(ele_PremiumDetails_GovtCredits).should("include.text",proposal.govtCreditsStg);
            }


        })
    })
    }

    VerifyErrorDetails(){
        cy.xpath(ele_ErrorDetails).should('exist');
    }

    VerifyPolicyDetails(applicationNumber,partyName, planType){
        cy.xpath(ele_PolicyDetails).click();
        cy.fixture(filePath).then((data) => {
            cy.fixture(filePathMonthly).then((dataMothly) => {
            cy.xpath(ele_PolicyDetails_ApplicationDate).should("include.text",data.package.content.application.policy.applicationDate);
            cy.xpath(ele_PolicyDetails_ApplicationNumber).should("include.text",applicationNumber);
            cy.xpath(ele_PolicyDetails_ProductType).should("include.text",data.package.content.application.policy.productType);
            cy.xpath(ele_PolicyDetails_ProductType).should("include.text",data.package.content.application.policy.productType);
            
            if (planType === "Single") {
                cy.xpath(ele_PolicyDetails_PaymentPlan).should("include.text",data.package.content.application.policy.paymentPlan);
            }
            if (planType === "Monthly") {
                cy.xpath(ele_PolicyDetails_PaymentPlan).should("include.text",dataMothly.package.content.application.policy.paymentPlan);
            }
            cy.xpath(ele_PolicyDetails_PartyName).should("include.text",partyName)
            cy.xpath(ele_PolicyDetails_Introducer).should("include.text",data.package.content.application.policy.salesChannel.introducer);
            cy.xpath(ele_PolicyDetails_ExisitingPolicyNumber).should("include.text",data.package.content.application.policy.existingPolicyNumber);
            cy.xpath(ele_PolicyDetails_BrokerName).should("include.text",data.package.content.application.policy.salesChannel.brokerName);
            cy.xpath(ele_PolicyDetails_BrokerNumber).should("include.text",data.package.content.application.policy.salesChannel.brokerNo);
            cy.xpath(ele_PolicyDetails_CampaignCode).should("include.text",data.package.content.application.policy.salesChannel.campaignCode);

            if ((partyName === "ColCap") &&  (planType === "Single")){
                    cy.xpath(ele_PolicyDetails_PrecapLVR).should("include.text", proposal.precapLVRColcap);
                    cy.xpath(ele_PolicyDetails_PostcapLVR).should("include.text", proposal.postcapLVRColcap);
            }

            if ((partyName === "ColCap") &&  (planType === "Monthly")){
                cy.xpath(ele_PolicyDetails_PrecapLVR).should("include.text", proposal.precapLVRColcapMonthly);
                cy.xpath(ele_PolicyDetails_PostcapLVR).should("include.text", proposal.postcapLVRColcapMonthly);
            }

            if (partyName === "RAMS") {
                cy.xpath(ele_PolicyDetails_PrecapLVR).should("include.text", proposal.precapLVRRams);
                cy.xpath(ele_PolicyDetails_PostcapLVR).should("include.text", proposal.postcapLVRRams);
            }
            if (partyName === "WBC") {
                cy.xpath(ele_PolicyDetails_PrecapLVR).should("include.text", proposal.precapLVRWbc);
                cy.xpath(ele_PolicyDetails_PostcapLVR).should("include.text", proposal.postcapLVRWbc);
            }
            if (partyName === "SGB") {
                cy.xpath(ele_PolicyDetails_PrecapLVR).should("include.text", proposal.precapLVRStg);
                cy.xpath(ele_PolicyDetails_PostcapLVR).should("include.text", proposal.postcapLVRStg);
            }
        })
    })
    }

    VerifyBorrowerDetails() {
        cy.xpath(ele_BorrowerDetails_Header).click();
        cy.xpath(ele_BorrowerDetails).click();
        cy.fixture(filePath).then((data) => {
            cy.xpath(ele_BorrowerDetails_BorrowerType).should("include.text", data.package.content.application.borrowers[0].borrowerType);
            cy.xpath(ele_BorrowerDetails_ApplicationType).should("include.text", data.package.content.application.borrowers[0].applicantType);
            cy.xpath(ele_BorrowerDetails_DOB).should("include.text", data.package.content.application.borrowers[0].dateOfBirth);
            cy.xpath(ele_BorrowerDetails_ResidencyStatus).should("include.text", data.package.content.application.borrowers[0].residencyStatus);
            cy.xpath(ele_BorrowerDetails_VisaType).should("include.text", data.package.content.application.borrowers[0].visaType)
            cy.xpath(ele_BorrowerDetails_ContactNumber).should("include.text", data.package.content.application.borrowers[0].contactDetails.contactNumber)
            cy.xpath(ele_BorrowerDetails_Email).should("include.text", data.package.content.application.borrowers[0].contactDetails.emailAddress)
            cy.xpath(ele_BorrowerDetails_PostalCode).should("include.text", data.package.content.application.borrowers[0].fullResidentialAddress.postCode)
            cy.xpath(ele_BorrowerDetails_City).should("include.text", data.package.content.application.borrowers[0].fullResidentialAddress.city)
            cy.xpath(ele_BorrowerDetails_Country).should("include.text", data.package.content.application.borrowers[0].fullResidentialAddress.country)
            cy.xpath(ele_BorrowerDetails_DocumentType).should("include.text", data.package.content.application.borrowers[0].proofOfIdentity.documentType)
            cy.xpath(ele_BorrowerDetails_DocumentNumber).should("include.text", data.package.content.application.borrowers[0].proofOfIdentity.documentNumber)
            cy.xpath(ele_BorrowerDetails_CompanyName).should("include.text", data.package.content.application.borrowers[0].company.companyName)
            cy.xpath(ele_BorrowerDetails_CompanyId).should("include.text", data.package.content.application.borrowers[0].company.companyId)
            cy.xpath(ele_BorrowerDetails_ContactNumber_Other).eq(1).should("include.text", data.package.content.application.borrowers[0].company.contactNumber)
            cy.xpath(ele_BorrowerDetails_EmployerName).should("include.text", data.package.content.application.borrowers[0].currentEmployment.nameOfEmployer)
            cy.xpath(ele_BorrowerDetails_EmployerContact).should("include.text", data.package.content.application.borrowers[0].currentEmployment.employerContactNumber)

        })
    }

        VerifyLoanDetails(loanNumber)
        {
            cy.xpath(ele_LoanDetails_Header).click();
            cy.xpath(ele_LoanDetails).click();
            cy.fixture(filePath).then((data) => {

                cy.xpath(ele_LoanDetails_LoanType).should("include.text",data.package.content.application.loans[0].loanType);
                cy.xpath(ele_LoanDetails_LoanAmount).should("include.text",data.package.content.application.loans[0].loanAmount);
                cy.xpath(ele_LoanDetails_LoanNumber).should("include.text",loanNumber);
                cy.xpath(ele_LoanDetails_IntiaialInterestRate).should("include.text",data.package.content.application.loans[0].initialInterestRate);
                cy.xpath(ele_LoanDetails_LoanDrawDate).should("include.text",data.package.content.application.loans[0].loanDrawDownDate);
                cy.xpath(ele_LoanDetails_LoanTerm).should("include.text",data.package.content.application.loans[0].term.loanTerm);
                cy.xpath(ele_LoanDetails_InterestOnlyTerm).should("include.text",data.package.content.application.loans[0].term.interestOnlyTerm);
                cy.xpath(ele_LoanDetails_InterestRateType).should("include.text",data.package.content.application.loans[0].term.interestRateType);
                cy.xpath(ele_LoanDetails_RepaymentFrequency).should("include.text",data.package.content.application.loans[0].term.repaymentFrequency);
            })
        }

    VerifySecurityDetails(streetNumber)
    {
        cy.xpath(ele_SecurityDetails_Header).click();
        cy.xpath(ele_SecurityDetails).click();
        cy.fixture(filePath).then((data) => {

            //var price = data.package.content.application.securities[0].purchasePriceOrSecurityValue;

            // let priceConvertion = data.package.content.application.securities[0].purchasePriceOrSecurityValue;
            // priceConvertion = priceConvertion.padEnd(14,"0");

            //cy.xpath(ele_SecurityDetails_PurchasePrice).should("include.text",priceConvertion);
            cy.xpath(ele_SecurityDetails_ConstructionPrice).should("include.text",data.package.content.application.securities[0].constructionPrice);
            cy.xpath(ele_SecurityDetails_BuilderName).should("include.text",data.package.content.application.securities[0].builderName);
            cy.xpath(ele_SecurityDetails_BuilderCost).should("include.text",data.package.content.application.securities[0].buildingProjectCost);
            cy.xpath(ele_SecurityDetails_StreetName).should("include.text",streetNumber);
            cy.xpath(ele_SecurityDetails_PostCode).should("include.text",data.package.content.application.securities[0].securityPropertyAddress.postCode);
            cy.xpath(ele_SecurityDetails_ValuationType).should("include.text",data.package.content.application.securities[0].valuationDetail.valuationType);
            cy.xpath(ele_SecurityDetails_ValuerRegistrationNumber).should("include.text",data.package.content.application.securities[0].valuationDetail.valuerRegistrationNumber);
            cy.xpath(ele_SecurityDetails_NumberOfDwellings).should("include.text",data.package.content.application.securities[0].valuationDetail.numberOfDwellings);
            cy.xpath(ele_SecurityDetails_LandArea).should("include.text",data.package.content.application.securities[0].valuationDetail.landOrSiteArea);
            cy.xpath(ele_SecurityDetails_RiskRating).should("include.text",data.package.content.application.securities[0].valuationDetail.riskRating);
            cy.xpath(ele_SecurityDetails_InspectionDate).should("include.text",data.package.content.application.securities[0].valuationDetail.inspectionDate);
            cy.xpath(ele_SecurityDetails_Beds).should("include.text",data.package.content.application.securities[0].valuationDetail.numberOfBeds);
            cy.xpath(ele_SecurityDetails_CurrentUse).should("include.text",data.package.content.application.securities[0].valuationDetail.currentUse);

            })
    }

}

