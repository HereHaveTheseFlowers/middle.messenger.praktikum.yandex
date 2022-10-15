export default function makeErrorInForm(formClass: string, errorText: string) {
    const errorForm = document.querySelector('.'+formClass);
    if(!errorForm) return;
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("input__error");
    errorDiv.style.left = 'auto';
    errorDiv.style.right = 'auto';
    errorDiv.style.top = 'auto';
    errorDiv.style.bottom = '30%';
    const errorIcon = document.createElement("span");
    errorIcon.innerHTML = "&#9888; ";
    errorDiv.append(errorIcon);
    errorDiv.textContent += errorText;
    errorDiv.style.zIndex = "6000";
    errorDiv.addEventListener('click', (e) => {
      e.preventDefault();
      errorDiv.style.display = 'none';
    });
    errorForm.append(errorDiv);
    return;
}