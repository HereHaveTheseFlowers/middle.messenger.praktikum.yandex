import { validateForm } from './validate';
import hasClass from './hasClass';
import Block from './Block';
import makeErrorInForm from './makeErrorInForm';

const handlers: Record<string, (...args: Event[])=>void > = {};
const formSubmit = function(formClass: string, formBlock: Block, image: boolean) {
  return handlers[formClass] || (handlers[formClass] =  function curried_func(e: Event) {
    e.preventDefault();
    const element = document.querySelector('.' + formClass);
    if(!element) return;
    const formData = new FormData(e.target as HTMLFormElement);
    if(image && formBlock) {
      formBlock.onSubmit(formData, formClass);
      return;
    }
    const { error, req } = validateForm(formData);
    for(let i = 0; i <= element.children.length; i++) {
      if(hasClass(element.lastChild as HTMLElement, "input__error")) {
        element.removeChild(element.lastChild as HTMLElement);
      }
    }
    if(error) {
      makeErrorInForm(formClass, req);
      return;
    }
    const output: Record<string, string> = {};
    for(const data of formData) {
      output[data[0].toString()] = data[1].toString();
    }
    formBlock.onSubmit(output, formClass);
  })
}

export default function setupForm(formClass: string, formBlock: Block, image = false) {
    const element = document.querySelector('.' + formClass);
    if(!element) return;
    element.removeEventListener('submit', formSubmit(formClass, formBlock, image));
    element.addEventListener('submit', formSubmit(formClass, formBlock, image));
}

