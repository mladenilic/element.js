import element from '../src/element.js';

describe('#element()', () => {
  it('should create instance of HTMLElement', () => {
    chai.expect(element()).to.be.instanceof(HTMLElement);
  });
});
