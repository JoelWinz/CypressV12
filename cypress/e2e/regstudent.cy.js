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
const iban = faker.finance.iban();
const university = "IU Internationale Hochschule";




// Helper-Funktion für die Eingabe und Logging
function fillInput(selector, value, logMessage, options = {}) {
  cy.get(selector).then($input => {
    $input.val(value); // Setze den Wert direkt
    cy.wrap($input).trigger('input'); // Löse das input Event aus
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


    cy.visit('https://12-staging.vdi.de/mitgliedschaft/mitglied-werden/aufnahmeantrag?mitgliedsart=SM')
    cy.get('#CybotCookiebotDialogBodyButtonAccept').click();
    // Testschritte
    cy.get('label').contains('Herr').click().then(() => {
      cy.log('Clicked on Herr button');
    });

    cy.get('#aufnahmeantrag-15331-salutation-1').should('be.checked').then(() => {
      cy.log('Verified Herr radio button is selected');
    });

    // Persönliche Daten eingeben
    fillInput('input[name="tx_form_formframework[aufnahmeantrag-15331][titel]"]', "Dr.-Ing.", 'title');
    fillInput('input[name="tx_form_formframework[aufnahmeantrag-15331][firstname]"]', name, 'first name');
    fillInput('input[name="tx_form_formframework[aufnahmeantrag-15331][lastname]"]', surname, 'last name');

    // Sicherstellen, dass das Geburtsdatum eingegeben wird
    cy.get('input[name="tx_form_formframework[aufnahmeantrag-15331][birthday][date]"]').type(date, { force: true });
    cy.log(`Entered birthday with value: ${date}`);

    // Land auswählen und überprüfen
    cy.get('#aufnahmeantrag-15331-country').select('DE', { force: true }).then(() => {
      cy.log('Selected Country: DE');
    });

    cy.get('#aufnahmeantrag-15331-country').should('have.value', 'DE').then(() => {
      cy.log('Verified Country selection: DE');
    });

    // Adressdaten eingeben
    fillInput('input[name="tx_form_formframework[aufnahmeantrag-15331][email]"]', email, 'email');
    fillInput('input[name="tx_form_formframework[aufnahmeantrag-15331][street]"]', street, 'street');
    fillInput('input[name="tx_form_formframework[aufnahmeantrag-15331][housenumber]"]', buildingNumber, 'housenumber');
    fillInput('input[name="tx_form_formframework[aufnahmeantrag-15331][hnrzusatz]"]', buildingNumberAddition, 'buildingnumberaddition', { force: true });
    fillInput('input[name="tx_form_formframework[aufnahmeantrag-15331][zipcode]"]', zipcode, 'zipcode', { delay: 100 });

    // Stadt "pasten" statt tippen
    cy.get('input[name="tx_form_formframework[aufnahmeantrag-15331][city]"]').then($input => {
      $input.val(city); // Setze den Wert direkt
      cy.wrap($input).trigger('input'); // Löse das input Event aus
      cy.log(`Pasted city with value: ${city}`);
    });

    // Universität "pasten" statt tippen
    cy.get('input[name="tx_form_formframework[aufnahmeantrag-15331][university]"]').then($input => {
      $input.val(university); // Setze den Wert direkt
      cy.wrap($input).trigger('input'); // Löse das input Event aus
      cy.log(`Pasted university with value: ${university}`);
    });

    // Studiengang auswählen und überprüfen
    cy.get('#aufnahmeantrag-15331-courseOfStudies').select('A', { force: true }).then(() => {
      cy.log('Selected course of studies: A');
    });

    cy.get('#aufnahmeantrag-15331-courseOfStudies').should('have.value', 'A').then(() => {
      cy.log('Verified course of studies selection: A');
    });

    fillInput('input[name="tx_form_formframework[aufnahmeantrag-15331][endOfStudies]"]', '2026', 'end of studies', { force: true });

    // // Dateianhang
    // cy.get('input[name="tx_form_formframework[aufnahmeantrag-15331][studienbescheinigung]"]').as('fileinput');
    // cy.fixture('Studienbescheinigung.pdf').then(fileContent => {
    //   cy.get('@fileinput').attachFile({
    //     fileContent: fileContent.toString(),
    //     fileName: 'Studienbescheinigung.pdf',
    //     mimeType: 'application/pdf'
    //   }).then(() => {
    //     cy.log('Attached file: Studienbescheinigung.pdf');
    //   });
    // });

    // Formulareinreichung
    cy.get('button[name="tx_form_formframework[aufnahmeantrag-15331][__currentPage]"]').click().then(() => {
      cy.log('Clicked on submit button');
    });
    cy.get('[class="element-content"]').should('contain', 'Stellen Sie sich Ihre VDI nachrichten zusammen').then(() => {
      cy.log('Verified success message: Stellen Sie sich Ihre VDI nachrichten zusammen');
    });

    // Checkbox überprüfen und umschalten
    cy.get('[data-element-type="LinkedCheckbox"]').as('checkbox').invoke('is', ':checked').then((checked) => {
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

    // Weiter zum nächsten Schritt
    cy.get('button[name="tx_form_formframework[aufnahmeantrag-15331][__currentPage]"]').click().then(() => {
      cy.log('Clicked on next page button');
    });

    cy.get('[class="element-content"]').should('contain', 'Zahlungsmethode wählen und Angaben prüfen').then(() => {
      cy.log('Verified payment method page: Zahlungsmethode wählen und Angaben prüfen');
    });

    // Zahlungsinformationen eingeben
    // Dropdown öffnen
    cy.get('[data-id="aufnahmeantrag-15331-paymentMethod"]').click();

    // Eintrag mit dem sichtbaren Text auswählen
    cy.get('#bs-select-1-1').click().then(() => {
      cy.log('Selected annual payment method: Zahlung per Überweisung (nur jährlich möglich)');
    });

    // Versteckten <select> prüfen, ob der richtige Wert gesetzt wurde
    cy.get('#aufnahmeantrag-15331-paymentMethod')
      .should('have.value', 'U')
      .then(() => {
        cy.log('Verified selected value: U');
      });

    // cy.get('#aufnahmeantrag-15331-paymentInterval').parent().find('button').click().then(() => {
    //   cy.log('Opened payment interval dropdown');
    // });

    // cy.get('.dropdown-menu').contains('halbjährlich').click().then(() => {
    //   cy.log('Selected semi-annual payment interval: halbjährlich');
    // });

    // cy.get('#aufnahmeantrag-15331-paymentInterval').should('have.value', '4').find('option:selected').contains('halbjährlich').then(() => {
    //   cy.log('Verified payment interval selection: halbjährlich');
    // });

    fillInput('input[name="tx_form_formframework[aufnahmeantrag-15331][bonusRecruiter]"]', "11602563", 'bonus recruiter number');
    fillInput('input[name="tx_form_formframework[aufnahmeantrag-15331][bonusRecruiterName]"]', "Paula Huber", 'bonus recruiter name');

    // Bonusartikel auswählen
    cy.get('#aufnahmeantrag-15331-bonusDropdown').parent().find('button').click().then(() => {
      cy.log('Opened bonus dropdown');
    });

    cy.get('.dropdown-menu').contains('15´´ Laptop-Tasche grau').click().then(() => {
      cy.log('Selected bonus item: 15´´ Laptop-Tasche grau');
    });

    fillInput('#aufnahmeantrag-15331-comment', "Testreg", 'comment');

    // Einverständniserklärungen überprüfen und setzen
    cy.get('#aufnahmeantrag-15331-checkbox-2').check({ force: true }).then(() => {
      cy.log('Checked first checkbox');
    });

    cy.get('#aufnahmeantrag-15331-emailPrivatePermission').check({ force: true }).then(() => {
      cy.log('Checked email permission checkbox');
    });

    // Informationen korrigieren und zurückgehen
    cy.get('button.btn.btn-outline-primary.btn-sm').contains('Angaben korrigieren').click({ force: true }).then(() => {
      cy.log('Clicked on correct information button');
    });

    cy.get('button.btn.btn-outline-primary.btn-sm').contains('Zurück').click({ force: true }).then(() => {
      cy.log('Clicked on back button');
    });

    // Finale Einreichung
    cy.get('button[name="tx_form_formframework[aufnahmeantrag-15331][__currentPage]"]').click().then(() => {
      cy.log('Clicked on submit button');
    });

    cy.get('[class="element-content"]').should('contain', 'Stellen Sie sich Ihre VDI nachrichten zusammen').then(() => {
      cy.log('Verified final success message: Stellen Sie sich Ihre VDI nachrichten zusammen');
    });

    cy.get('button[name="tx_form_formframework[aufnahmeantrag-15331][__currentPage]"]').click().then(() => {
      cy.log('Clicked on final submit button');
    });
    cy.get('button[name="tx_form_formframework[aufnahmeantrag-15331][__currentPage]"][value="3"]').click();

  });
});

