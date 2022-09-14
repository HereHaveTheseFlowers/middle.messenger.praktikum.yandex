import template from './input.hbs';
import Block from '../../utils/Block';

export interface InputProps {
    inputClass?: string;
    divClassList?: Array<string>;
    name: string;
    type: "text" | "password";
    placeholder: string;
    events: {
        focusout: () => void;
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
    render() {
        return this.compile(template, this.props);
    }
}