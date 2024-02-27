import promisify from 'cypress-promise'
// let dateFormat = require('dateformat');
import moment from 'moment';

const TestData = require('../fixtures/TestData.json')
const Actions = require('../fixtures/Actions.json')
const ExpectedLabels = require('../fixtures/Labels.json')
export const get = (path, object) => path.reduce((xs, x) => (object && xs && xs[x]) ? xs[x] : null, object);
export const getValueOrBlank = (path, object) => path.reduce((xs, x) => (object && xs && xs[x]) ? xs[x] : '', object);

Cypress.Commands.add("check_ElementExist", (obj, ShouldExist, NumberOfSeconds) => {
    let NoOfLoops = 10;
    if (!isNaN(NumberOfSeconds)) {
        NoOfLoops = NumberOfSeconds
    }
    if (ShouldExist == false) {
        cy.wait(3000);
        for (let i = 0; i <= NoOfLoops; i++) {
            cy.get('body')
                .then(($body) => {
                    if ($body.find(obj).length <= 0) {
                        return true
                    }
                    cy.wait(1000)
                    return false;
                });
        }
    } else {
        for (let i = 0; i <= NoOfLoops; i++) {
            cy.get('body')
                .then(($body) => {
                    if ($body.find(obj).length) {
                        return true
                    }
                    cy.wait(1000)
                    return false;
                });
        }
    }

})


Cypress.Commands.add("getDateInString", () => {
    return moment().format('MM_DD_yyyy_HH_mm_ss');
})

Cypress.Commands.add("getDateInDDMMYYYY", (obj) => {
    return moment().format("MM/DD/YYYY")
})

Cypress.Commands.add("generateSSN", (obj) => {
    const all_Zero = /^0{9}$/;
    const three_Blocks = /^(0{3}\d{6}|\d{3}0{2}\d{4}|\d{5}0{4})$/;
    const first_Three_Digits = /^(000|666)\d{6}$/;
    let randomNumber;
    for (let a = 0; a <= 10; a++) {
        randomNumber = Math.floor(Math.random() * (999999999 - 100000000 + 1) + 100000000);
        if ((randomNumber.toString().match(all_Zero)) || (randomNumber.toString().match(three_Blocks)) || (randomNumber.toString().match(first_Three_Digits))) {
        } else return randomNumber.toString();
    }
    return null;

    // let randomNumber = Math.floor(Math.random() * (700000000 - 300000000 + 1) + 300000000);
    // let Test = randomNumber.toString();
    // if (Test[3] == '0' && Test[4] == '0') {
    //     randomNumber = Math.floor(Math.random() * (700000000 - 300000000 + 1) + 300000000);
    //     let Test = randomNumber.toString();
    //     if (Test[3] == '0' && Test[4] == '0') {
    //         randomNumber = Math.floor(Math.random() * (700000000 - 300000000 + 1) + 300000000);
    //     }
    // }
    // return randomNumber;
})

Cypress.Commands.add('checkMissingDocNotSent_lenders', (cert_number) => {
    return cy.task('getCertDataFromIVCertSummary', cert_number).then((IvCertData) => {
        let SubID = IvCertData.loan.submittingBranch.submittingId;
        let Branch = SubID.split("-")[0]
        if ((TestData.MissingDocNotSent_lenders).includes(Branch.trim())) {
            return true
        } else return false;
    })
})

Cypress.Commands.add('CommitmentCertNotSentLender', (cert_number) => {
    return cy.task('getCertDataFromIVCertSummary', cert_number).then((IvCertData) => {
        let SubID = IvCertData.loan.submittingBranch.submittingId;
        let Branch = SubID.split("-")[0]
        if ((TestData.chaseBranchId).includes(Branch.trim()) || (TestData.MissingDocNotSent_lenders).includes(Branch.trim())) {
            return true
        } else return false;
    })
})

Cypress.Commands.add('ReIssueCommCertLender', (cert_number) => {
    return cy.task('getCertDataFromIVCertSummary', cert_number).then((IvCertData) => {
        let SubID = IvCertData.loan.submittingBranch.submittingId;
        let Branch = SubID.split("-")[0]
        console.log("Branch is ", Branch)
        if ((TestData.QFin_lender).includes(Branch.trim()) || (TestData.CommCertNotSentLender).includes(Branch.trim())) {
            return false
        } else return true;
    })
})

Cypress.Commands.add("EditField", (obj, value) => {
    if (value == null) {
        cy.get(obj).scrollIntoView();
        cy.get(obj).clear();
        cy.get(obj).type('{shift}{alt}');
        cy.TAB;
    } else if (value == "") {
        ;
    } else {
        cy.get(obj).scrollIntoView();
        cy.get(obj).clear().type(value);
    }
})

Cypress.Commands.add("SelectDropDownValue", (obj, value) => {
    if (value == null || value == 'Select...') {
        cy.get(obj).scrollIntoView();
        cy.get(obj).select('')
    } else if (value == "") {
    } else if (value.toUpperCase() == 'RANDOM') {
        cy.get(obj).scrollIntoView();
        cy.get(obj).find('option').then((options) => {
            const actual = [...options].map(o => o.text)
            let arraySizeA = actual.length;
            let randomNumberA = 1;
            if (arraySizeA > 1) {
                randomNumberA = Math.floor(Math.random() * ((arraySizeA - 1) - 0 + 1) + 0);
            }
            if (randomNumberA == 0) randomNumberA = 1;
            cy.get(obj).select(actual[randomNumberA]);
        })
    } else {
        cy.get(obj).select(value);
    }
})

Cypress.Commands.add("ValidateDropdownValues", (obj, expectedText) => {
    cy.get(obj).find('option').then((options) => {
        const actual = [...options].map(o => o.text)
        expect(actual.length).to.equal(expectedText.length);
        for (let ele in expectedText) expect(actual).to.contain(expectedText[ele])
    })
})

Cypress.Commands.add("setCheckBoxValue", (obj, value) => {
    if (value == null || value == undefined || value.toString().trim() == '') {
    } else {
        // let newValue;
        value = value.toString().toUpperCase();
        if (value == 'TRUE' || value == "YES") cy.get(obj).check()//newValue = true;
        else cy.get(obj).uncheck() // newValue = false;
        // cy.get(obj).invoke('prop', 'checked').then((checked) => {
        //     if (checked.toString() == newValue.toString()) { }
        //     else cy.get(obj).click()
        // })
    }
})

Cypress.Commands.add("SelectRadioButton", (value, objYes, objNo) => {
    if (value != undefined && value != null && value != "") {
        if (value.toString().toLowerCase() == 'true' || value.toString().toLowerCase() == 'yes') {
            cy.get(objYes).click()
        } else if (value.toString().toLowerCase() == 'false' || value.toString().toLowerCase() == 'no') {
            cy.get(objNo).click()
        }
    }
})

Cypress.Commands.add("VerifyUIWithTestData", (Type, obj, valueTD) => {
    switch (Type.toLowerCase()) {
        case "edit":
            if (valueTD != "") {
                cy.get(obj).invoke('val').then((ValueUI) => {
                    if (valueTD != null && valueTD != undefined) expect(ValueUI).to.equal(valueTD);
                    else expect(ValueUI).to.equal('')
                })
            }
            break;
        default:
            expect(0).to.equal(1, "Please select valid type for validation");
    }
})

