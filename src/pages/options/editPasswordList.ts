import { OptionsRowProps } from './optionsRow';

export const editPasswordList: Array<OptionsRowProps>  = 
[
    {   
        input: "true",
        attrFirst: "Old password",
        name: "oldPassword",
        type: "password",
        placeholder: "•••••••••"    
    }, 
    { 
        input: "true",
        attrFirst: "New Password",
        name: "newPassword",
        type: "password",
        placeholder: "•••••••••••"
    }, 
    { 
        input: "true",
        attrFirst: "New Password (Again)",
        name: "newPassword",
        type: "password",
        placeholder: "•••••••••••"
    }
]
