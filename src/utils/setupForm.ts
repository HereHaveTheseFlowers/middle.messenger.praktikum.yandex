import { validateForm } from './validate';
import hasClass from './hasClass';

export default function setupForm(formClass: string) {
    const element = document.querySelector('.' + formClass);
    if(!element) return;
    element.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
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

      //change this on the later sprint
      console.log(output);
  });
}