Cypress.Commands.add("getStateName", (StateCode) => {
    let s;
    switch (StateCode) {
        case "AK":
            return "AK - Alaska";
        case "AL":
            return "AL - Alabama";
        case "AR":
            return "AR - Arkansas";
        case "AZ":
            return "AZ - Arizona";
        case "CA":
            return "CA - California";
        case "CO":
            return "CO - Colorado";
        case "CT":
            return "CT - Connecticut";
        case "DC":
            return "DC - District of Columbia";
        case "DE":
            return "DE - Delaware";
        case "FL":
            return "FL - Florida";
        case "GA":
            return "GA - Georgia";
        case "HI":
            return "HI - Hawaii";
        case "IA":
            return "IA - Iowa";
        case "ID":
            return "ID - Idaho";
        case "IL":
            return "IL - Illinois";
        case "IN":
            return "IN - Indiana";
        case "KS":
            return "KS - Kansas";
        case "KY":
            return "KY - Kentucky";
        case "LA":
            return "LA - Louisiana";
        case "MA":
            return "MA - Massachusetts";
        case "MD":
            return "MD - Maryland";
        case "ME":
            return "ME - Maine";
        case "MI":
            return "MI - Michigan";
        case "MN":
            return "MN - Minnesota";
        case "MO":
            return "MO - Missouri";
        case "MS":
            return "MS - Mississippi";
        case "MT":
            return "MT - Montana";
        case "NC":
            return "NC - North Carolina";
        case "ND":
            return "ND - North Dakota";
        case "NE":
            return "NE - Nebraska";
        case "NH":
            return "NH - New Hampshire";
        case "NJ":
            return "NJ - New Jersey";
        case "NM":
            return "NM - New Mexico";
        case "NV":
            return "NV - Nevada";
        case "NY":
            return "NY - New York";
        case "OH":
            return "OH - Ohio";
        case "OK":
            return "OK - Oklahoma";
        case "OR":
            return "OR - Oregon";
        case "PA":
            return "PA - Pennsylvania";
        case "PR":
            return "PR - Puerto Rico";
        case "RI":
            return "RI - Rhode Island";
        case "SC":
            return "SC - South Carolina";
        case "SD":
            return "SD - South Dakota";
        case "TN":
            return "TN - Tennessee";
        case "TX":
            return "TX - Texas";
        case "UT":
            return "UT - Utah";
        case "VA":
            return "VA - Virginia";
        case "VI":
            return "VI - Virgin Islands";
        case "VT":
            return "VT - Vermont";
        case "WA":
            return "WA - Washington";
        case "WI":
            return "WI - Wisconsin";
        case "WV":
            return "WV - West Virginia";
        case "WY":
            return "WY - Wyoming";
    }
})

Cypress.Commands.add("GetMonthInString", (month) => {
    switch (month.toString()) {
        case "1":
        case "01":
            return 'January';
        case "2":
        case "02":
            return 'February';
        case "3":
        case "03":
            return 'March';
        case "4":
        case "04":
            return 'April';
        case "5":
        case "05":
            return 'May';
        case "6":
        case "06":
            return 'June';
        case "7":
        case "07":
            return 'July';
        case "8":
        case "08":
            return 'August';
        case "9":
        case "09":
            return 'September';
        case "10":
            return 'October';
        case "11":
            return 'November';
        case "12":
            return 'December';
        default:
            return "invalid"
    }
})

Cypress.Commands.add("getProgramName", (programCode) => {
    switch (programCode.toString()) {
        case "16056":
            return "Fannie Mae High LTV New Servicer";
        case "16055":
            return "Fannie Mae High LTV Same Servicer";
        case "16058":
            return "Freddie Mac Enhanced Relief Refi NS";
        case "16057":
            return "Freddie Mac Enhanced Relief Refi SS";
        case "16197":
            return "Refi Possible";
        case "16196":
            return "RefiNow";
        case "16054":
            return "CRA or Other Affordable Housing";
        case "15925":
            return "EZ Decisioning";
        case "15953":
            return "EZD-FHLB Down Pmt Assist";
        case "15991":
            return "EZD-HFA";
        case "15406":
            return "FHLMC Home Possible";
        case "15975":
            return "FHLMC Home Possible Advantage";
        case "16001":
            return "HomeReady";
        case "15876":
            return "Refi to Mod New Servicer";
        case "15875":
            return "Refi to Mod Same Servicer";
        case "15965":
            return "Standard Medical/Dental Program";
        case "15945":
            return "Standard Program";
        case "15950":
            return "Std-FHLB Down Pmt Assist";
        case "15990":
            return "STD-HFA";
        case "1360":
            return "100% Affordable";//20
        case "16069":
            return "CalHFA";
        case "15936":
            return "WHEDA Advantage Conventional";
        case "857":
            return "Bay Banks Community Investment Program";
        case "16036":
            return "Community Experts";
        case "16037":
            return "Community Heroes";
        case "1318":
            return "FNMA Expanded Approval Pilot Level 2";
        case "16028":
            return "Asset Depletion Loan";
        case "1106":
            return "NHSA w/5% Min Borr Funds (1994 Issue)";
        default:
            return ""
    }
})

Cypress.Commands.add("getProgramCode", (programName) => {
    switch (programName.toString()) {

        case "Fannie Mae High LTV New Servicer":
            return "16056";
        case "Freddie Mac Enhanced Relief Refi NS":
            return "16058";
        case "Freddie Mac Enhanced Relief Refi SS":
            return "16057";
        case "Refi Possible":
            return "16197";
        case "RefiNow":
            return "16196";
        case "CRA or Other Affordable Housing":
            return "16054";
        case "EZ Decisioning":
            return "15925";
        case "EZD-FHLB Down Pmt Assist":
            return "15953";
        case "EZD-HFA":
            return "15991";
        case "FHLMC Home Possible":
            return "15406";
        case "FHLMC Home Possible Advantage":
            return "15975";
        case "HomeReady":
            return "16001";
        case "Refi to Mod New Servicer":
            return "15876";
        case "Refi to Mod Same Servicer":
            return "15875";
        case "Standard Medical/Dental Program":
            return "15965";
        case "Standard Program":
            return "15945";
        case "Std-FHLB Down Pmt Assist":
            return "15950";
        case "STD-HFA":
            return "15990";
        case "100% Affordable":
            return "1360";
        case "CalHFA":
            return "16069";
        case "WHEDA Advantage Conventional":
            return "15936";
        case "Bay Banks Community Investment Progra":
            return "857";
        case "Community Experts":
            return "16036";
        case "Community Heroes":
            return "16037";
        case "FNMA Expanded Approval Pilot Level 2":
            return "1318";
        case "Asset Depletion Loan":
            return "16028";
        case "NHSA w/5% Min Borr Funds (1994 Issue)":
            return "1106";
        default:
            return ""
    }
})

Cypress.Commands.add("getDaysInMonth", (Month, year) => {
    switch (Month.toString()) {
        case "1":
        case "01":
        case "3":
        case "03":
        case "5":
        case "05":
        case "7":
        case "07":
        case "8":
        case "08":
        case "10":
        case "12":
        case "Jan":
        case "January":
        case "Mar":
        case "March":
        case "May":
        case "Jul":
        case "July":
        case "Aug":
        case "August":
        case "Oct":
        case "October":
        case "Dec":
        case "December":
            return 31;
        case "4":
        case "04":
        case "6":
        case "06":
        case "9":
        case "09":
        case "11":
        case "Apr":
        case "April":
        case "Jun":
        case "June":
        case "Sep":
        case "September":
        case "Nov":
        case "November":
            return 30;

        case "2":
        case "02":
        case "Feb":
        case "February":
            let days;
            year = parseInt(year)
            let bol = (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0)
            if (bol) days = 29; else days = 28;
            return days;
        default:
            return 0;
            ;
    }
})

Cypress.Commands.add("getCurrentDate", (format) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + dd + yyyy;
    return today
})

Cypress.Commands.add("getCalculatedCreditReportDueDate", (format) => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    const date = new Date(today);
    date.setDate(date.getDate() + 110);
    var newdate = new Date(date);
    const CreditDueDate = ((newdate.getMonth() > 8) ? (newdate.getMonth() + 1) : ('0' + (newdate.getMonth() + 1))) + '/' + ((newdate.getDate() > 9) ? newdate.getDate() : ('0' + newdate.getDate())) + '/' + newdate.getFullYear();
    return CreditDueDate

})

Cypress.Commands.add("getCurrentDateYYYYMMDD", (format) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today
})

Cypress.Commands.add("getResponseData_EmployeeSearchServiceImpl", (Cert_info_resp) => {
    let Status, EmpNo;
    let jsonData1 = Cert_info_resp[0].jsonData.map.response
    Status = jsonData1.statusCode
    if (Status == 'SUCCESS') EmpNo = jsonData1.employees[0].opusEmployeeNumber; else EmpNo = TestData.CommonOpusEmpNo
    let EmpDet = new Map();
    EmpDet.set('status', jsonData1.statusCode);
    EmpDet.set('opusEmployeeNumber', EmpNo);
    return EmpDet
})

Cypress.Commands.add("getRequestData_EmployeeSearchServiceImpl", (Cert_info_req) => {
    let jsonData = JSON.parse(Cert_info_req[0].data);

    jsonData = jsonData.replace("[", '').replace("]", '')
    return [jsonData];
})

