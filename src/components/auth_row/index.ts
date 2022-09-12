import template from './auth_row.hbs';
import Block from '../../utils/Block';

export interface AuthProps {
    div_class?: string;
    name: string;
    type: string;
    placeholder: string;
}

export class AuthRow extends Block<AuthProps> {
    constructor(props: AuthProps) {
        super('div', props);
        if(this.element)  this.element.classList.add("auth__field")
        if(props.div_class) {
            if(this.element) this.element.classList.add(props.div_class)
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}