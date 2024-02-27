/// <reference types="cypress" />
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import moment from 'moment';
import 'cypress-file-upload';
const _ = Cypress._;

// require node's url module
const url = require('url');

//Declare Page Object Reference
var loanDetail = '[id="Loan Detail"]';
var property = '[id="Property"]';
var borrower = "#Borrower";
var AIL = "#AIL";
var decision = "#Decision";

Cypress.Commands.add("enterClearText", (obj, value) => {
  if (value == null) {
    cy.get(obj).clear();
  } else if (value == "") {
  } else {
    cy.get(obj).clear({force: true}).type(value,{force: true});
    cy.TAB;
  }
});

Cypress.Commands.add("enterText", (obj, value) => {
  if (value == null) {
    cy.get(obj).clear();
  } else if (value == "") {
  } else {
    // cy.get(obj).clear();
    cy.get(obj).type(value,{force: true});
    cy.TAB;
  }
});

Cypress.Commands.add("clickElement", (tag,text) => {
  cy.get(tag).click({force: true});
}); 

Cypress.Commands.add("clickByText", (tag,text) => {
  cy.get(tag).contains(text).click({force: true});
});

Cypress.Commands.add("selectCheckBox", (obj, value) => {
  if (value == false) {
    console.log(value)
    cy.get(obj).uncheck({ force: true }).should('not.be.checked');
  } else if (value == true) {
    cy.get(obj).check({ force: true }).should('be.checked');
  } else {
  }
});

Cypress.Commands.add("selectDropDownValue", (obj, option) => {
  if (option == "") {
  } else {
    if (option == null) {
      option = "Select...";
    }
    cy.get(obj).select(option,{force: true});
  }
});

Cypress.Commands.add("selectDropDown", (obj, option) => {
  if (option == "") {
  } else {
    if (option == null) {
      option = "Select...";
    }
    cy.xpath(obj).select(option,{force: true});
  }
});

Cypress.Commands.add("setCheckBox", (obj, value) => {
  if (value == false) {
    console.log(value)
    cy.get(obj).uncheck({ force: true }).should('not.be.checked');
  } else if (value == true) {
    cy.get(obj).check({ force: true }).should('be.checked');
  } else {
  }
});

Cypress.Commands.add("selectOption", (obj, option) => {
  if (option == "") {
  } else {
    if (option == null) {
      option = "Select...";
    }
    cy.get(obj).select(option);
  }
});


Cypress.Commands.add("generateSSN", () => {
  var SSN = Math.floor(Math.random() * (700000000 - 200000000 + 1) + 300000000);
  return SSN;
});

const getRandomSSN = () => {
  const SSN = Math.floor(
    Math.random() * (700000000 - 300000000 + 1) + 300000000
  );
  return SSN;
};

const getRandomSpecialChar = () => {
  const SpecialChars = "~`!@#$%^&*()_-+=,.<>;':\"[]{}|";
  return SpecialChars.substr(
    Math.floor(SpecialChars.length * Math.random()),
    1
  );
};

const getRandomString = (string_length) => {
  let random_string = "";
  let random_ascii;
  for (let i = 0; i < string_length; i++) {
    random_ascii = Math.floor(Math.random() * 25 + 97);
    random_string += String.fromCharCode(random_ascii);
  }
  return random_string;
};

Cypress.Commands.add(
  "setUpCertificate",
  (certificateNumber, ivCertificateSummary) => {
    const url =
      Cypress.env("independentValidationServiceUrl") +
      "/certificate/" +
      certificateNumber +
      "/summary";
    const requestObject = {
      ...postObject,
      body: {
        ...ivCertificateSummary,
        certificateNumber: certificateNumber,
      },
      url,
    };
    return cy.request(requestObject);
  }
);

Cypress.Commands.add("getCertificate", (certificateNumber) => {
  const url =
    Cypress.env("independentValidationServiceUrl") +
    "/certificate/" +
    certificateNumber +
    "/summary";
  return cy.request({
    ...getObject,
    url,
  });
});

Cypress.Commands.add("getCaseDetails", (certificateNumber) => {
  cy.OAuth().then(({ body }) => {
    const { access_token, id_token } = body;
    const url =
      Cypress.env("UWAworkflowServiceUrl") +
      "/case-details/" +
      certificateNumber;
    return cy.request({
      getObjectWithoutOAuth,
      url,
      headers: { Authorization: `Bearer ${access_token}` },
    });
  });
});

