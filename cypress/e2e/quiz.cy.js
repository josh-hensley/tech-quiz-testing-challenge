describe('Quiz Cycle', ()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3001')
    })
    context('Quiz Setup', ()=>{
        it('should render', () => {});
        it('should start quiz when button is clicked', ()=>{
            cy.get('button').contains('Start Quiz').click();
            cy.get('h2').should('exist');
            cy.get('.btn').eq(0).contains(1);
        });
    });
    context('Quiz in progress', ()=>{
        beforeEach(()=>{
            cy.get('button').click();
        })
        it('should present a new question when answer is clicked', ()=>{
            cy.get('h2').then(($el)=>{
                cy.get('.btn').eq(0).click()
                cy.get('h2').should('not.equal', $el)
            });  
        });
        it('should end the quiz when all questions are answered', ()=>{
            for (let i = 0; i < 10; i++) {
                cy.get('.btn').eq(0).click();
            }
            cy.get('h2').contains('Quiz Completed')
        });
    });

    context('Quiz Restart', ()=>{
        it('Should restart with new questions when Take New Quiz is clicked', ()=>{
            cy.get('button').click();
            cy.get('h2').then(($el)=>{
                for (let i = 0; i < 10; i++){
                    cy.get('.btn').eq(0).click()
                }
                cy.get('.btn').contains('Take New Quiz').click();
                cy.get('h2').should('not.equal', $el);
            })
        })
    });
});