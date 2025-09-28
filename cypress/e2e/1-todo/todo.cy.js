import 'cypress-real-events/support';

describe('todo list app', () => {
  it('할 일이 존재하지 않는다면 "There are no to-do items. Please write your to-dos" 가 나타난다.', () => {
    cy.visit('http://localhost:5173');
    cy.get('.todo-list-item').should('not.exist');
    cy.get('.todo-empty-msg').should(
      'contain',
      'There are no to-do items. Please write your to-dos'
    );
  });

  describe('할 일을 누르고 엔터를 누르면', () => {
    it('목록에 노출된다', () => {
      cy.visit('http://localhost:5173');
      cy.get('.todo-input').type('밥먹기{enter}');
      cy.get('.todo-list-item').should('contain', '밥먹기');
    });

    it('완료되지않은 갯수가 +1 된다', () => {
      cy.visit('http://localhost:5173');
      cy.get('.todo-input').type('밥먹기{enter}');
      cy.get('#incomplete').should('contain', 1);
    });
  });

  describe('할 일 항목을 체크하면', async () => {
    it('완료된 항목은 목록 하단으로 이동하고, 완료된 항목의 갯수가 갱신된다', () => {
      cy.visit('http://localhost:5173');
      cy.get('.todo-input').type('밥먹기1{enter}');
      cy.get('.todo-input').type('밥먹기2{enter}');
      cy.get('.todo-input').type('밥먹기3{enter}');

      cy.get('.todo-list-item:first-child input').should('not.be.checked');
      cy.get('.todo-list-item:first-child input')
        .invoke('attr', 'id')
        .then((beforeKey) => {
          cy.get('.todo-list-item:first-child input').click();

          cy.get('.todo-list-item:last-child input')
            .invoke('attr', 'id')
            .then((afterKey) => {
              expect(beforeKey).to.equal(afterKey);
            });
        });

      cy.get('#complete').should('contain', 1);
    });

    it('완료된 항목을 체크해제하면 목록 상단으로 이동하고, 미완료된 항목의 갯수가 갱신된다', () => {
      cy.visit('http://localhost:5173');
      cy.get('.todo-input').type('밥먹기1{enter}');
      cy.get('.todo-input').type('밥먹기2{enter}');
      cy.get('.todo-input').type('밥먹기3{enter}');
      cy.get('.todo-list-item:first-child input').click();

      cy.get('.todo-list-item:last-child input').should('be.checked');

      cy.get('.todo-list-item:last-child input')
        .invoke('attr', 'id')
        .then((beforeKey) => {
          cy.get('.todo-list-item:last-child input').click();

          cy.get('.todo-list-item:first-child input')
            .invoke('attr', 'id')
            .then((afterKey) => {
              expect(beforeKey).to.equal(afterKey);
            });
        });

      cy.get('#incomplete').should('contain', 3);
    });
  });

  describe('clear complete 를 클릭하면', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173');
      cy.get('.todo-input').type('밥먹기1{enter}');
      cy.get('.todo-input').type('밥먹기2{enter}');
      cy.get('.todo-input').type('밥먹기3{enter}');
      cy.get('.todo-list-item:first-child input').click();
    });
    it('완료된 항목은 목록에서 제거되고 갯수가 0으로 초기화된다.', () => {
      cy.get('.todo-list-item:first-child input').click();
      cy.get('.todo-list-item:first-child input').click();
      cy.get('.todo-list-item:first-child input').click();

      cy.get('.btn-clear')
        .click()
        .then(() => {
          cy.get('#complete').should('contain', 0);
        });
    });
  });

  describe('Filter 버튼에서 ', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173');
      cy.get('.todo-input').type('밥먹기1{enter}');
      cy.get('.todo-input').type('밥먹기2{enter}');
      cy.get('.todo-list-item:first-child input').click();
    });
    it('all 을 클릭하면, 모든 목록을 노출한다,', () => {
      cy.get('.btn-todo-all')
        .click()
        .then(() => {
          cy.get('.todo-list-item input').should('have.length', 2);
        });
    });

    it('active 를 클릭하면, 완료되지 않은 목록을 노출한다,', () => {
      cy.get('.btn-todo-active')
        .click()
        .then(() => {
          cy.get('.todo-list-item input').should('not.be.checked');
        });
    });

    it('complete 를 클릭하면, 완료된 않은 목록을 노출한다,', () => {
      cy.get('.btn-todo-completed')
        .click()
        .then(() => {
          cy.get('.todo-list-item input').should('be.checked');
        });
    });
  });

  describe('드래그앤드롭 ', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173');
      cy.get('.todo-input').type('밥먹기1{enter}');
      cy.get('.todo-input').type('밥먹기2{enter}');
      cy.get('.todo-input').type('밥먹기3{enter}');
    });

    it('Drag & Drop하여 목록 내부 순서를 바꿀 수 있다.', () => {
      cy.visit('http://localhost:5173');

      cy.get('.todo-list-item:first-child input')
        .invoke('attr', 'id')
        .then((beforeKey) => {
          cy.get('.todo-list-item:first-child .btn-drag').realMouseDown();
          cy.get('body').find('.is-dragging').should('exist');
          cy.get('body').realMouseMove(738, 185);
          cy.get('body').find('.drop-guideline').should('exist');
          cy.get('.todo-list-item').realMouseUp();

          cy.get('.todo-list-item:nth-child(2) input')
            .invoke('attr', 'id')
            .then((afterKey) => {
              expect(beforeKey).to.equal(afterKey);
            });

          cy.get('body').find('.is-dragging').should('not.exist');
        });
    });

    it('목록 외부로 드롭 하는 경우 드래그가 취소된다', () => {
      cy.visit('http://localhost:5173');
      cy.get('.todo-list-item:first-child .btn-drag').realMouseDown();
      cy.get('body').find('.is-dragging').should('exist');
      cy.get('body').realMouseMove(0, 0);
      cy.get('body').realMouseUp();

      cy.get('.todo-list-item:nth-child(1)').should('contain', '밥먹기3');
      cy.get('.todo-list-item:nth-child(2)').should('contain', '밥먹기2');
      cy.get('.todo-list-item:nth-child(3)').should('contain', '밥먹기1');
      cy.get('body').find('.is-dragging').should('not.exist');
    });

    it('드래그 도중 ESC 키를 누른 경우 드래그가 취소된다', () => {
      cy.visit('http://localhost:5173');
      cy.get('.todo-list-item:first-child .btn-drag').realMouseDown();
      cy.get('body').find('.is-dragging').should('exist');
      cy.get('body').realPress('Escape');

      cy.get('.todo-list-item:nth-child(1)').should('contain', '밥먹기3');
      cy.get('.todo-list-item:nth-child(2)').should('contain', '밥먹기2');
      cy.get('.todo-list-item:nth-child(3)').should('contain', '밥먹기1');
      cy.get('body').find('.is-dragging').should('not.exist');
    });
  });
});
