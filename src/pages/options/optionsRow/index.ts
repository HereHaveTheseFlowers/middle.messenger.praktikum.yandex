import template from './optionsRow.hbs';
import Block from '../../../utils/Block';
import { Input } from '../../../components/input';

export interface OptionsRowProps {
    attrFirst: string;
    placeholder?: string;
    name?: string;
    type?: "text" | "password";
    input?: string;
}

export class OptionsRow extends Block<OptionsRowProps> {
    constructor(props: OptionsRowProps) {
        super('div', props);
        if(this.element) this.element.classList.add("options__row")
    }
    init() {
        if(this.props.input) {
            this.children.input = new Input({ 
                divClassList: ["options__inputdiv"],
                inputClass: "options__attribute options__attribute__right",
                name: this.props.name?.toString() as string,
                type: this.props.type?.toString() as "text" | "password",
                placeholder: this.props.placeholder?.toString() as string,
                events: {}
            });
            this.props.input = '';
        }
    }
    render() {
        return this.compile(template, this.props);
    }
}