Cypress.Commands.add("getRequestData_UWLoanServiceImpl", (Cert_info_req) => {
    let dataTest = Cert_info_req[0].jsonData.map.requestParam1
    let decisions = new Map()
    if (dataTest.channel != undefined) decisions.set('channel', dataTest.channel); else decisions.set('channel', null)
    if (dataTest.certificateNumber != undefined) decisions.set('certificateNumber', dataTest.certificateNumber); else decisions.set('certificateNumber', null)
    if (dataTest.empNumber != undefined) decisions.set('empNumber', dataTest.empNumber); else decisions.set('empNumber', null)
    if (dataTest.ivResultIndicator != undefined) decisions.set('ivResultIndicator', dataTest.ivResultIndicator); else decisions.set('ivResultIndicator', null)
    if (dataTest.misrepresentationResult != undefined) decisions.set('misrepresentationResult', dataTest.misrepresentationResult); else decisions.set('misrepresentationResult', null)
    if (dataTest.qualityControlIndicator != undefined) decisions.set('qualityControlIndicator', dataTest.qualityControlIndicator); else decisions.set('qualityControlIndicator', null)
    if (dataTest.appraisalResult != undefined) decisions.set('appraisalResult', dataTest.appraisalResult); else decisions.set('appraisalResult', null)
    return decisions;
})

Cypress.Commands.add("ValidateUWLoanServiceMapping", (EmpRes, UWSearchRes, CertSetUpdate, Test_Data) => {
    let CertSetUpDateTestData1 = new Date(TestData.CertSetUpDate1);  //this is the date range to be from test data
    let CertSetUpDateTestData2 = new Date(TestData.CertSetUpdate2);
    // CertSetUpdate= new Date(new Date(CertSetUpdate).setHours(0, 0)).toLocaleDateString()
    CertSetUpdate = new Date(CertSetUpdate)
    let UWData;
    if (CertSetUpdate <= CertSetUpDateTestData1) {
        UWData = Test_Data.Before_03012020
    } else if (CertSetUpdate <= CertSetUpDateTestData2) {
        UWData = Test_Data.Between_0301_and_04222020
    } else {
        UWData = Test_Data.after_04222020
    }
    expect(UWSearchRes.get('channel')).to.equal('DIVE');
    expect(UWSearchRes.get('empNumber')).to.equal(EmpRes.get('opusEmployeeNumber'));
    expect(UWSearchRes.get('ivResultIndicator')).to.equal(UWData.ivResultIndicator)
    expect(UWSearchRes.get('misrepresentationResult')).to.equal(UWData.misrepresentationResult)
    expect(UWSearchRes.get('qualityControlIndicator')).to.equal(UWData.qualityControlIndicator)
    expect(UWSearchRes.get('appraisalResult')).to.equal(UWData.appraisalResult)
})

Cypress.Commands.add("ValidateUWLoanDataFromOpus", (EmpRes, opus_res, CertSetUpdate, Test_Data) => {
    console.log("validating opus data")
    let CertSetUpDateTestData1 = new Date(TestData.CertSetUpDate1);  //this is the date range to be from test data
    let CertSetUpDateTestData2 = new Date(TestData.CertSetUpdate2);
    console.log("CertSetUpdate ", CertSetUpdate)
    // CertSetUpdate= new Date(new Date(CertSetUpdate).setHours(0, 0)).toLocaleDateString()
    CertSetUpdate = new Date(CertSetUpdate)
    console.log("CertSetUpdate ", CertSetUpdate)
    let UWData;
    if (CertSetUpdate <= CertSetUpDateTestData1) {
        UWData = Test_Data.Before_03012020
    } else if (CertSetUpdate <= CertSetUpDateTestData2) {
        UWData = Test_Data.Between_0301_and_04222020
    } else {
        UWData = Test_Data.after_04222020
    }
    // expect(opus_res.get('empNumber')).to.equal(EmpRes.get('opusEmployeeNumber'));
    // expect(opus_res.get('ivResultIndicator')).to.equal(UWData.ivResultIndicator)
    // expect(opus_res.get('misrepresentationResult')).to.equal(UWData.misrepresentationResult)
    // expect(opus_res.get('qualityControlIndicator')).to.equal(UWData.qualityControlIndicator)
    // expect(opus_res.get('appraisalResult')).to.equal(UWData.appraisalResult)

    expect(opus_res.Rescission_Relief_Emp_Modified).to.equal(EmpRes.get('opusEmployeeNumber'));
    expect(opus_res.Independent_Validation).to.equal(UWData.ivResultIndicator)
    expect(opus_res.Incontestability_In_Months).to.equal(UWData.misrepresentationResult)
    expect(opus_res.Quality_Control).to.equal(UWData.qualityControlIndicator)
    expect(opus_res.Appraisal_Rescission_Relief_In_Months).to.equal(UWData.appraisalResult)
})

Cypress.Commands.add("getRequestData_OpusMiDeliveryServiceImpl", (Cert_info_req) => {
    let dataTest = Cert_info_req[0].jsonData.map.requestParam1;
    let MiDeliveryData = new Map();
    if (dataTest.channel != undefined) MiDeliveryData.set("channel", dataTest.channel); else MiDeliveryData.set("channel", null);
    if (dataTest.emailCCAddresses != undefined) MiDeliveryData.set("emailCCAddresses", dataTest.emailCCAddresses); else MiDeliveryData.set("emailCCAddresses", null);
    if (dataTest.emailFromAddress != undefined) MiDeliveryData.set("emailFromAddress", dataTest.emailFromAddress); else MiDeliveryData.set("emailFromAddress", null);
    if (dataTest.emailNotes != undefined) MiDeliveryData.set("emailNotes", dataTest.emailNotes); else MiDeliveryData.set("emailNotes", null);
    if (dataTest.deliveryPreference != undefined) MiDeliveryData.set("deliveryPreference", dataTest.deliveryPreference); else MiDeliveryData.set("deliveryPreference", null);
    if (dataTest.emailToAddresses != undefined) MiDeliveryData.set("emailToAddresses", dataTest.emailToAddresses); else MiDeliveryData.set("emailToAddresses", null);
    return MiDeliveryData;
})

Cypress.Commands.add("ValidateMiDeliveryServiceMapping", (userRole, MiDeliveryData, Test_data, EmailAddressUI) => {
    expect(MiDeliveryData.get("channel")).to.equal('DIVE');
    expect(MiDeliveryData.get("emailCCAddresses")).to.equal(Test_data.emailCCAddresses);
    expect(MiDeliveryData.get("emailFromAddress")).to.equal(Test_data.emailFromAddress)
    expect(MiDeliveryData.get("emailNotes")).to.equal(Test_data.emailNotes)
    expect(MiDeliveryData.get("deliveryPreference")).to.equal(Test_data.deliveryPreference)
    if (Test_data.deliveryPreference == 'sftp') {
        // expect(MiDeliveryData.get("emailToAddresses").length > 8).to.equal(false)
        expect(MiDeliveryData.get("emailToAddresses").length).to.equal(0)
    } else if (userRole.toUpperCase().includes('OFFSHORE')) {
        //Email is not stored in DB and can not be validated
    } else {
        let EmailInAudit = MiDeliveryData.get("emailToAddresses")
        cy.log(EmailInAudit)
        expect(EmailInAudit.length).to.equal(EmailAddressUI.length)
        for (let ele in EmailAddressUI) {
            expect(EmailInAudit[ele]).to.equal(EmailAddressUI[ele])
        }
    }
})

Cypress.Commands.add("ValidateMissingDocEmailDeliveryService", (CertNumber, MissingDocData, EmailAddressUI, DocTypesUI, ServicerLoanNumber, originatorLoanNumber) => {
    expect(MissingDocData.get("emailFromAddress")).to.equal('postclosing@archmi.com', "emailFromAddress")
    expect(MissingDocData.get("emailType")).to.equal('Missing Documents for IV', "emailType");
    expect(MissingDocData.get("channel")).to.equal('DIVE', "channel");
    // expect(MissingDocData.get("emailCCAddresses")).to.equal([]);
    expect(MissingDocData.get("certificateNumber")).to.equal(CertNumber, "certificateNumber");
    let EmailInAudit = MissingDocData.get("emailToAddresses")
    expect(EmailInAudit.length).to.equal(EmailAddressUI.length)
    for (let ele in EmailAddressUI) {
        expect(EmailInAudit).to.contain(EmailAddressUI[ele], "Email address")
    }

    let DocTypeInAudit = MissingDocData.get("documents")
    expect(DocTypeInAudit.length).to.equal(DocTypesUI.length)
    for (let ele in DocTypesUI) {
        expect(DocTypeInAudit).to.contain(DocTypesUI[ele], "Missing Doc List")
    }

    expect(MissingDocData.get("servicerLoanNumber")).to.equal(ServicerLoanNumber, "servicerLoanNumber");
    expect(MissingDocData.get("originatorLoanNumber")).to.equal(originatorLoanNumber, "originatorLoanNumber");
})