Cypress.Commands.add("clickResubmit", (comment) => {
  var comments = "#comments";
  var resubmit = "#btn-submit";
  cy.navigateTo("Decision");
  cy.setText(comments, comment);
  cy.contains("button", "RESUBMIT").click();
});

Cypress.Commands.add("clickOverrideAndApprove", (comment) => {
  var comments = "#comments";
  var overrideAndApprove = "#btn-approve";
  cy.navigateTo("Decision");
  cy.setText(comments, comment);
  cy.get(overrideAndApprove).click();
});

Cypress.Commands.add("deleteCertificate", (certificateNumber) => {
  const url =
    Cypress.env("independentValidationServiceUrl") +
    "/certificate/" +
    certificateNumber +
    "/summary";
  return cy.request({
    ...deleteObject,
    url,
  });
});


Cypress.Commands.add("isEditableFieldCheck", (id, isEditable) => {
  if (!!isEditable) {
    cy.get("#" + id)
      .clear()
      .type("12")
      .then(() => {
        cy.get("#" + id).should("value", "12");
      })
      .clear();
  } else {
    cy.document().then((doc) => {
      const element = doc.getElementById(id);
      console.log(element.tagName);
      expect(element.tagName).to.eq("DIV");
    });
  }
});

Cypress.Commands.add("isEditableDate", (id) => {
  return cy
    .get("#" + id)
    .clear()
    .type("12/13/2018")
    .then(() => {
      cy.get("#" + id).should("value", "12/13/2018");
    })
    .clear();
});

Cypress.Commands.add("moneyFieldCheck", (id, maximum, minimum) => {
  cy.get("#" + id)
    .clear()
    .type("abc")
    .then(() => {
      cy.get("#" + id + "-error").should(
        "contain",
        "This is not a valid value"
      );
    });
  cy.get("#" + id)
    .clear()
    .type("!")
    .then(() => {
      cy.get("#" + id + "-error").should(
        "contain",
        "This is not a valid value"
      );
    });
  cy.get("#" + id)
    .clear()
    .type(minimum - 0.01 + "")
    .then(() => {
      cy.get("#" + id + "-error").should(
        "contain",
        "This is not a valid value"
      );
    });
  cy.get("#" + id)
    .clear()
    .type(maximum + 0.01)
    .then(() => {
      cy.get("#" + id + "-error").should(
        "contain",
        "This is not a valid value"
      );
    });
  cy.get("#" + id)
    .clear()
    .type("12")
    .then(() => {
      cy.get("#" + id + "-error").should(
        "not.contain",
        "This is not a valid value"
      );
    });
  cy.get("#" + id)
    .blur()
    .should("value", "12.00");
});

Cypress.Commands.add("stringOnlyCheck", (id, maximum, minimum) => {
  cy.get("#" + id)
    .clear()
    .type(getRandomString(maximum + 1))
    .then(() => {
      cy.get("#" + id + "-error").should(
        "contain",
        "This is not a valid value"
      );
    });
  cy.get("#" + id)
    .clear()
    .type(getRandomString(maximum))
    .then(() => {
      cy.get("#" + id + "-error").should(
        "not.contain",
        "This is not a valid value"
      );
    });
  if (minimum != null) {
    cy.get("#" + id)
      .clear()
      .type(getRandomString(minimum - 1))
      .then(() => {
        cy.get("#" + id + "-error").should(
          "contain",
          "This is not a valid value"
        );
      });
    cy.get("#" + id)
      .clear()
      .type(getRandomString(minimum))
      .then(() => {
        cy.get("#" + id + "-error").should(
          "not.contain",
          "This is not a valid value"
        );
      });
  }
});

