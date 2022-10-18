import { MainLogo } from './index';
import { expect } from 'chai';

describe('MainLogo', () => {
  it('should render', () => {
    new MainLogo();
  });

  it('element should return div', () => {
    const mainlogo = new MainLogo();
    const element = mainlogo.element;

    expect(element).to.be.instanceof(window.HTMLDivElement)
  });
  it('should have class mainlogo__circle', () => {
    const mainlogo = new MainLogo();
    const className = mainlogo.element?.className;

    expect(className).to.be.equal("mainlogo__circle")
  });
});