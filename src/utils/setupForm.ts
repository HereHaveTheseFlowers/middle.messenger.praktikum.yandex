import { validateForm } from './validate';
import hasClass from './hasClass';
import Block from './Block';


export default function setupForm(formClass: string, formBlock?: Block, image = false) {
    const element = document.querySelector('.' + formClass);
    if(!element) return;
    const formListener = function(e: Event) {
      e.preventDefault();
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
        const errorDiv = document.createElement("div");
        errorDiv.classList.add("input__error");
        const errorIcon = document.createElement("span");
        errorIcon.innerHTML = "&#9888; ";
        errorDiv.append(errorIcon);
        errorDiv.textContent += req;
        errorDiv.style.zIndex = "6000";
        errorDiv.addEventListener('click', (e) => {
          e.preventDefault();
          errorDiv.style.display = 'none';
        });
        element.append(errorDiv);
        return;
      }

      const output: Record<string, string> = {};
      for(const data of formData) {
        output[data[0].toString()] = data[1].toString();
      }
      if(formBlock) formBlock.onSubmit(output, formClass);
    }
    element.removeEventListener('submit', formListener );
    element.addEventListener('submit', formListener );
}