Cypress.Commands.add("numberOnlyCheck", (id, maximum, minimum) => {
  cy.get("#" + id)
    .clear()
    .type("abc")
    .then(() => {
      cy.get("#" + id + "-error").should(
        "contain",
        "This is not a valid value"
      );
    });
  cy.get("#" + id)
    .clear()
    .type(maximum + 1 + "")
    .then(() => {
      cy.get("#" + id + "-error").should(
        "contain",
        "This is not a valid value"
      );
    });
  cy.get("#" + id)
    .clear()
    .type(maximum + "")
    .then(() => {
      cy.get("#" + id + "-error").should(
        "not.contain",
        "This is not a valid value"
      );
    });
  if (minimum != null) {
    cy.get("#" + id)
      .clear()
      .type(minimum - 1 + "")
      .then(() => {
        cy.get("#" + id + "-error").should(
          "contain",
          "This is not a valid value"
        );
      });
    cy.get("#" + id)
      .clear()
      .type(minimum + "")
      .then(() => {
        cy.get("#" + id + "-error").should(
          "not.contain",
          "This is not a valid value"
        );
      });
  }
});

Cypress.Commands.add("nameCheck", (id, maximum) => {
  cy.get("#" + id)
    .clear()
    .type("1")
    .then(() => {
      cy.get("#" + id + "-error").should(
        "contain",
        "This is not a valid value"
      );
    });
  cy.get("#" + id)
    .clear()
    .type("abc ")
    .then(() => {
      cy.get("#" + id + "-error").should(
        "not.contain",
        "This is not a valid value"
      );
    });
  cy.get("#" + id)
    .clear()
    .type("abc-def")
    .then(() => {
      cy.get("#" + id + "-error").should(
        "not.contain",
        "This is not a valid value"
      );
    });
  cy.get("#" + id)
    .clear()
    .type(getRandomString(maximum + 1))
    .then(() => {
      cy.get("#" + id + "-error").should(
        "contain",
        "This is not a valid value"
      );
    });
  cy.get("#" + id)
    .clear()
    .type(getRandomString(maximum))
    .then(() => {
      cy.get("#" + id + "-error").should(
        "not.contain",
        "This is not a valid value"
      );
    });
});

Cypress.Commands.add("dateCheck", (id, restrictFutureDate) => {
  cy.get("#" + id)
    .clear()
    .type("12")
    .then(() => {
      cy.get("#" + id + "-error").should(
        "contain",
        "This is not a valid value"
      );
    });
  cy.get("#" + id)
    .clear()
    .type("1212")
    .then(() => {
      cy.get("#" + id + "-error").should(
        "contain",
        "This is not a valid value"
      );
    });
  cy.get("#" + id)
    .clear()
    .type("122020")
    .then(() => {
      cy.get("#" + id + "-error").should(
        "contain",
        "This is not a valid value"
      );
    });
  cy.get("#" + id)
    .clear()
    .type("12202019")
    .then(() => {
      cy.get("#" + id + "-error").should(
        "not.contain",
        "This is not a valid value"
      );
    });

  if (restrictFutureDate) {
    const tomorrow = moment().add(1, "days").format("MMDDYYYY");
    cy.get("#" + id)
      .clear()
      .type(tomorrow)
      .then(() => {
        cy.get("#" + id + "-error").should(
          "contain",
          "This is not a valid value"
        );
      });
  }
});

Cypress.Commands.add("selectDropdownCheck", (id, values, displayNames) => {
  values.forEach((value, key) => {
    cy.get("#" + id)
      .select(displayNames[key])
      .should("have.value", value);
  });
  cy.get("#" + id + ">option").eq(values.length);
  cy.get("#" + id + ">option").eq(displayNames.length);
});

