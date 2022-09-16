import Block from '../../utils/Block';
import template from './button.hbs';

interface ButtonProps {
  label?: string;
  events?: {
    click: () => void;
  };
  addedClassList?: Array<string>;
  bgshape?: boolean;
  type?: "button";
  shapeDir?: "left" | "right";
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super('button', props);

    if(!this.element) return;

    this.element.classList.add("button")
    if(props.addedClassList) {
      this.element.classList.add(...props.addedClassList)
    }
    if(props.bgshape) {
      this.element.classList.add("button__bg")
    }
    if(props.type) {
      const thisbutton = this.element as HTMLButtonElement 
      thisbutton.type = props.type
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}