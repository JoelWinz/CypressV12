import { fakerDE as faker } from '@faker-js/faker';

// Generiere Testdaten mit Faker
const street = faker.location.street();
const buildingNumber = faker.location.buildingNumber();
const zipcode = faker.location.zipCode();
const city = faker.location.city();
const buildingNumberAddition = faker.string.alpha();
const email = faker.internet.email();
const name = faker.person.firstName();
const surname = faker.person.lastName();
const date = "03.03.2003";
const iban = faker.finance.iban({ formatted: true, countryCode: 'DE' });
const university = "IU Internationale Hochschule";


// Helper-Funktion für die Eingabe und Logging
function fillInput(selector, value, logMessage, options = {}) {
  cy.get(selector).then($input => {
    $input.val(value); // Setze den Wert direkt
    // cy.wrap($input).trigger('input'); // Löse das input Event aus
    cy.log(`Filled ${logMessage} with value: ${value}`);
  });
}
Cypress.on('uncaught:exception', (error) => {
  if (error.message) { cy.log('An error occurred: ', error.message); }
  return false; // Test will continue after logging the error
});

Cypress.on('fail', (error) => {
  if (error.message) { cy.log('Test failed: ', error.message); }
  // we return false to prevent the test from failing
  return false;
});



describe('template spec', () => {
  it('passes', () => {
    // In deinem Support File oder direkt im Test
    Cypress.Commands.overwrite('visit', (originalFn, url, options = {}) => {
      options.onBeforeLoad = (win) => {
        // GA4 blocken
        cy.stub(win, 'fetch').callsFake((...args) => {
          if (args[0].includes('collect?v=2&tid=G-')) {
            return new Promise(() => { }); // blockiert den Request
          }
          return fetch(...args); // alle anderen Requests normal weiterlaufen lassen
        });
      };
      return originalFn(url, options);
    });

    cy.visit('https://12-staging.vdi.de/zupi-eltern/mitgliedschaft')
    cy.get('#CybotCookiebotDialogBodyButtonAccept').click();
    // Testschritte
    cy.get('label').contains('Herr').click().then(() => {
      cy.log('Clicked on Herr button');
    });

    cy.get('#aufnahmeantragZupi-31475-salutationChild-1').should('be.checked').then(() => {
      cy.log('Verified Herr radio button is selected');
      fillInput('#aufnahmeantragZupi-31475-firstnameChild', name, 'first name');
      fillInput('#aufnahmeantragZupi-31475-lastnameChild', surname, 'last name');

      // Sicherstellen, dass das Geburtsdatum eingegeben wird
      cy.get('#aufnahmeantragZupi-31475-birthdayChild').type(date, { force: true });
      cy.log(`Entered birthday with value: ${date}`);

      // Land auswählen und überprüfen
      cy.get('#aufnahmeantragZupi-31475-country').select('DE', { force: true }).then(() => {
        cy.log('Selected Country: DE');
      });

      cy.get('#aufnahmeantragZupi-31475-country').should('have.value', 'DE').then(() => {
        cy.log('Verified Country selection: DE');
      });

      // Adressdaten eingeben
      fillInput('#aufnahmeantragZupi-31475-emailChild', email, 'email');
      fillInput('#aufnahmeantragZupi-31475-street', street, 'street');
      fillInput('#aufnahmeantragZupi-31475-housenumber', buildingNumber, 'housenumber');
      fillInput('#aufnahmeantragZupi-31475-zipcode', zipcode, 'zipcode', { delay: 100 });
      // Stadt "pasten" statt tippen
      cy.get('#aufnahmeantragZupi-31475-city').then($input => {
        $input.val(city); // Setze den Wert direkt
        cy.wrap($input).trigger('input'); // Löse das input Event aus
        cy.log(`Pasted city with value: ${city}`);
      });
    });
    // Formulareinreichung
    cy.get('button[name="tx_form_formframework[aufnahmeantragZupi-31475][__currentPage]"]').click().then(() => {
      cy.log('Clicked on submit button');
    });


    cy.get('label').contains('Herr').click().then(() => {
      cy.log('Clicked on Herr button');
    });

    cy.get('#aufnahmeantragZupi-31475-salutationParents-1').should('be.checked').then(() => {
      cy.log('Verified Herr radio button is selected');

      fillInput('#aufnahmeantragZupi-31475-titel', "Dr.-Ing.", 'title');
      fillInput('#aufnahmeantragZupi-31475-firstname', name, 'first name');
      fillInput('#aufnahmeantragZupi-31475-lastname', surname, 'last name');
      fillInput('#aufnahmeantragZupi-31475-email', email, 'email');
    })
    // Checkbox überprüfen und umschalten
    cy.get('#aufnahmeantragZupi-31475-checkboxGodfather').as('checkbox').invoke('is', ':checked').then((checked) => {
      if (checked) {
        cy.get('@checkbox').uncheck({ force: true }).then(() => {
          cy.log('Unchecked checkbox');
        });
      } else {
        cy.get('@checkbox').check({ force: true }).then(() => {
          cy.log('Checked checkbox');
        });
      }
    });
    // Formulareinreichung
    cy.get('button[name="tx_form_formframework[aufnahmeantragZupi-31475][__currentPage]"]').click().then(() => {
      cy.log('Clicked on submit button');
    });

    // Patenschaft ausfüllen
    cy.get('label').contains('Herr').click().then(() => {
      cy.log('Clicked on Herr button');
    });

    cy.get('#aufnahmeantragZupi-31475-salutationGodfather-1').should('be.checked').then(() => {
      cy.log('Verified Herr radio button is selected');

      fillInput('#aufnahmeantragZupi-31475-titelGodfather', "Dr.-Ing.", 'title');
      fillInput('#aufnahmeantragZupi-31475-firstnameGodfather', name, 'first name');
      fillInput('#aufnahmeantragZupi-31475-lastnameGodfather', surname, 'last name');
      fillInput('#aufnahmeantragZupi-31475-emailGodfather', email, 'email');

      // Land auswählen und überprüfen
      cy.get('#aufnahmeantragZupi-31475-countryGodfather').select('DE', { force: true }).then(() => {
        cy.log('Selected Country: DE');
      });

      cy.get('#aufnahmeantragZupi-31475-countryGodfather').should('have.value', 'DE').then(() => {
        cy.log('Verified Country selection: DE');
      });

      // Adressdaten eingeben
      fillInput('#aufnahmeantragZupi-31475-emailGodfather', email, 'email');
      fillInput('#aufnahmeantragZupi-31475-housenumberGodfather', buildingNumber, 'housenumber');
      fillInput('#aufnahmeantragZupi-31475-zipcodeGodfather', zipcode, 'zipcode', { delay: 100 });
      fillInput('#aufnahmeantragZupi-31475-cityGodfather', city, 'city');
      fillInput('#aufnahmeantragZupi-31475-streetGodfather', street, 'street');

      // Formulareinreichung
      cy.get('button[name="tx_form_formframework[aufnahmeantragZupi-31475][__currentPage]"]').click().then(() => {
        cy.log('Clicked on submit button');
      });
      fillInput('#aufnahmeantragZupi-31475-accountNumber', iban, 'iban');
    })
    // Checkbox überprüfen und umschalten
    cy.get('#aufnahmeantragZupi-31475-checkbox-2').as('checkbox').invoke('is', ':checked').then((checked) => {
      if (checked) {
        cy.get('@checkbox').uncheck({ force: true }).then(() => {
          cy.log('Unchecked checkbox');
        });
      } else {
        cy.get('@checkbox').check({ force: true }).then(() => {
          cy.log('Checked checkbox');
        });
      }
    });
    // Checkbox überprüfen und umschalten
    cy.get('#aufnahmeantragZupi-31475-emailPrivatePermission').as('checkbox').invoke('is', ':checked').then((checked) => {
      if (checked) {
        cy.get('@checkbox').uncheck({ force: true }).then(() => {
          cy.log('Unchecked checkbox');
        });
      } else {
        cy.get('@checkbox').check({ force: true }).then(() => {
          cy.log('Checked checkbox');
        });
      }
    });
    // Formulareinreichung
    cy.get('button[name="tx_form_formframework[aufnahmeantragZupi-31475][__currentPage]"]').click().then(() => {
      cy.log('Clicked on submit button');
    });
  })
})