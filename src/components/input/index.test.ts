import { Input } from './index';
import { expect } from 'chai';

describe('Input', () => {
  it('should render', () => {
    new Input({
        name: "login",
        type: "text",
        events: {}
    });
  });

  it('divClassList property should add a class', () => {
    const input = new Input({
        name: "login",
        divClassList: ["test"],
        type: "text",
        events: {}
    });

    const className = input.element?.className;

    expect(className).to.be.equal("test");
  });
  it('getName() should return input name', () => {
    const input = new Input({
        name: "login",
        divClassList: ["test"],
        type: "text",
        events: {}
    });

    const inputName = input.getName();

    expect(inputName).to.be.equal("login");
  });
  it('getValue() should return input value', () => {
    const input = new Input({
        name: "login",
        divClassList: ["test"],
        type: "text",
        events: {}
    });
    const inputElement = input.element?.firstChild as HTMLInputElement;
    inputElement.value = "test";

    const inputValue = input.getValue();

    expect(inputValue).to.be.equal("test");
  });
});