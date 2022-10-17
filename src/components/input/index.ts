import template from './input.hbs';
import Block from '../../utils/Block';
import { validateInput } from '../../utils/validate';
import hasClass from '../../utils/hasClass';

export interface InputProps {
    inputClass?: string;
    divClassList?: Array<string>;
    name: string;
    type: "text" | "password";
    placeholder: string;
    events: {
        focusout?: () => void;
        click?: () => void;
    };
}

export class Input extends Block<InputProps> {
    constructor(props: InputProps) {
        super('div', props);
        if(!this.element) return;
        if(props.divClassList) {
            this.element.classList.add(...props.divClassList)
        }
    }
    init() {
        this.props.events = {
            focusout: () => {
                const { error, req } = validateInput(this);
                if(error) {
                    this.element?.append(this.createError(req));
                }
                else {
                    this.cleanErrors();
                }
            } 
        }
    }
    private createError(req: string): HTMLElement {
        this.cleanErrors();
        const errorDiv = document.createElement("div");
        errorDiv.classList.add("input__error");
        const errorIcon = document.createElement("span");
        errorIcon.innerHTML = "&#9888; "
        errorDiv.append(errorIcon);
        errorDiv.textContent += req;
        errorDiv.style.zIndex = "6000"
        errorDiv.addEventListener('click', (e) => {
          e.preventDefault();
          errorDiv.style.display = 'none';
        });
        return errorDiv;
    }
    private cleanErrors() {
        if(!this.element) return;
        for(let i = 0; i <= this.element.children.length; i++) {
            if(hasClass(this.element.lastChild as HTMLElement, "input__error")) {
                this.element.removeChild(this.element.lastChild as HTMLElement)
            }
        }
    }
    public getName(): string | undefined {
        if(!this.element) return;
        for(const child of this.element.children) {
            if(child.tagName === "INPUT") {
                const childinput: HTMLInputElement = child as HTMLInputElement;
                return childinput.name;
            }
        }
        return;
    }
    public getValue(): string | undefined {
        if(!this.element) return;
        for(const child of this.element.children) {
            if(child.tagName === "INPUT") {
                const childinput: HTMLInputElement = child as HTMLInputElement;
                return childinput.value;
            }
        }
        return;
    }
    render() {
        return this.compile(template, this.props);
    }
}