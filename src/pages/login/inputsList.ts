import { InputProps } from '../../components/input';
export const inputsList: Array<InputProps> = 
[ 
    {
        divClassList: ["auth__field"], 
        inputClass: "auth__input",
        name: "login", type: "text",
        placeholder: "Login",
        events: {}
    }, 
    {
        divClassList: ["auth__field"],
        inputClass: "auth__input",
        name: "password",
        type: "password",
        placeholder: "Password",
        events: {}
    }
]
