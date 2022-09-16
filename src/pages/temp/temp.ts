import template from './temp.hbs';
import Block from '../../utils/Block';

    
export class TempPage extends Block {
    constructor() {
        super('div');
    }
    render() {
        return this.compile(template, this.props);
    }
}
