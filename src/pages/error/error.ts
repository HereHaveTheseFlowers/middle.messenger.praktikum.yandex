import template from './error.hbs';
import Block from '../../utils/Block';
import { Button } from '../../components/button';

export interface ErrorProps {
    error_number: string;
    error_desc: string;
    errorbutton: Button;
}

export class ErrorPage extends Block<ErrorProps> {
    constructor(props: ErrorProps) {
        super('div', props);
        this.element!.classList.add("error__container")
    }
    render() {
        return this.compile(template, this.props);
    }
}