Cypress.Commands.add("getRequestData_MissingDocsEmailDeliveryServiceImpl", (Cert_info_req) => {
    let dataTest = Cert_info_req.jsonData.map.requestParam1;
    let MissingDocMap = new Map();
    if (dataTest.channel != undefined) MissingDocMap.set("channel", dataTest.channel); else MissingDocMap.set("channel", null);
    if (dataTest.certificateNumber != undefined) MissingDocMap.set("certificateNumber", dataTest.certificateNumber); else MissingDocMap.set("certificateNumber", null);
    if (dataTest.emailFromAddress != undefined) MissingDocMap.set("emailFromAddress", dataTest.emailFromAddress); else MissingDocMap.set("emailFromAddress", null);
    if (dataTest.emailCCAddresses != undefined) MissingDocMap.set("emailCCAddresses", dataTest.emailCCAddresses); else MissingDocMap.set("emailCCAddresses", null);
    if (dataTest.emailToAddresses != undefined) MissingDocMap.set("emailToAddresses", dataTest.emailToAddresses); else MissingDocMap.set("emailToAddresses", null);
    if (dataTest.emailType != undefined) MissingDocMap.set("emailType", dataTest.emailType); else MissingDocMap.set("emailType", null);

    if (dataTest.missingDocumentIv && dataTest.missingDocumentIv.documents != undefined) MissingDocMap.set("documents", dataTest.missingDocumentIv.documents); else MissingDocMap.set("documents", null);
    if (dataTest.missingDocumentIv && dataTest.missingDocumentIv.servicerLoanNumber != undefined) MissingDocMap.set("servicerLoanNumber", dataTest.missingDocumentIv.servicerLoanNumber); else MissingDocMap.set("servicerLoanNumber", null);
    if (dataTest.missingDocumentIv && dataTest.missingDocumentIv.originatorLoanNumber != undefined) MissingDocMap.set("originatorLoanNumber", dataTest.missingDocumentIv.originatorLoanNumber); else MissingDocMap.set("originatorLoanNumber", null);
    return MissingDocMap;
})

Cypress.Commands.add("getBorrowerSuffix", (Code) => {
    switch (Code.toString()) {
        case "1041":
            return "Esq.";
        case "1042":
            return "II";
        case "1043":
            return "III";
        case "1044":
            return "IV";
        case "1045":
            return "Jr.";
        case "1046":
            return "M.D.";
        case "1047":
            return "Ph.D.";
        case "1048":
            return "Sr."
        default:
            return ''
    }
})

Cypress.Commands.add("validate_FUSE_VOE_VOI_Response", (isFailed, TestCollectionRes, EIVResponse) => {
    let ErrorCodeTestData = [];
    let ErrorMessageTestData = [];
    let ErrorCodeEIVResponse = [];
    let ErrorMessageEIVResponse = [];
    if (isFailed) {
        for (ele in TestCollectionRes.status) {
            ErrorCodeTestData.push(TestCollectionRes.status[ele].code);
            ErrorMessageTestData.push(TestCollectionRes.status[ele].description);
        }
        for (ele in EIVResponse.status) {
            ErrorCodeEIVResponse.push(EIVResponse.status[ele].code);
            ErrorMessageEIVResponse.push(EIVResponse.status[ele].description);
        }
        expect(ErrorCodeTestData.length).to.equal(ErrorCodeEIVResponse.length)
        expect(ErrorMessageTestData.length).to.equal(ErrorMessageEIVResponse.length)
        for (ele in ErrorCodeTestData) expect(ErrorCodeTestData[ele]).to.equal(ErrorCodeEIVResponse[ele])
        for (ele in ErrorMessageTestData) expect(ErrorMessageTestData[ele]).to.equal(ErrorMessageEIVResponse[ele])
    } else {
        expect(TestCollectionRes.transactionId).to.equal(EIVResponse.transactionId)
        expect(TestCollectionRes.responseId).to.equal(EIVResponse.responseId)
        expect(TestCollectionRes.emgOrderNumber).to.equal(EIVResponse.emgOrderNumber)
        expect(TestCollectionRes.reportType).to.equal(EIVResponse.reportType)
        expect(TestCollectionRes.reportTypeOtherDescription).to.equal(EIVResponse.reportTypeOtherDescription)
        expect(TestCollectionRes.borrower.firstName).to.equal(EIVResponse.borrower.firstName)
        expect(TestCollectionRes.borrower.lastName).to.equal(EIVResponse.borrower.lastName)
    }
    expect(EIVResponse.toString()).to.equal(TestCollectionRes.toString())
})

Cypress.Commands.add("getAuDecision", (loanUwm) => {
    const activeDuRecommendations = ['APPROVE/ELIGIBLE', 'APPROVE/INELIGIBLE', 'OUT OF SCOPE', 'REFER WITH CAUTION'];
    const activeLPARiskClass = ['ACCEPT', 'CAUTION'];
    const activeLPAPurchaseEligibility = ['ELIGIBLE', 'INELIGIBLE'];
    const duRecommendationUwValue = get(['duRecommendation', 'uwValue'], loanUwm);
    const lpRiskClassUwValue = get(['lpRiskClass', 'uwValue'], loanUwm);
    const lpPurchaseEligibilityUwValue = get(['lpPurchaseEligibility', 'uwValue'], loanUwm);
    const duRecommendation = duRecommendationUwValue && activeDuRecommendations.some(a => a === duRecommendationUwValue.toUpperCase()) ? duRecommendationUwValue : null;
    const lpRiskClass = lpRiskClassUwValue && activeLPARiskClass.some(a => a === lpRiskClassUwValue.toUpperCase()) ? lpRiskClassUwValue : null;
    const lpPurchaseEligibility = lpPurchaseEligibilityUwValue && activeLPAPurchaseEligibility.some(a => a === lpPurchaseEligibilityUwValue.toUpperCase()) ? lpPurchaseEligibilityUwValue : null;
    const auDecision = cy.calculateDecision(duRecommendation, lpRiskClass, lpPurchaseEligibility);
    return auDecision;
})

Cypress.Commands.add("calculateDecision", (duRecommendation, lpRiskClass, lpPurchaseEligibility,) => {
    //   public static calculateDecision(duRecommendation: string, lpRiskClass: string, lpPurchaseEligibility: string): string {
    let auDecision = 'No AU System';
    if (!(duRecommendation && lpRiskClass && lpPurchaseEligibility)) {
        auDecision = 'No AU System';
    }
    if (lpRiskClass && lpPurchaseEligibility && duRecommendation) {
        const decision = cy.getDUOrLPADecision(duRecommendation, lpRiskClass, lpPurchaseEligibility);
        auDecision = cy.getDecisionWithDuAndLpaPresent(decision, auDecision, duRecommendation, lpRiskClass, lpPurchaseEligibility);
    } else if (duRecommendation) {
        auDecision = 'DU: ' + duRecommendation;
    } else if (lpRiskClass && lpPurchaseEligibility) {
        auDecision = `LPA: ${lpRiskClass}/${lpPurchaseEligibility}`;
    }
    return auDecision.toUpperCase();
})

Cypress.Commands.add("getDUOrLPADecision", (duRecommendation, lpRiskClass, lpPurchaseEligibility,) => {
    //   public static getDUOrLPADecision(duRecommendation: string, lpRiskClass: string, lpPurchaseEligibility: string): string {
    const auDecisionMap = new Map();
    auDecisionMap.set('APPROVE/INELIGIBLE', ['ACCEPT/INELIGIBLE']);
    let decision = 'LPA';
    if (duRecommendation.toUpperCase() === 'APPROVE/ELIGIBLE') {
        decision = 'DU';
    } else if (lpRiskClass.toUpperCase() === 'CAUTION' && lpPurchaseEligibility.toUpperCase() === 'INELIGIBLE') {
        decision = 'DU';
    } else {
        auDecisionMap.forEach((value, key) => {
            if (key === duRecommendation.toUpperCase()) {
                if (value.indexOf(`${lpRiskClass.toUpperCase()}/${lpPurchaseEligibility.toUpperCase()}`) > -1) {
                    decision = 'DU';
                }
            }
        });
    }
    return decision;
})

