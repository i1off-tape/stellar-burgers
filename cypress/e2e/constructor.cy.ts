/// <reference types="cypress" />
describe('Добавление ингредиентов в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('Добавляем основной ингредиент булку', () => {
    cy.get('[data-cy=ingredients-bun]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Краторная булка N-200i')
      .should('exist');
  });

  it('Добавляем начинку булки', () => {
    cy.get('[data-cy=ingredients-main]').contains('Добавить').click();
    cy.get('[data-cy=ingredients-sauce]').contains('Добавить').click();
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Соус Spicy-X')
      .should('exist');
  });
});

describe('Проверка открытия и закрытия модального окна для создания заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('Проверяем открытие модального окна', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy=cal]').contains('420').should('exist');
    cy.get('[data-cy=proteins]').contains('80').should('exist');
    cy.get('[data-cy=fat]').contains('24').should('exist');
    cy.get('[data-cy=carbohydrates]').contains('53').should('exist');
  });

  it('Проверяем кнопку закрытия модального окна', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=close-modal]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Проверяем закрытие вне модального окна', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-overlay]').click('left', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('Проверка работы модального окна при создании заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'postOrder.json' }).as(
      'postOrder'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );

    window.localStorage.setItem('refreshToken', 'testToken');
    cy.setCookie('accessToken', 'Bearer testToken');
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Оформляем заказ', () => {
    cy.get('[data-cy=ingredients-bun]').contains('Добавить').click();
    cy.get('[data-cy=ingredients-main]').contains('Добавить').click();
    cy.get('[data-cy=ingredients-sauce]').contains('Добавить').click();
    cy.get('[data-cy=order-button]').click();

    cy.get('[data-cy=modal]').should('exist');

    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: ['1', '2', '3', '1']
      });

    cy.get('[data-cy=order-number]').contains('95983').should('exist');

    cy.get('[data-cy=close-modal]').click();

    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy=constructor-bun-top-empty]').should('exist');
    cy.get('[data-cy=constructor-filling-empty]').should('exist');
    cy.get('[data-cy=constructor-bun-bottom-empty]').should('exist');
  });
});
