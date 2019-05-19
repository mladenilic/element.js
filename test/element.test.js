import element from '../src/element.js';

describe('#element()', () => {
  it('should create instance of HTMLElement', () => {
    chai.expect(element()).to.be.instanceof(HTMLElement);
  });
});

describe('tagName parameter', () => {
  it('should have "div" as default value', () => {
    chai.expect(element().tagName).to.be.equal('DIV');
    chai.expect(element({ tagName: null }).tagName).to.be.equal('DIV');
    chai.expect(element({ tagName: false }).tagName).to.be.equal('DIV');
    chai.expect(element({ tagName: '' }).tagName).to.be.equal('DIV');
  });

  it('should accept arbirtary tag name parameter', () => {
    chai.expect(element({ tagName: 'div' }).tagName).to.be.equal('DIV');
    chai.expect(element({ tagName: 'span' }).tagName).to.be.equal('SPAN');
    chai.expect(element({ tagName: 'img' }).tagName).to.be.equal('IMG');
  });

  it('should return HTMLUnknownElement if invalid tag name is passed', () => {
    chai.expect(element({ tagName: 'unknown' })).to.be.instanceof(HTMLUnknownElement);
  });
});

describe('content parameter', () => {
  it('element should be empty if no content is provided', () => {
    chai.expect(element().hasChildNodes()).to.be.equal(false);
  });

  it('element should not be empty if content is provided', () => {
    let node = element({
      content: 'content'
    });

    chai.expect(node.hasChildNodes()).to.be.equal(true);
  });

  it('if content is string it should be equal to innerHTML', () => {
    let node = element({
      content: 'content'
    });

    chai.expect(node.innerHTML).to.be.equal('content');
  });

  it('should create child nodes if content is array', () => {
    let node = element({
      content: [{}, {}]
    });

    chai.expect(node.childNodes.length).to.be.equal(2);
  });
});

describe('attributes parameter', () => {
  it('element should not have any attribute if not provided', () => {
    chai.expect(element().attributes.length).to.be.equal(0);
  });

  it('element should have attributes if provided', () => {
    let node = element({
      attributes: {
        class: 'sample-div',
        id: 'sample-div',
        role: 'main'
      }
    });

    chai.expect(node.attributes.length).to.be.equal(3);
  });

  it('should set class list', () => {
    let node = element({
      attributes: {
        class: 'sample-div'
      }
    });

    chai.expect(node.classList.contains('sample-div')).to.be.equal(true);
  });

  it('should set dataset', () => {
    let node = element({
      attributes: {
        'data-something': 'something'
      }
    });

    chai.expect(node.dataset.something).to.be.equal('something');
  });
});

describe('events parameter', () => {
  it('should add event listener', (done) => {
    let node = element({
      events: {
        click: (e) => {
          chai.expect(e).to.be.instanceof(MouseEvent);

          done();
        }
      }
    });

    node.click();
  });

  it('should pass additional options to addEventListener', (done) => {
    let node = element({
      events: {
        click: [(e) => {
          chai.expect(e.preventDefault).to.throw();
          chai.expect(e.defaultPrevented).to.be.equal(false);

          done();
        }, { passive: true }]
      }
    });

    node.click();
  });
});