Cypress.Commands.add("getDecisionWithDuAndLpaPresent", (decision, auDecision, duRecommendation, lpRiskClass, lpPurchaseEligibility,) => {
    //   private static getDecisionWithDuAndLpaPresent(decision: string, auDecision: string, duRecommendation: string, lpRiskClass: string, lpPurchaseEligibility: string) {
    if (decision) {
        if (decision === 'DU') {
            auDecision = 'DU: ' + duRecommendation;
        } else if (decision === 'LPA') {
            auDecision = `LPA: ${lpRiskClass}/${lpPurchaseEligibility}`;
        }
    }
    return auDecision;
})

Cypress.Commands.add("getCurrentDirectedAlerts", (UWMData) => {
    // let basisOfDec = UWMData.decisions.basisOfSegmentDecision.uwValue; basisOfDec = basisOfDec.toString();
    // let segmentMsgs = UWMData.segmentDetails.messages;

    let basisOfDec = null;
    let segmentMsgs
    if (UWMData.decisions && UWMData.decisions.basisOfSegmentDecision && UWMData.decisions.basisOfSegmentDecision.uwValue)
        basisOfDec = UWMData.decisions.basisOfSegmentDecision.uwValue;
    if (basisOfDec != null) {

        let segmentDetails = UWMData.segmentDetails.messages
        segmentMsgs = segmentDetails.filter(function (msg) {
            return msg.ruleType == basisOfDec && msg.severity === 30 && msg.displayIndicator === true
        })
    }
    let ListText = [];
    let ListCat = [];
    let listReason = [];
    let listComment = [];
    let listIsCleared = []
    for (let i = 0; i < segmentMsgs.length; i++) {
        ListText.push(segmentMsgs[i].messageText)
        ListCat.push(segmentMsgs[i].category)
        listReason.push(segmentMsgs[i].reason)
        listComment.push(segmentMsgs[i].comments)
        listIsCleared.push(segmentMsgs[i].isClearedByUser)

    }
    return [ListText, ListCat, listReason, listComment, listIsCleared]
})

//validateSecondlevelTargetedReviewEligibilityData
Cypress.Commands.add("validateSecondlevelTargetedReviewEligibilityData", (cert_number, Cert_info_Req, userName) => {
    let dataTest = Cert_info_Req.jsonData.map.requestParam1;
    expect(dataTest.certificateNumber).to.equal(cert_number, "Distribution call-CertificateNumber")
    expect(dataTest.userId).to.equal(userName, "Distribution call-Username")
})

Cypress.Commands.add('getCaseTabAction', (userRole, inbasketName) => {
    let action = Actions[userRole];
    let dropdonwnval = []
    cy.getBasketName(userRole, inbasketName).then((basketName) => {
        dropdonwnval = action[basketName].ActionDropDown;
    }).then(() => {
        return dropdonwnval;
    })
})