Cypress.Commands.add("addressCheck", (id, isAllRequired) => {
  // check for required
  const fields = ["street", "city", "state", "zipCode"];
  cy.get("#" + id + "street").clear();
  cy.get("#" + id + "city").clear();
  cy.get("#" + id + "state").select("");
  cy.get("#" + id + "zipCode")
    .clear()
    .then((data) => {
      fields.forEach((value) => {
        cy.get("#" + id + value + "-error").should(
          isAllRequired ? "contain" : "not.contain",
          "This field is required"
        );
      });
    });

  // check for conditional required
  cy.get("#" + id + "street")
    .type("street Name")
    .then(() => {
      ["city", "state", "zipCode"].forEach((value) => {
        cy.get("#" + id + value + "-error").should(
          "contain",
          "This field is required"
        );
      });
    });
  cy.get("#" + id + "street").clear();
  cy.get("#" + id + "city")
    .type("city Name")
    .then(() => {
      ["street", "state", "zipCode"].forEach((value) => {
        cy.get("#" + id + value + "-error").should(
          "contain",
          "This field is required"
        );
      });
    });
  cy.get("#" + id + "city").clear();
  cy.get("#" + id + "state")
    .select("DC")
    .then(() => {
      ["street", "city", "zipCode"].forEach((value) => {
        cy.get("#" + id + value + "-error").should(
          "contain",
          "This field is required"
        );
      });
    });
  cy.get("#" + id + "state").select("");
  cy.get("#" + id + "zipCode")
    .type("12345")
    .then(() => {
      ["street", "city", "state"].forEach((value) => {
        cy.get("#" + id + value + "-error").should(
          "contain",
          "This field is required"
        );
      });
    });

  // street check
  cy.get("#" + id + "street").clear();
  cy.stringOnlyCheck(id + "street", 33, 5);

  cy.get("#" + id + "street")
    .clear()
    .type("abcde-")
    .then(() => {
      cy.get("#" + id + "street-error").should(
        "not.contain",
        "This is not a valid value"
      );
    });

  cy.get("#" + id + "street")
    .clear()
    .type("abcde,")
    .then(() => {
      cy.get("#" + id + "street-error").should(
        "not.contain",
        "This is not a valid value"
      );
    });

  cy.get("#" + id + "street")
    .clear()
    .type("abcdef!")
    .then(() => {
      cy.get("#" + id + "street-error").should(
        "contain",
        "This is not a valid value"
      );
    });

  // city check
  cy.get("#" + id + "city").clear();
  cy.stringOnlyCheck(id + "city", 24);

  cy.get("#" + id + "city")
    .clear()
    .type("abcde-")
    .then(() => {
      cy.get("#" + id + "city-error").should(
        "not.contain",
        "This is not a valid value"
      );
    });

  cy.get("#" + id + "city")
    .clear()
    .type("abcde.")
    .then(() => {
      cy.get("#" + id + "city-error").should(
        "not.contain",
        "This is not a valid value"
      );
    });

  cy.get("#" + id + "city")
    .clear()
    .type("abcdef!")
    .then(() => {
      cy.get("#" + id + "city-error").should(
        "contain",
        "This is not a valid value"
      );
    });

  // zip code check
  cy.get("#" + id + "zipCode")
    .clear()
    .type("00000")
    .then(() => {
      cy.get("#" + id + "city-error").should(
        "contain",
        "This is not a valid value"
      );
    });
  cy.get("#" + id + "zipCode")
    .clear()
    .type("1234")
    .then(() => {
      cy.get("#" + id + "city-error").should(
        "contain",
        "This is not a valid value"
      );
    });
  cy.get("#" + id + "zipCode")
    .clear()
    .type("123456")
    .then(() => {
      cy.get("#" + id + "city-error").should(
        "contain",
        "This is not a valid value"
      );
    });

  cy.get("#" + id + "zipCode")
    .clear()
    .type("abcde")
    .then(() => {
      cy.get("#" + id + "city-error").should(
        "contain",
        "This is not a valid value"
      );
    });

  cy.get("#" + id + "zipCode")
    .clear()
    .type("12345")
    .then(() => {
      cy.get("#" + id + "zipCode-error").should(
        "not.contain",
        "This is not a valid value"
      );
    });
  cy.get("#" + id + "state").select("CO");
  cy.get("#" + id + "street")
    .clear()
    .type("abcdef");
  cy.get("#" + id + "city")
    .clear()
    .type("abcdef");
});



Cypress.Commands.add("specialCharCheck", (id, allowSpecialChar) => {
  cy.get("#" + id)
    .clear()
    .type(getRandomSpecialChar())
    .then(() => {
      cy.get("#" + id + "-error").should(
        !allowSpecialChar ? "contain" : "not.contain",
        "This is not a valid value"
      );
    });
});

Cypress.Commands.add("nonStringCheck", (id) => {
  cy.get("#" + id)
    .clear()
    .type(getRandomString(1))
    .then(() => {
      cy.get("#" + id + "-error").should(
        "contain",
        "This is not a valid value"
      );
    });
});


