import { Button } from './index';
import { expect } from 'chai';

describe('Button', () => {
  it('should render', () => {
    new Button({
        label: "text",
        events: {
          click: () => {
            return;
          }
        }
    });
  });

  it('element should return button', () => {
    const button = new Button({
        label: "text",
        events: {
          click: () => {
            return;
          }
        }
    });
    const element = button.element;

    expect(element).to.be.instanceof(window.HTMLButtonElement)
  });
  it('addedClassList property should add a class', () => {
    const button = new Button({
        label: "text",
        addedClassList: ["test"],
        events: {
          click: () => {
            return;
          }
        }
    });
    const className = button.element?.className;

    expect(className).to.be.equal("button test")
  });
});