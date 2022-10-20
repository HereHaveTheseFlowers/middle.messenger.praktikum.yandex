import { Arrow } from './index';
import { expect } from 'chai';

describe('Arrow', () => {
  it('should render', () => {
    new Arrow({});
  });

  it('element should return div', () => {
    const arrow = new Arrow({});
    const element = arrow.element;

    expect(element).to.be.instanceof(window.HTMLDivElement)
  });
  it('flip: true should add arrow__shape__flip class', () => {
    const arrow = new Arrow({ flip: true });
    const child = arrow.element?.firstChild as HTMLElement
    const className = child.className;

    expect(className).to.be.equal("arrow__shape arrow__shape__flip")
  });
});