Cypress.Commands.add('getCaseTabAction_copy', (userRole, inbasketName) => {
    let ActionOption = [];
    switch (userRole) {
        case "SuperUser":
            switch (inbasketName) {
                case "Commitment Status":
                    ActionOption = Actions.SuperUser.CommitmentStatus.ActionDropDown;
                    break;
                case "Chase Download":
                    ActionOption = Actions.SuperUser.ChaseDownload.ActionDropDown;
                    break;
                case "Delegated":
                    ActionOption = Actions.SuperUser.Delegated.ActionDropDown;
                    break;
                case "Delegated Directed":
                    ActionOption = Actions.SuperUser.DelegatedDirected.ActionDropDown;
                    break;
                case "Delegated Post Close Only":
                    ActionOption = Actions.SuperUser.DelegatedPostCloseOnly.ActionDropDown;
                    break;
                case "Second Level Review":
                    ActionOption = Actions.SuperUser.SecondLevelReview.ActionDropDown;
                    break;
                case "Missing Documents":
                    ActionOption = Actions.SuperUser.MissingDocuments.ActionDropDown;
                    break;
                case "Missing Documents Received":
                    ActionOption = Actions.SuperUser.MissingDocumentsReceived.ActionDropDown;
                    break;
                case "VOE Pending Order":
                    ActionOption = Actions.SuperUser.VOEPendingOrder.ActionDropDown;
                    break;
                case "VOE Pending Follow-Up":
                    ActionOption = Actions.SuperUser.VOEPendingFollowUp.ActionDropDown;
                    break;
                case "Chase VOE Pending Order":
                    ActionOption = Actions.SuperUser.ChaseVOEPendingOrder.ActionDropDown;
                    break;
                case "Chase VOE Pending Follow-Up":
                    ActionOption = Actions.SuperUser.ChaseVOEPendingFollowUp.ActionDropDown;
                    break;
                case "Manager Review":
                    ActionOption = Actions.SuperUser.ManagerReview.ActionDropDown;
                    break;
                case "QC":
                    ActionOption = Actions.SuperUser.QC.ActionDropDown;
                    break;
                case "Enhanced":
                    ActionOption = Actions.SuperUser.Enhanced.ActionDropDown;
                    break;
                case "Non-Delegated":
                    ActionOption = Actions.SuperUser.NonDelegated.ActionDropDown;
                    break;
                case "Pending Enhanced":
                    ActionOption = Actions.SuperUser.PendingEnhanced.ActionDropDown;
                    break;
                case "Chase Pending":
                    ActionOption = Actions.SuperUser.ChasePending.ActionDropDown;
                    break;
                case "Chase Download Completed":
                    ActionOption = Actions.SuperUser.ChaseDownloadCompleted.ActionDropDown;
                    break;
                case "Completed":
                    ActionOption = Actions.SuperUser.Completed.ActionDropDown;
                    break;
                case "VOE Completed":
                    ActionOption = Actions.SuperUser.VOECompleted.ActionDropDown;
                    break;
                case "VOE Lack of Documents":
                    ActionOption = Actions.SuperUser.VOELackOfDocument.ActionDropDown;
                    break;
            }
            break;
        case "Arch_Onshore_Manager":
            switch (inbasketName) {
                case "Commitment Status":
                    ActionOption = Actions.Arch_Onshore_Manager.CommitmentStatus.ActionDropDown;
                    break;
                case "Chase Download":
                    ActionOption = Actions.Arch_Onshore_Manager.ChaseDownload.ActionDropDown;
                    break;
                case "Delegated":
                    ActionOption = Actions.Arch_Onshore_Manager.Delegated.ActionDropDown;
                    break;
                case "Delegated Directed":
                    ActionOption = Actions.Arch_Onshore_Manager.DelegatedDirected.ActionDropDown;
                    break;
                case "Delegated Post Close Only":
                    ActionOption = Actions.Arch_Onshore_Manager.DelegatedPostCloseOnly.ActionDropDown;
                    break;
                case "Second Level Review":
                    ActionOption = Actions.Arch_Onshore_Manager.SecondLevelReview.ActionDropDown;
                    break;
                case "Missing Documents":
                    ActionOption = Actions.Arch_Onshore_Manager.MissingDocuments.ActionDropDown;
                    break;
                case "Missing Documents Received":
                    ActionOption = Actions.Arch_Onshore_Manager.MissingDocumentsReceived.ActionDropDown;
                    break;
                case "Chase VOE Pending Order":
                    ActionOption = Actions.Arch_Onshore_Manager.ChaseVOEPendingOrder.ActionDropDown;
                    break;
                case "Chase VOE Pending Follow-Up":
                    ActionOption = Actions.Arch_Onshore_Manager.ChaseVOEPendingFollowUp.ActionDropDown;
                    break;
                case "VOE Pending Order":
                    ActionOption = Actions.Arch_Onshore_Manager.VOEPendingOrder.ActionDropDown;
                    break;
                case "VOE Pending Follow-Up":
                    ActionOption = Actions.Arch_Onshore_Manager.VOEPendingFollowUp.ActionDropDown;
                    break
                case "Manager Review":
                    ActionOption = Actions.Arch_Onshore_Manager.ManagerReview.ActionDropDown;
                    break;
                case "QC":
                    ActionOption = Actions.Arch_Onshore_Manager.QC.ActionDropDown;
                    break;
                case "Enhanced":
                    ActionOption = Actions.Arch_Onshore_Manager.Enhanced.ActionDropDown;
                    break;
                case "Non-Delegated":
                    ActionOption = Actions.Arch_Onshore_Manager.NonDelegated.ActionDropDown;
                    break;
                case "Pending Enhanced":
                    ActionOption = Actions.Arch_Onshore_Manager.PendingEnhanced.ActionDropDown;
                    break;
                case "Chase Pending":
                    ActionOption = Actions.Arch_Onshore_Manager.ChasePending.ActionDropDown;
                    break;
                case "Chase Download Completed":
                    ActionOption = Actions.Arch_Onshore_Manager.ChaseDownloadCompleted.ActionDropDown;
                    break;
                case "Completed":
                    ActionOption = Actions.Arch_Onshore_Manager.Completed.ActionDropDown;
                    break;
                case "VOE Completed":
                    ActionOption = Actions.Arch_Onshore_Manager.VOECompleted.ActionDropDown;
                    break;
                case "VOE Lack of Documents":
                    ActionOption = Actions.Arch_Onshore_Manager.VOELackOfDocument.ActionDropDown;
                    break;
            }
            break;
        case "Arch_Onshore_User":
            switch (inbasketName) {
                // case "Commitment Status" :  ActionOption=Actions.Arch_Onshore_User.CommitmentStatus.ActionDropDown;    break;
                case "Chase Download":
                    ActionOption = Actions.Arch_Onshore_User.ChaseDownload.ActionDropDown;
                    break;
                case "Delegated":
                    ActionOption = Actions.Arch_Onshore_User.Delegated.ActionDropDown;
                    break;
                case "Delegated Post Close Only":
                    ActionOption = Actions.Arch_Onshore_User.DelegatedPostCloseOnly.ActionDropDown;
                    break;
                case "Delegated Directed":
                    ActionOption = Actions.Arch_Onshore_User.DelegatedDirected.ActionDropDown;
                    break;
                case "Second Level Review":
                    ActionOption = Actions.Arch_Onshore_User.SecondLevelReview.ActionDropDown;
                    break;
                case "Missing Documents":
                    ActionOption = Actions.Arch_Onshore_User.MissingDocuments.ActionDropDown;
                    break;
                case "Missing Documents Received":
                    ActionOption = Actions.Arch_Onshore_User.MissingDocumentsReceived.ActionDropDown;
                    break;
                case "Chase VOE Pending Order":
                    ActionOption = Actions.Arch_Onshore_User.ChaseVOEPendingOrder.ActionDropDown;
                    break;
                case "Chase VOE Pending Follow-Up":
                    ActionOption = Actions.Arch_Onshore_User.ChaseVOEPendingFollowUp.ActionDropDown;
                    break;
                case "VOE Pending Order":
                    ActionOption = Actions.Arch_Onshore_User.VOEPendingOrder.ActionDropDown;
                    break;
                case "VOE Pending Follow-Up":
                    ActionOption = Actions.Arch_Onshore_User.VOEPendingFollowUp.ActionDropDown;
                    break
                case "Manager Review":
                    ActionOption = Actions.Arch_Onshore_User.ManagerReview.ActionDropDown;
                    break;
                case "Pending Enhanced":
                    ActionOption = Actions.Arch_Onshore_User.PendingEnhanced.ActionDropDown;
                    break;
                case "Enhanced":
                    ActionOption = Actions.Arch_Onshore_User.Enhanced.ActionDropDown;
                    break;
                case "Non-Delegated":
                    ActionOption = Actions.Arch_Onshore_User.NonDelegated.ActionDropDown;
                    break;
                case "Chase Pending":
                    ActionOption = Actions.Arch_Onshore_User.ChasePending.ActionDropDown;
                    break;
                case "Chase Download Completed":
                    ActionOption = Actions.Arch_Onshore_User.ChaseDownloadCompleted.ActionDropDown;
                    break;
                case "Completed":
                    ActionOption = Actions.Arch_Onshore_User.Completed.ActionDropDown;
                    break;
                case "VOE Completed":
                    ActionOption = Actions.Arch_Onshore_User.VOECompleted.ActionDropDown;
                    break;
                case "VOE Lack of Documents":
                    ActionOption = Actions.Arch_Onshore_User.VOELackOfDocument.ActionDropDown;
                    break;
            }
            break;
        case "Accenture_Offshore_User":
            switch (inbasketName) {
                case "Delegated":
                    ActionOption = Actions.Accenture_Offshore_User.Delegated.ActionDropDown;
                    break;
                case "Delegated Directed":
                    ActionOption = Actions.Accenture_Offshore_User.DelegatedDirected.ActionDropDown;
                    break;
                case "Delegated Post Close Only":
                    ActionOption = Actions.Accenture_Offshore_User.DelegatedPostCloseOnly.ActionDropDown;
                    break;
                case "Commitment Status":
                    ActionOption = Actions.Accenture_Offshore_User.CommitmentStatus.ActionDropDown;
                    break;
                case "Chase Download":
                    ActionOption = Actions.Accenture_Offshore_User.ChaseDownload.ActionDropDown;
                    break;
                case "Second Level Review":
                    ActionOption = Actions.Accenture_Offshore_User.SecondLevelReview.ActionDropDown;
                    break;
                case "Missing Documents":
                    ActionOption = Actions.Accenture_Offshore_User.MissingDocuments.ActionDropDown;
                    break;
                case "Missing Documents Received":
                    ActionOption = Actions.Accenture_Offshore_User.MissingDocumentsReceived.ActionDropDown;
                    break;
                case "Chase VOE Pending Order":
                    ActionOption = Actions.Accenture_Offshore_User.ChaseVOEPendingOrder.ActionDropDown;
                    break;
                case "Chase VOE Pending Follow-Up":
                    ActionOption = Actions.Accenture_Offshore_User.ChaseVOEPendingFollowUp.ActionDropDown;
                    break;
                case "VOE Pending Order":
                    ActionOption = Actions.Accenture_Offshore_User.VOEPendingOrder.ActionDropDown;
                    break;
                case "VOE Pending Follow-Up":
                    ActionOption = Actions.Accenture_Offshore_User.VOEPendingFollowUp.ActionDropDown;
                    break
                case "Manager Review":
                    ActionOption = Actions.Accenture_Offshore_User.ManagerReview.ActionDropDown;
                    break;
                case "QC":
                    ActionOption = Actions.Accenture_Offshore_User.QC.ActionDropDown;
                    break;
                case "Enhanced":
                    ActionOption = Actions.Accenture_Offshore_User.Enhanced.ActionDropDown;
                    break;
                case "Non-Delegated":
                    ActionOption = Actions.Accenture_Offshore_User.NonDelegated.ActionDropDown;
                    break;
                case "Pending Enhanced":
                    ActionOption = Actions.Accenture_Offshore_User.PendingEnhanced.ActionDropDown;
                    break;
                case "Chase Pending":
                    ActionOption = Actions.Accenture_Offshore_User.ChasePending.ActionDropDown;
                    break;
                case "Chase Download Completed":
                    ActionOption = Actions.Accenture_Offshore_User.ChaseDownloadCompleted.ActionDropDown;
                    break;
                case "Completed":
                    ActionOption = Actions.Accenture_Offshore_User.Completed.ActionDropDown;
                    break;
                case "VOE Completed":
                    ActionOption = Actions.Accenture_Offshore_User.VOECompleted.ActionDropDown;
                    break;
                case "VOE Lack of Documents":
                    ActionOption = Actions.Accenture_Offshore_User.VOELackOfDocument.ActionDropDown;
                    break;
                case "Manager Registration Review":
                    ActionOption = Actions.Accenture_Offshore_User.ManagerRegistrationReview.ActionDropDown;
                    break;
                case "Registration":
                    ActionOption = Actions.Accenture_Offshore_User.Registration.ActionDropDown;
                    break;
                case "IT&S":
                    ActionOption = Actions.Accenture_Offshore_User.ITS.ActionDropDown;
                    break;
            }
            ;
            break;
        case "Sutherland_Offshore_User":
            switch (inbasketName) {
                case "Delegated":
                    ActionOption = Actions.Sutherland_Offshore_User.Delegated.ActionDropDown;
                    break;
                case "Delegated Directed":
                    ActionOption = Actions.Sutherland_Offshore_User.DelegatedDirected.ActionDropDown;
                    break;
                case "Delegated Post Close Only":
                    ActionOption = Actions.Sutherland_Offshore_User.DelegatedPostCloseOnly.ActionDropDown;
                    break;
                case "Commitment Status":
                    ActionOption = Actions.Sutherland_Offshore_User.CommitmentStatus.ActionDropDown;
                    break;
                case "Chase Download":
                    ActionOption = Actions.Sutherland_Offshore_User.ChaseDownload.ActionDropDown;
                    break;
                case "Second Level Review":
                    ActionOption = Actions.Sutherland_Offshore_User.SecondLevelReview.ActionDropDown;
                    break;
                case "Missing Documents":
                    ActionOption = Actions.Sutherland_Offshore_User.MissingDocuments.ActionDropDown;
                    break;
                case "Missing Documents Received":
                    ActionOption = Actions.Sutherland_Offshore_User.MissingDocumentsReceived.ActionDropDown;
                    break;
                case "Chase VOE Pending Order":
                    ActionOption = Actions.Sutherland_Offshore_User.ChaseVOEPendingOrder.ActionDropDown;
                    break;
                case "Chase VOE Pending Follow-Up":
                    ActionOption = Actions.Sutherland_Offshore_User.ChaseVOEPendingFollowUp.ActionDropDown;
                    break;
                case "VOE Pending Order":
                    ActionOption = Actions.Sutherland_Offshore_User.VOEPendingOrder.ActionDropDown;
                    break;
                case "VOE Pending Follow-Up":
                    ActionOption = Actions.Sutherland_Offshore_User.VOEPendingFollowUp.ActionDropDown;
                    break
                case "Manager Review":
                    ActionOption = Actions.Sutherland_Offshore_User.ManagerReview.ActionDropDown;
                    break;
                case "QC":
                    ActionOption = Actions.Sutherland_Offshore_User.QC.ActionDropDown;
                    break;
                case "Enhanced":
                    ActionOption = Actions.Sutherland_Offshore_User.Enhanced.ActionDropDown;
                    break;
                case "Non-Delegated":
                    ActionOption = Actions.Sutherland_Offshore_User.NonDelegated.ActionDropDown;
                    break;
                case "Pending Enhanced":
                    ActionOption = Actions.Sutherland_Offshore_User.PendingEnhanced.ActionDropDown;
                    break;
                case "Chase Pending":
                    ActionOption = Actions.Sutherland_Offshore_User.ChasePending.ActionDropDown;
                    break;
                case "Chase Download Completed":
                    ActionOption = Actions.Sutherland_Offshore_User.ChaseDownloadCompleted.ActionDropDown;
                    break;
                case "Completed":
                    ActionOption = Actions.Sutherland_Offshore_User.Completed.ActionDropDown;
                    break;
                case "VOE Completed":
                    ActionOption = Actions.Sutherland_Offshore_User.VOECompleted.ActionDropDown;
                    break;
                case "VOE Lack of Documents":
                    ActionOption = Actions.Sutherland_Offshore_User.VOELackOfDocument.ActionDropDown;
                    break;
                case "Manager Registration Review":
                    ActionOption = Actions.Sutherland_Offshore_User.ManagerRegistrationReview.ActionDropDown;
                    break;
                case "Registration":
                    ActionOption = Actions.Sutherland_Offshore_User.Registration.ActionDropDown;
                    break;
                case "IT&S":
                    ActionOption = Actions.Sutherland_Offshore_User.ITS.ActionDropDown;
                    break;
            }
            ;
            break;
        case "ArchCap_Offshore_User":
            switch (inbasketName) {
                case "Delegated":
                    ActionOption = Actions.ArchCap_Offshore_User.Delegated.ActionDropDown;
                    break;
                case "Delegated Directed":
                    ActionOption = Actions.ArchCap_Offshore_User.DelegatedDirected.ActionDropDown;
                    break;
                case "Delegated Post Close Only":
                    ActionOption = Actions.ArchCap_Offshore_User.DelegatedPostCloseOnly.ActionDropDown;
                    break;
                case "Commitment Status":
                    ActionOption = Actions.ArchCap_Offshore_User.CommitmentStatus.ActionDropDown;
                    break;
                case "Chase Download":
                    ActionOption = Actions.ArchCap_Offshore_User.ChaseDownload.ActionDropDown;
                    break;
                case "Second Level Review":
                    ActionOption = Actions.ArchCap_Offshore_User.SecondLevelReview.ActionDropDown;
                    break;
                case "Missing Documents":
                    ActionOption = Actions.ArchCap_Offshore_User.MissingDocuments.ActionDropDown;
                    break;
                case "Missing Documents Received":
                    ActionOption = Actions.ArchCap_Offshore_User.MissingDocumentsReceived.ActionDropDown;
                    break;
                case "Chase VOE Pending Order":
                    ActionOption = Actions.ArchCap_Offshore_User.ChaseVOEPendingOrder.ActionDropDown;
                    break;
                case "Chase VOE Pending Follow-Up":
                    ActionOption = Actions.ArchCap_Offshore_User.ChaseVOEPendingFollowUp.ActionDropDown;
                    break;
                case "VOE Pending Order":
                    ActionOption = Actions.ArchCap_Offshore_User.VOEPendingOrder.ActionDropDown;
                    break;
                case "VOE Pending Follow-Up":
                    ActionOption = Actions.ArchCap_Offshore_User.VOEPendingFollowUp.ActionDropDown;
                    break
                case "Manager Review":
                    ActionOption = Actions.ArchCap_Offshore_User.ManagerReview.ActionDropDown;
                    break;
                case "QC":
                    ActionOption = Actions.ArchCap_Offshore_User.QC.ActionDropDown;
                    break;
                case "Enhanced":
                    ActionOption = Actions.ArchCap_Offshore_User.Enhanced.ActionDropDown;
                    break;
                case "Non-Delegated":
                    ActionOption = Actions.ArchCap_Offshore_User.NonDelegated.ActionDropDown;
                    break;
                case "Pending Enhanced":
                    ActionOption = Actions.ArchCap_Offshore_User.PendingEnhanced.ActionDropDown;
                    break;
                case "Chase Pending":
                    ActionOption = Actions.ArchCap_Offshore_User.ChasePending.ActionDropDown;
                    break;
                case "Chase Download Completed":
                    ActionOption = Actions.ArchCap_Offshore_User.ChaseDownloadCompleted.ActionDropDown;
                    break;
                case "Completed":
                    ActionOption = Actions.ArchCap_Offshore_User.Completed.ActionDropDown;
                    break;
                case "VOE Completed":
                    ActionOption = Actions.ArchCap_Offshore_User.VOECompleted.ActionDropDown;
                    break;
                case "VOE Lack of Documents":
                    ActionOption = Actions.ArchCap_Offshore_User.VOELackOfDocument.ActionDropDown;
                    break;
                case "Manager Registration Review":
                    ActionOption = Actions.ArchCap_Offshore_User.ManagerRegistrationReview.ActionDropDown;
                    break;
                case "Registration":
                    ActionOption = Actions.ArchCap_Offshore_User.Registration.ActionDropDown;
                    break;
                case "IT&S":
                    ActionOption = Actions.ArchCap_Offshore_User.ITS.ActionDropDown;
                    break;
            }
            ;
            break;
        case "QC_User":
            switch (inbasketName) {
                case "Delegated":
                    ActionOption = Actions.QC_User.Delegated.ActionDropDown;
                    break;
                case "Delegated Directed":
                    ActionOption = Actions.QC_User.DelegatedDirected.ActionDropDown;
                    break;
                case "Delegated Post Close Only":
                    ActionOption = Actions.QC_User.DelegatedPostCloseOnly.ActionDropDown;
                    break;
                case "Commitment Status":
                    ActionOption = Actions.QC_User.CommitmentStatus.ActionDropDown;
                    break;
                case "Chase Download":
                    ActionOption = Actions.QC_User.ChaseDownload.ActionDropDown;
                    break;
                case "Second Level Review":
                    ActionOption = Actions.QC_User.SecondLevelReview.ActionDropDown;
                    break;
                case "Missing Documents":
                    ActionOption = Actions.QC_User.MissingDocuments.ActionDropDown;
                    break;
                case "Missing Documents Received":
                    ActionOption = Actions.QC_User.MissingDocumentsReceived.ActionDropDown;
                    break;
                case "Chase VOE Pending Order":
                    ActionOption = Actions.QC_User.ChaseVOEPendingOrder.ActionDropDown;
                    break;
                case "Chase VOE Pending Follow-Up":
                    ActionOption = Actions.QC_User.ChaseVOEPendingFollowUp.ActionDropDown;
                    break;
                case "VOE Pending Order":
                    ActionOption = Actions.QC_User.VOEPendingOrder.ActionDropDown;
                    break;
                case "VOE Pending Follow-Up":
                    ActionOption = Actions.QC_User.VOEPendingFollowUp.ActionDropDown;
                    break
                case "Manager Review":
                    ActionOption = Actions.QC_User.ManagerReview.ActionDropDown;
                    break;
                case "QC":
                    ActionOption = Actions.QC_User.QC.ActionDropDown;
                    break;
                case "Enhanced":
                    ActionOption = Actions.QC_User.Enhanced.ActionDropDown;
                    break;
                case "Non-Delegated":
                    ActionOption = Actions.QC_User.NonDelegated.ActionDropDown;
                    break;
                case "Pending Enhanced":
                    ActionOption = Actions.QC_User.PendingEnhanced.ActionDropDown;
                    break;
                case "Chase Pending":
                    ActionOption = Actions.QC_User.ChasePending.ActionDropDown;
                    break;
                case "Chase Download Completed":
                    ActionOption = Actions.QC_User.ChaseDownloadCompleted.ActionDropDown;
                    break;
                case "Completed":
                    ActionOption = Actions.QC_User.Completed.ActionDropDown;
                    break;
                case "VOE Completed":
                    ActionOption = Actions.QC_User.VOECompleted.ActionDropDown;
                    break;
                case "VOE Lack of Documents":
                    ActionOption = Actions.QC_User.VOELackOfDocument.ActionDropDown;
                    break;
                case "Manager Registration Review":
                    ActionOption = Actions.QC_User.ManagerRegistrationReview.ActionDropDown;
                    break;
                case "Registration":
                    ActionOption = Actions.QC_User.Registration.ActionDropDown;
                    break;
                case "IT&S":
                    ActionOption = Actions.QC_User.ITS.ActionDropDown;
                    break;
            }
            ;
            break;
        default:
    }
    return ActionOption;
})

