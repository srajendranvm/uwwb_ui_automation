/// <reference types="cypress" />

import moment from "moment";
import "cypress-file-upload";
import promisify from "cypress-promise";

var TestData = require('../fixtures/testData/TestData.json');

const _ = Cypress._;

//Dashboard Page Object Reference
var inbasket = '[id="inbasketTabs"] [class="stats-desc"]';
var pendingcount = '#pendingLength';
var issuedcount = '#issuedLength';
var pendingAccordion = "#pendingAccordion"
var issuedAccordion = '#issuedAccordion';
var completedList = '#completeAccordion';
let ele_accordion = '#work-item-accordion';
let ele_completedCountInBasketName = '[id="basketTabs"] [class*="selected-basket"] [class*="stats-completed"]';
var completeCountlength = '#completeLength';
let ele_assignedToMe = '#assignedAccordion';
let ele_tabPanel = '[role="tabpanel"]';

var completeGrid = '#completeAccordion tr';
var completeList = '#completeLength';
var assignedToMe = '#assignedLength';
var expandFilter = '.customButtonFilterClosed.showFilter.ng-star-inserted';
var createdDateFilter = '#filter_edms';
var createdDateFilterDrpdwn = '[id="filter_edms"] option';
var filterApply = '.btn.btn-primary.apply';
var filterReset = '.btn.btn-primary.reset';
var hideFilterElement = '#hide-filter';
var creationDate = 'app-home.ng-star-inserted:nth-child(2) app-inbasket.ng-star-inserted:nth-child(2) div.width app-certificates.ng-star-inserted:nth-child(5) div.container-fluid.grid1.ng-star-inserted:nth-child(2) div.ui-accordion.ui-widget.ui-helper-reset p-accordiontab.ng-tns-c12-1.ng-star-inserted:nth-child(1) div.ui-accordion-content-wrapper.ng-trigger.ng-trigger-tabContent div.ui-accordion-content.ui-widget-content.ng-tns-c12-1.ng-star-inserted app-arch-datatable:nth-child(1) table:nth-child(1) tbody:nth-child(1) tr.headerclass:nth-child(1) > th.ng-star-inserted:nth-child(18)';

//Columns
var Complete_Column_Names = '#complete-list-table > app-arch-datatable > table > tr.headerclass > th:nth-child';
var Assigned_Column_Names = '#assigned-me-table > div > app-arch-datatable > table > tr.headerclass > th:nth-child';



Cypress.Commands.add('switchToInbasket', (inbasketName) => {
    cy.get(inbasket).then((inBaskets) => {
        for (let i = 0; i < inBaskets.length; i++) {
            ((i) => {
                cy.get(inBaskets[i]).invoke('text').then((text) => {
                    if (text.trim() == inbasketName) {
                        inBaskets[i].click();
                    }
                })
            })(i)
        }

    })
});

Cypress.Commands.add('expandAccordionCompleteList', () => {
    cy.check_ElementExist(completedList, true, 20).then((isObjectFound) => {
        if (isObjectFound) {
            cy.get(completedList).find(ele_tabPanel).last().invoke('attr', 'aria-hidden').then((isHidden) => {
                cy.log("isHidden: " + isHidden);
                if (isHidden == 'true') 
                {
                    cy.get(completedList).click();
                    cy.wait(6000);
                }
            })
        }
    })
})

Cypress.Commands.add('expandAccordionAssignedToMe', (certificateNumber) => {
    cy.check_ElementExist(ele_assignedToMe, true, 20).then((isObjectFound) => {
        if (isObjectFound) {
            cy.get(ele_assignedToMe).find(ele_tabPanel).first().invoke('attr', 'aria-hidden').then((isHidden) => {
                if (isHidden == 'true') cy.get(ele_assignedToMe).click();
            })
        }
    })
})

Cypress.Commands.add('validateColumnNames', (ColumnNo) => {
    return cy.get(Complete_Column_Names+'('+ColumnNo+')').invoke('text').then((name) =>{
        return name;
    })
})

