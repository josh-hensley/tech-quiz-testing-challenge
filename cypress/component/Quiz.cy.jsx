import Quiz from '../../client/src/components/Quiz'

describe('<Quiz />', () => {
    beforeEach(() => {
        cy.mount(<Quiz />)
    });
    context('Before Quiz Begins', () => {
        it('should render with a start button', () => {
            cy.get('button').should('exist').and('have.text', 'Start Quiz')
        });
    });
    context('Quiz in progress', () => {
        beforeEach(() => {
            cy.intercept('api/questions/random', { fixture: 'questions' });
            cy.get('button').click()
        });
        it('should have a question heading', () => {
            cy.get('h2').contains('?');
        });
        it('should have four answers with buttons', ()=>{
            cy.get('.card').should('exist');
            for (let i = 0; i < 4; i++){
                cy.get('.btn').eq(i).should('exist')
                cy.get('.alert').eq(i).should('exist')
            }
        })
    });
    context('Quiz Completed', () => {
        beforeEach(()=>{
            cy.intercept('api/questions/random', { fixture: 'questions' });
            cy.get('button').click();
            for (let i = 0; i < 10; i++){
                cy.get('.btn').eq(0).click()
            }
        });
        it('should have a quiz completed heading', ()=>{
            cy.get('h2').should('exist').and('have.text', 'Quiz Completed')
        });
        it('should have your score', ()=>{
            cy.get('.alert').should('exist').and('have.text', 'Your score: 2/10')
        });
        it('should have a button that says Take New Quiz', ()=>{
            cy.get('.btn').contains('Take New Quiz');
        });

    });
});

