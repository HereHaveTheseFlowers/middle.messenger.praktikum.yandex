import { InputProps } from '../components/input';
import Block from './Block';

export function validateInput(input: Block<InputProps>): { error: boolean, req: string } {
    const el = input.element;
    if(!el || !el.firstChild) return { error: false, req: "" }
    const inputEl = el.firstChild as HTMLInputElement
    return validate(inputEl.value, inputEl.name)
}

export function validateForm(formData: FormData | undefined): { error: boolean, req: string } {
    if(!formData) return { error: true, req: "" };
    for(const key of formData.keys()) {
        const { error } = validate(formData.get(key) as string, key)
        if(error) {
            return { error: true, req: "Some of the data you provided doesn't fit the requirements." }
        }
    }
    return { error: false, req: "" }
}

function validate(value: string, inputType: string): { error: boolean, req: string } {
    let pattern = /(.?)+/
    let requirements = "";
    switch(inputType) {
        case "first_name":
        case "second_name":
            pattern = /^[A-ZА-ЯЁ][а-яА-ЯёЁa-zA-Z]{2,20}$/
            requirements = "Only letters, first letter should be uppercase. (2-20)"
            break;
        case "login":
        case "display_name":
            pattern = /^(?=.*[A-Za-z])[a-zA-Z0-9_-]{3,20}$/
            requirements = "Only letters, numbers, '-' and '_', at least one of them should be a letter. (3-20)"
            break;
        case "email":
            pattern = /^[a-zA-Z0-9!_-]+@[A-z]([-A-z0-9]?)+\.[A-z]{2,5}$/
            requirements = "letters-letters@moreletters.com"
            break;
        case "password":
        case "oldPassword":
        case "newPassword":
            pattern = /(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z]).*$/
            requirements = "Any symbols. An uppercase letter and a number should be used. (min 8)"
            break;
        case "phone":
            pattern = /^[+]?\d{10,15}$/
            requirements = "Only numbers, may start with a '+'. (10-15)"
            break;
        case "message":
            pattern = /.+/
            requirements = "Should not be empty."
            break;
    }
    if (pattern.test(value)) {
        return { error: false, req: requirements };
    }
    else {
        return  { error: true, req: requirements };
    }
}