const decimalCheck = (id, maximum, minimum, decimalPlace) => {
  cy.nonStringCheck(id);
  cy.specialCharCheck(id, false);
  cy.get("#" + id)
    .clear()
    .type(maximum + 1 / Math.pow(10, decimalPlace) + "")
    .then(() => {
      cy.get("#" + id + "-error").should(
        "contain",
        "This is not a valid value"
      );
    });
  cy.get("#" + id)
    .clear()
    .type(maximum + "")
    .then(() => {
      cy.get("#" + id + "-error").should(
        "not.contain",
        "This is not a valid value"
      );
    });
  if (minimum != null) {
    cy.get("#" + id)
      .clear()
      .type(minimum - 1 / Math.pow(10, decimalPlace) + "")
      .then(() => {
        cy.get("#" + id + "-error").should(
          "contain",
          "This is not a valid value"
        );
      });
    cy.get("#" + id)
      .clear()
      .type(minimum + "")
      .then(() => {
        cy.get("#" + id + "-error").should(
          "not.contain",
          "This is not a valid value"
        );
      });
  }
};

Cypress.Commands.add("moneyCheck", (id, maximum, minimum) => {
  cy.pseudoSelectorCheck(id, "$");
  decimalCheck(id, maximum, minimum, 2);
});

Cypress.Commands.add("percentageCheck", (id, maximum, minimum) => {
  cy.pseudoSelectorCheck(id, "%");
  decimalCheck(id, maximum, minimum, 2);
});

Cypress.Commands.add("randomNumberCheck", (id, maximum, minimum) => {
  cy.nonStringCheck(id);
  cy.specialCharCheck(id, false);
  let array = new Array(maximum).fill("1");
  cy.get("#" + id)
    .clear()
    .then(() => {
      array.forEach((val) => {
        cy.get("#" + id).type(Math.floor(Math.random() * 10));
      });
    });

  cy.get("#" + id + "-error").should(
    "not.contain",
    "This is not a valid value"
  );
  cy.get("#" + id)
    .type("1")
    .then(() => {
      cy.get("#" + id + "-error").should(
        "contain",
        "This is not a valid value"
      );
    });

  if (maximum != minimum || minimum === 0) {
    array = new Array(minimum).fill(1);
    cy.get("#" + id)
      .clear()
      .then(() => {
        array.forEach((val) => {
          cy.get("#" + id).type(Math.floor(Math.random() * 10));
        });
      });
    cy.get("#" + id + "-error").should(
      "not.contain",
      "This is not a valid value"
    );
    cy.get("#" + id)
      .type({ backspace: true })
      .then(() => {
        cy.get("#" + id + "-error").should(
          "contain",
          "This is not a valid value"
        );
      });
  }
});

Cypress.Commands.add("pseudoSelectorCheck", (id, expectedString) => {
  cy.get("#" + id)
    .parent()
    .then(($els) => {
      const view = $els[0].ownerDocument.defaultView;
      const before = view.getComputedStyle($els[0], "before");
      const contentValue = before.getPropertyValue("content");
      expect(contentValue).to.eq('"' + expectedString + '"');
    });
});

Cypress.Commands.add("navigateTo", (category) => {
  switch (category) {
    case "LoanDetail":
      return cy.get(loanDetail).click();
      break;
    case "Borrower":
      return cy.get(borrower).click();
      break;
    case "Property":
      return cy.get(property).click();
      break;
    case "AIL":
      return cy.get(AIL).click();
      break;
    case "Decision":
      return cy.get(decision).click();
      break;
    default:
  }
});

Cypress.Commands.add("getCertNumber", (reqURL) => {
  return cy.request(reqURL);
});

Cypress.Commands.add("clickAction", (actionType) => {
  let actionItemId = "#";
  switch (actionType) {
    case "save-progress":
      actionItemId = "#saveProgress";
      break;
    case "Exception":
      actionItemId = "#exceptions";
    break;
    case "missing-doc":
      actionItemId = "#missing-doc-action";
      break;
    case "upload-doc":
      actionItemId = "#upload-doc";
      break;
    default:
      actionItemId = "";
  }
  return cy
    .get('app-delegated-header [class^="col-xs-4"] button')
    .click()
    .then(() => {
      cy.get(actionItemId)
        .click()
        .then((element) => {
          return element;
        });
    });
});
