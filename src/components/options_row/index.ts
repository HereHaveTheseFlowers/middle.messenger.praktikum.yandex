import template from './options_row.hbs';
import Block from '../../utils/Block';

export interface OptionsRowProps {
    attr_first: string;
    placeholder?: string;
    name?: string;
    type?: string;
    input?: string;
}

export class OptionsRow extends Block<OptionsRowProps> {
    constructor(props: OptionsRowProps) {
        super('div', props);
        if(this.element) this.element.classList.add("options__row")
    }

    render() {
        return this.compile(template, this.props);
    }
}