Cypress.Commands.add('getColumnHeading_SortPriority', (userRole, inbasketName) => {
    let columnHeading = [];
    let sortByPrimaryTD = '';
    let sortBySecondaryTD = ''
    cy.getBasketName(userRole, inbasketName).then((basketName) => {
        sortByPrimaryTD = ExpectedLabels.DashBoardColumn[basketName].sortByPrimary
        columnHeading = ExpectedLabels.DashBoardColumn[basketName].column
        sortBySecondaryTD = ExpectedLabels.DashBoardColumn[basketName].sortBySecondary
    }).then(() => {
        return [columnHeading, sortByPrimaryTD, sortBySecondaryTD]
    })
})

Cypress.Commands.add('getBasketName', (userRole, baksetName) => {
    switch (baksetName) {
        case "Commitment Status":
            return "CommitmentStatus";
        case "Chase Download":
            return "ChaseDownload";
        case "Delegated":
            return "Delegated"
        case "Delegated Directed":
            return "DelegatedDirected"
        case "Delegated Post Close Only":
            return "DelegatedPostCloseOnly"
        case "Second Level Review":
            return "SecondLevelReview"
        case "Non-Delegated":
            return "NonDelegated"
        case "SIU":
            return "SIU"
        case "Missing Documents":
            return "MissingDocuments"
        case "Missing Documents Received":
            return "MissingDocumentsReceived"
        case "VOE Pending Order":
            return "VOEPendingOrder"
        case "VOE Pending Follow-Up":
            return "VOEPendingFollowUp"
        case "Chase VOE Pending Order":
            return "ChaseVOEPendingOrder"
        case "Chase VOE Pending Follow-Up":
            return "ChaseVOEPendingFollowUp"
        case "Manager Review":
            return "ManagerReview"
        case "QC":
            return "QC"
        case "Enhanced":
            return "Enhanced"
        case "Pending Enhanced":
            return "PendingEnhanced"
        case "Chase Pending":
            return "ChasePending"
        case "Chase Download Completed":
            return "ChaseDownloadCompleted"
        case "Completed":
            return "Completed"
        case "VOE Completed":
            return "VOECompleted"
        case "VOE Lack of Documents":
            return "VOELackOfDocument"
        case "IT&S":
            return "ITS"
        case  "Registration":
            return "Registration"
        case "Manager Registration Review":
            return "ManagerRegistrationReview"
    }
})

