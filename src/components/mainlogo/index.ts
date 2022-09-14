import template from './mainLogo.hbs';
import Block from '../../utils/Block';

export class MainLogo extends Block {
    constructor() {
        super('div');
        if(this.element) this.element.classList.add("mainlogo__circle")
    }

    render() {
        return this.compile(template, {});
    }
}