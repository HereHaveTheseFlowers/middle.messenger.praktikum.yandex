import template from './arrow.hbs';
import Block from '../../utils/Block';

export interface ArrowProps {
    flip?: string;
}

export class Arrow extends Block<ArrowProps> {
    constructor(props: ArrowProps) {
        super('div', props);
        if(this.element) this.element.classList.add("arrow")
    }

    render() {
        return this.compile(template, this.props);
    }
}