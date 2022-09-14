import template from './error.hbs';
import Block from '../../utils/Block';
import { Button } from '../../components/button';

export interface ErrorProps {
    errorNumber: string;
    errorDesc: string;
    errorButton: Button;
}

export class ErrorPage extends Block<ErrorProps> {
    constructor(props: ErrorProps) {
        super('div', props);
        if(this.element) this.element.classList.add("error__container")
    }
    render() {
        return this.compile(template, this.props);
    }
}