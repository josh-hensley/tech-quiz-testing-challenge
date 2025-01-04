// import React from 'react'
import Quiz from '../../client/src/components/Quiz'

describe('<Quiz />', () => {
    beforeEach(() => {
        cy.mount(<Quiz />)
    });
    it('renders', () => { });
    it('should have a start button', () => {
        cy.get('button').should('exist').and('have.text', 'Start Quiz')
    })
    it('should start a quiz when start button is clicked', () => {
        cy.fixture('questions').then((questions) => {
            cy.get('button').click();
            cy.intercept('/api/questions/random', questions);
            cy.get('h2').should('exist');
        });
    });
    it('should present a new question when a question is answered', () => {
        cy.fixture('questions').then((questions) => {
            cy.get('button').click();
            cy.intercept('/api/questions/random', questions);
            cy.get('h2').contains(questions[0].question);
            cy.get('button').eq(3).click();
            cy.get('h2').contains(questions[1].question);
        });
    });
    it('should end quiz when all questions are answered', () => {
        cy.fixture('questions').then((questions) => {
            cy.get('button').click();
            cy.intercept('/api/questions/random', questions);
            for (const item of questions) {
                cy.get('h2').contains(item.question);
                cy.get('.btn').eq(0).click();
            }
            cy.get('h2').should('have.text', 'Quiz Completed')
        });
    });
    it('should show score when quiz is over', () => {
        cy.fixture('questions').then((questions) => {
            cy.get('button').click();
            cy.intercept('/api/questions/random', questions);
            for (const item of questions) {
                cy.get('h2').contains(item.question);
                cy.get('.btn').eq(0).click();
            }
            cy.get('.alert').contains('Your score:')
        });
    });
    it('should start a new quiz when Take New Quiz button is pressed', () => {
        cy.fixture('questions').then((questions) => {
            cy.get('button').click();
            cy.intercept('/api/questions/random', questions);
            for (const item of questions) {
                cy.get('h2').contains(item.question);
                cy.get('.btn').eq(0).click();
            }
            cy.get('.btn').should('have.text', 'Take New Quiz').click();
            cy.get('h2').should('exist').and('have.text', questions[0].question);
        });
    });
});