Cypress.Commands.add("check_ElementExist", (obj, ShouldExist, NumberOfSeconds) => {
    let NoOfLoops = 10;
    if (!isNaN(NumberOfSeconds)) { NoOfLoops = NumberOfSeconds }
    if (ShouldExist == false) {
        cy.wait(6000);
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

Cypress.Commands.add('selectRow', (count, inBasketName) => {
    if (inBasketName == 'Auto UW Completed' || inBasketName == 'Auto UW TD' || inBasketName == 'Registration') {
        cy.get('th.ng-star-inserted').eq(1).click();
        cy.wait(2000);
        cy.get('th.ng-star-inserted').eq(1).click();
        cy.wait(2000);
    }
    else if(inBasketName == 'Delegated Hold'|| inBasketName == 'Delegated Completed')
    {
        cy.get('#completeAccordion th.ng-star-inserted').eq(8).click(); //Delegated hold 8 creation date
        cy.wait(2000);
        cy.get('#completeAccordion th.ng-star-inserted').eq(8).click();
        cy.wait(2000);
    }
    else if(inBasketName == 'Delegated Suspend' )
    {
        cy.get('#completeAccordion th.ng-star-inserted').eq(7).click(); //Delegated hold 8 creation date
        cy.wait(2000);
        cy.get('#completeAccordion th.ng-star-inserted').eq(7).click();
        cy.wait(2000);
    }
    else {
        cy.get('#complete-list-table > app-arch-datatable > table > tr.headerclass > th:nth-child(4)').click();
        cy.wait(2000);
        cy.get('#complete-list-table > app-arch-datatable > table > tr.headerclass > th:nth-child(4)').click();
        cy.wait(2000);
    }
    if(count<3){var table = '#complete-list-table > app-arch-datatable > table > tr.pointer.even.ng-star-inserted > td:nth-child(2)'}
    else {var table = '#complete-list-table > app-arch-datatable > table > tr:nth-child(2) > td:nth-child(1)'}
    cy.get(table).click();
    cy.wait(3000);
    })



Cypress.Commands.add('getCompleteCount', (inbasketname) => { 
    cy.wait(6000);    // To get the count of assigned count of selected inbasket;
    cy.get(completeList).invoke('text').then((completeCount) => {
        if (inbasketname == "Underwriting Completed") {
            cy.get(expandFilter).click(); cy.wait(2000);
            cy.selectOption(createdDateFilter, "Yes");
            cy.get(filterApply).click().then(() => {
                return cy.get(completeList).invoke('text').then((completeCountgrt60days) => {
                    var Totcount = parseInt(completeCount) + parseInt(completeCountgrt60days);
                    cy.get(expandFilter).click().then(() => {
                        cy.get(filterReset).click().then(() => {
                            cy.get(hideFilterElement).click().then(() => {
                                return Totcount;
                            })
                        })
                    })
                })
            })
        }
        else {
            return completeCount;
        }
    })
})

Cypress.Commands.add('getAssignedToMeCount', (inbasketname) => {       // To get the count of assigned count of selected inbasket
    return cy.get(assignedToMe).invoke('text').then((assignedToMeCount) => {        
            return assignedToMeCount;
        })
    })

Cypress.Commands.add('getPendingCount', (inbasketname) => {
    var assignedCount;
    cy.get(pendingcount).invoke('text').then((text) => {
        assignedCount = text;
    })
    return assignedCount;
})


var auditTabContainer = '[class="tab-container"] [class="audit"]';
var auditTable = '[id="table-card"] table tbody tr';
const today = moment().format("MM/DD/YYYY");

Cypress.Commands.add('auditTabPresence', () => {     // Function to check for the presence of Audit tab
    cy.get(auditTabContainer).then(function (chk) {
        // cy.log('size:-',auditTabContainer.length)
        if (chk) {
            cy.get(auditTabContainer).invoke('text').then(function (text) {
                //cy.get(text.toString().trim()).should(TestData.auditTabText);})
                if (text.trim() === TestData.auditTabText) {
                    cy.log('size:-', auditTabContainer.length);
                }
            })
        }
        cy.log('size:-', chk);
    })
})

/*Cypress.Commands.add('auditTabHighlight', () => {    // Function to check for the highlight under Audit tab
    cy.get(auditTabContainer).invoke('css', 'border-bottom-color')
        .should("eq", FontProperties.TabBottomColor)
    cy.log('size:-auditTabHighlight');
    cy.get(auditTabContainer).click();
    cy.wait(3000);
})*/

Cypress.Commands.add('validateAuditTab', (Action, User, Date) => {

    cy.get(auditTabContainer).click();
    cy.get(auditTable).should('be.visible');
    cy.get(auditTable).contains(Action).parent('tr').contains(User).parent('tr').contains(today).parent('tr').should('be.visible')

})

Cypress.Commands.add('getTableRow', (table_obj, row_no) => {
    return cy.get(table_obj).eq(row_no).invoke('text').then((row) => {
        return row;
    })
})
Cypress.Commands.add('getCellValue', (col_no) => {
    return cy.get('td.ng-star-inserted').eq(col_no).invoke('text').then((cell_val) => {
        return cell_val;
    })
})

Cypress.Commands.add('getUIinfo', (inbasketName) => {
    var ui_grid_data = [];
    var columnCount = 0;
    cy.get('#completeAccordion tr:nth-child(2) td').its('length').then((value) => {
        cy.log("value: " + value)
        columnCount = value;

        cy.log("columnCount: " + columnCount);
        for (var i = 0; i < columnCount; i++) {
            cy.get('#completeAccordion tr:nth-child(2) td').eq(i).invoke('text').then((value) => {
                ui_grid_data.push(value);
            })
        }
    })
    return cy.get('#completeAccordion tr:nth-child(2) td').eq(1).invoke('text').then((value) => {
        return ui_grid_data;
    })

});

Cypress.Commands.add('getCertificateNumberFromDashboard', (inbasketName) => {
    if (inbasketName == 'Registration') {
        return cy.get('#completeAccordion tr:nth-child(2) td').eq(9).invoke('text').then((value) => {
            return value;
        })
    }
    else if (inbasketName == 'Hold for Documents') {
        return cy.get('#completeAccordion tr:nth-child(2) td').eq(6).invoke('text').then((value) => {
            return value;
        })
    }
    else if (inbasketName == 'Manager Registration Review') {
        return cy.get('#completeAccordion tr:nth-child(2) td').eq(8).invoke('text').then((value) => {
            return value;
        })
    }
})

Cypress.Commands.add('validategridValues', (DBValues, UIValues, inBasketname, msg, certIssued, UWMDecision, inBasketCount) => {
     var DBArray = [];
    for (var key in DBValues) {
        var y = DBValues[key];
        for (var x in y) {
            var a = y[x];
            for (var m in a) {
                if (m != 0)
                    DBArray.push(a[m]);
            }
        }
    }

    if (inBasketname == "Trailing Documents Received") DBArray.push(UWMDecision);
    if (inBasketname == "Auto UW TD") DBArray.splice(-1, 0, UWMDecision);
    for (var i in DBArray) {
        if (DBArray[i] != null) { DBArray[i] = DBArray[i].toString(); }
        if (UIValues[i] != null) { UIValues[i] = UIValues[i].toString(); }
        if (['', 'empty', 'null', null, undefined].indexOf(DBArray[i]) >= 0)
            DBArray[i] = 'Null';
        if (['', 'empty', 'null', null, undefined].indexOf(UIValues[i]) >= 0)
            UIValues[i] = 'Null';
        if (inBasketname == "Auto UW Completed" || inBasketname == "Auto UW TD") {
            if (i == 0) {
                if (certIssued != '') { expect(certIssued).toContain('Tick'); UIValues[i] = 'true'; }
                else { (expect(certIssued).toEqual('')); UIValues[i] = 'false'; }
                if (DBArray[i] == null) DBArray[i] = 'false';
            }
            if (i == 1) {
                if (msg != '') { expect(msg).toContain('WorkItem is Locked By :'); UIValues[i] = 'true'; }
                else { (expect(msg).toEqual('')); UIValues[i] = 'false'; }
                if (DBArray[i] == null) DBArray[i] = 'false';
            }
            if ((i == 16 || i == 19) && DBArray[i] != null) {
                UIValues[i] = UIValues[i].replace(/(\r\n|\n|\r)/gm, " ");
                UIValues[i] = dateFormat(UIValues[i], "ddd mmm dd yyyy HH:MM:ss");
                DBArray[i] = DBArray[i].slice(0, 24);
            }
        }
        else {
             if (i == 0) { 
                 if(msg  == undefined)
                 {
                    UIValues[i] = 'false';
                    if (DBArray[i]==null) DBArray[i] = 'false';
                 }
                 else
                 {
                    if (msg!=''){expect(msg).contains('WorkItem is Locked By :'); UIValues[i] = 'true'; } // || 
                    else
                     {
                         (expect(msg).to.equal(''));
                     UIValues[i] = 'false';}
                    
                 }
               
             }
            if (DBArray[i] == null && UIValues[i] == null) {
                DBArray[i] = 'Null';
                UIValues[i] = 'Null';
            }
            if ((i == 1 && inBasketname == "Registration")|| (i == 12 && inBasketname == "Registration")  || (i == 9 && inBasketname == "Hold for Documents")|| (i == 1 && inBasketname == "Manager Registration Review") || (i == 11 && inBasketname == "Manager Registration Review")){
                var temp = UIValues[i].toString();
                var finalUIDate = temp.substring(0, 10) + ' ' + temp.substring(10, temp.length);

                var formattedDBdate = new Date(DBArray[i]);
                var formattedUIdate = new Date(finalUIDate);
                DBArray[i] = formattedDBdate.toString();
                UIValues[i] = formattedUIdate.toString()
            }

            if (i == 6 && inBasketname == "Registration") {
                UIValues[i] = inBasketCount.Registration;
            }
            if (i == 13 && inBasketname == "Registration") {
                //Missing docs indicator
                if (DBArray[i] == 'true') {
                    DBArray[i] = 'Y';
                }
                else 
                {
                    DBArray[i] = 'Null';
                }
                if(UIValues[i] == null || UIValues[i] == '')
                {
                    UIValues[i] = 'Null';
                }
            }
            if (i == 11 && inBasketname == "Hold for Documents") {
                //Missing docs indicator
                if (DBArray[i] == 'true') {
                    DBArray[i] = 'Y';
                }
                else 
                {
                    DBArray[i] = 'Null';
                }
                if(UIValues[i] == null || UIValues[i] == '')
                {
                    UIValues[i] = 'Null';
                }
            }
            cy.log("DBArray[i]: " + DBArray[i]);
            cy.log("UIValues[i]: " + UIValues[i]);
            expect(DBArray[i]).contains(UIValues[i]);
            
        }
    }
})

Cypress.Commands.add('getbasisOfDecision', (certificateNumber, inbasketName) => {
    if (inbasketName == "Auto UW TD" || inbasketName == "Trailing Documents Received") {
        return cy.task("getUnderWritingModel", certificateNumber).then((uwm) => {
            return uwm.decisions.basisOfDecision.uwValue;
        })
    }
    else {
        return "null";
    }
});

Cypress.Commands.add('getCertificateInfoFromDB', (inBasket, cert_number) => {
    if (inBasket == "Registration") {
       return  cy.task("getCertificateInfoRegistration", { dbConfig: Cypress.env("mssql"), cert: cert_number }).then((result) => {
          return result;
        });
      }
    else if (inBasket == "Hold for Documents") {
        return  cy.task("getCertificateInfoHoldForDocs", { dbConfig: Cypress.env("mssql"), cert: cert_number }).then((result) => {
           return result;
         });
       }
       else if (inBasket == "Manager Registration Review") {
        return  cy.task("getCertificateInfoMgrRegRev", { dbConfig: Cypress.env("mssql"), cert: cert_number }).then((result) => {
           return result;
         });
       }
      

})