Cypress.Commands.add("getRequestData_EmailServiceImpl", (Cert_info_req) => {
    let dataTest = Cert_info_req.jsonData.map.requestParam1;
    let MissingDocMap = new Map();
    if (dataTest.to != undefined) MissingDocMap.set("to", dataTest.to); else MissingDocMap.set("to", null);
    if (dataTest.from != undefined) MissingDocMap.set("from", dataTest.from); else MissingDocMap.set("from", null);
    if (dataTest.subject != undefined) MissingDocMap.set("subject", dataTest.subject); else MissingDocMap.set("subject", null);
    if (dataTest.emailText != undefined) MissingDocMap.set("emailText", dataTest.emailText); else MissingDocMap.set("emailText", null);

    return MissingDocMap;
})

Cypress.Commands.add("ValidateEmailServiceImpl_returnCertList", (EmailServiceData) => {
    expect(EmailServiceData.get("to")).to.deep.equal(["support_aqua_qa@archmi.com"], "to")
    expect(EmailServiceData.get("from")).to.equal('support_aqua_qa@archmi.com', "from");
    expect(EmailServiceData.get("subject")).to.contains('Chase Download Completed Loans Awaiting Documents From FileNet', "subject");
    expect(EmailServiceData.get("emailText")).to.contains('Chase download completed loans awaiting FileNet documents are', "emailText");
    let emailText = EmailServiceData.get("emailText").split(" loans awaiting FileNet documents are")[1]
    emailText = emailText.split(".<br/><br/>")[0].trim().replace('[', '').replace(']', '').replaceAll(' ', '');
    let CertList1 = []
    CertList1 = emailText.trim().toString().split(",")
    return CertList1;
})

Cypress.Commands.add('getUserName', (emp) => {
    switch (emp) {
        case "Accenture":
            return ["svc-dive-accen-user", "svc-dive-accenture-user"]
        case "Sutherland":
            return ["svc-dive-suther-user", "svc-dive-sutherland-user"]
        case "ArchCap":
            return ["svc-dive-archc-user", "svc-dive-archcap-user"]
        case "Arch":
            return ["svc-dive-arch-user", "svc-dive-arch-user"]
        case "QC":
            return ["svc-dive-qc-user", "svc-dive-qc-user"]
        default:
            return ["svc-dive-arch-mgr", "svc-dive-arch-manager"]
    }
})

Cypress.Commands.add('getCaseTabAction_superUser', (userRole, inbasketName) => {
    let action = Actions[userRole];
    let dropdonwnval = []
    cy.getBasketName(userRole, inbasketName).then((basketName) => {
        dropdonwnval = action[basketName].ActionDropDown_withoutRoute;
    }).then(() => {
        return dropdonwnval;
    })
})

Cypress.Commands.add('ValidateDateTime', (UITime, DBTime, FieldName) => {
    console.log("DBTime  ", DBTime);
    if (moment(DBTime, 'MM/DD/YYYY', true).isValid()) {
        console.log("TestData Date")
        expect(new Date(new Date(UITime).setHours(0, 0)).toLocaleDateString()).to.equal(new Date(new Date(DBTime).setHours(0, 0)).toLocaleDateString(), "DateTime validation for field " + FieldName)
    } else {
        console.log("DB Date")
        if (DBTime == null || DBTime == undefined || DBTime == '') {
            expect(DBTime == null || DBTime == undefined || DBTime == '').to.equal(true, "DateTime validation for field " + FieldName)
        } else {
            let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
            if (timeZone.includes("America/New_York")) {
                console.log("America")
                let time1 = new Date(new Date(DBTime).setHours(0, 0))
                let result = time1.setDate(time1.getDate() + 1)
                expect(new Date(new Date(UITime).setHours(0, 0)).toLocaleDateString()).to.equal(new Date(result).toLocaleDateString(), "DateTime validation for field :" + FieldName)
            } else {
                expect(new Date(new Date(UITime).setHours(0, 0)).toLocaleDateString()).to.equal(new Date(new Date(DBTime).setHours(0, 0)).toLocaleDateString(), "DateTime validation for field :" + FieldName)
            }
        }
    }
});
