import template from './mainlogo.hbs';
import Block from '../../utils/Block';

export interface Mainlogo {
}

export class Mainlogo extends Block<Mainlogo> {
    constructor(props: Mainlogo) {
        super('div', props);
        this.element!.classList.add("mainlogo__circle")
    }

    render() {
        return this.compile(template, {});
    }
}