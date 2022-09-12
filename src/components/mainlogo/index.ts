import template from './mainlogo.hbs';
import Block from '../../utils/Block';

export class Mainlogo extends Block<Block> {
    constructor(props?: Block) {
        super('div', props);
        if(this.element) this.element.classList.add("mainlogo__circle")
    }

    render() {
        return this.compile(template, {});
    }
}