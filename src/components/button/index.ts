import Block from '../../utils/Block';
import template from './button.hbs';

interface ButtonProps {
  label?: string;
  events?: {
    click: () => void;
  };
  added_class?: string | Array<string>;
  bgshape?: boolean;
  type?: string;
  shape_dir?: string;
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super('button', props);
    this.element!.classList.add("button")
    if(props.added_class) {
      if(Array.isArray(props.added_class)) {
        for(let newclass of props.added_class) {
          this.element!.classList.add(newclass)
        }
      } else {
        this.element!.classList.add(props.added_class)
      }
    }
    if(props.bgshape) {
      this.element!.classList.add("button__bg")
    }
    if(props.type) {
      this.element!.type = props.type
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}