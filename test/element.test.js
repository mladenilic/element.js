import element, { render, ref } from '../src/element.js';

describe('#element', () => {
  it('should have render method defined', () => {
    chai.expect(element.render).to.be.instanceof(Function);
  });

  it('should have ref method defined', () => {
    chai.expect(element.ref).to.be.instanceof(Function);
  });
});

describe('#render()', () => {
  it('should create instance of HTMLElement', () => {
    chai.expect(render()).to.be.instanceof(HTMLElement);
  });

  describe('tagName parameter', () => {
    it('should have "div" as default value', () => {
      chai.expect(render().tagName).to.be.equal('DIV');
      chai.expect(render({ tagName: null }).tagName).to.be.equal('DIV');
      chai.expect(render({ tagName: false }).tagName).to.be.equal('DIV');
      chai.expect(render({ tagName: '' }).tagName).to.be.equal('DIV');
    });

    it('should accept arbirtary tag name parameter', () => {
      chai.expect(render({ tagName: 'div' }).tagName).to.be.equal('DIV');
      chai.expect(render({ tagName: 'span' }).tagName).to.be.equal('SPAN');
      chai.expect(render({ tagName: 'img' }).tagName).to.be.equal('IMG');
    });

    it('should return HTMLUnknownElement if invalid tag name is passed', () => {
      chai.expect(render({ tagName: 'unknown' })).to.be.instanceof(HTMLUnknownElement);
    });
  });

  describe('content parameter', () => {
    it('element should be empty if no content is provided', () => {
      chai.expect(render().hasChildNodes()).to.be.equal(false);
    });

    it('element should not be empty if content is provided', () => {
      let node = render({
        content: 'content'
      });

      chai.expect(node.hasChildNodes()).to.be.equal(true);
    });

    it('if content is string it should be equal to innerHTML', () => {
      let node = render({
        content: 'content'
      });

      chai.expect(node.innerHTML).to.be.equal('content');
    });

    it('should create child nodes if content is array', () => {
      let node = render({
        content: [{}, {}]
      });

      chai.expect(node.childNodes.length).to.be.equal(2);
    });
  });

  describe('style parameter', () => {
    it('should assign style properties to created element', () => {
      let node = render({
        style: {
          display: 'none',
          marginLeft: '200px',
        }
      });

      chai.expect(node.style.display).to.be.equal('none');
      chai.expect(node.style.marginLeft).to.be.equal('200px');
    });
  });

  describe('attributes parameter', () => {
    it('element should not have any attribute if not provided', () => {
      chai.expect(render().attributes.length).to.be.equal(0);
    });

    it('element should have attributes if provided', () => {
      let node = render({
        attributes: {
          class: 'sample-div',
          id: 'sample-div',
          role: 'main'
        }
      });

      chai.expect(node.attributes.length).to.be.equal(3);
    });

    it('should set class list', () => {
      let node = render({
        attributes: {
          class: 'sample-div'
        }
      });

      chai.expect(node.classList.contains('sample-div')).to.be.equal(true);
    });

    it('should set dataset', () => {
      let node = render({
        attributes: {
          'data-something': 'something'
        }
      });

      chai.expect(node.dataset.something).to.be.equal('something');
    });
  });

  describe('events parameter', () => {
    it('should add event listener', (done) => {
      let node = render({
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
      let node = render({
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
});

describe('#ref()', () => {
  it('should create instance of Object', () => {
    chai.expect(ref()).to.be.instanceof(Object);
  });

  it('should have "current" property', () => {
    chai.expect(ref().current).to.be.equal(null);
  });

  it('ref should point to rendered element', () => {
    let reference = ref();
    let div = render({ ref: reference });

    chai.expect(reference.current).to.be.instanceof(HTMLElement);
    chai.expect(reference.current).to.be.equal(div);
  });
});
