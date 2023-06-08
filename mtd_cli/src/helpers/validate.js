let pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const ValidateLoginForm = (email, password, status) => {
    status.message = '';
    status.flag = '';
    status.emailError = false;
    status.passwordError = false;
    
    if(email === "" || password === ""){

        status.message = 'Fields must not be empty!';
        status.flag = 'error';
        status.emailError = true;
        status.passwordError = true;

        return {...status};
    }

    if(!pattern .test(email)){
        status.message = 'Email entered incorrectly!';
        status.flag = 'error';
        status.emailError = true;

        return {...status};
    }

    if(password.length < 6){
        status.message = 'Password must be at least 6 characters!';
        status.flag = 'error';
        status.passwordError = true;

        return {...status};
    }

    return {...status};
}

export const ValidateRegistrationForm = (email, password, confirmPassword, status) => {
    status.message = '';
    status.flag = '';
    status.emailError = false;
    status.passwordError = false;
    status.confirmPasswordError = false;

    if(email === "" || password === "" || confirmPassword === ""){

        status.message = 'Fields must not be empty!';
        status.flag = 'error';
        status.emailError = true;
        status.passwordError = true;
        status.confirmPasswordError = true;

        return {...status};
    }

    if(!pattern .test(email)){
        status.message = 'Email entered incorrectly!';
        status.flag = 'error';
        status.emailError = true;

        return {...status};
    }

    if(password !== confirmPassword){
        status.message = 'Passwords are different!';
        status.flag = 'error';
        status.passwordError = true;
        status.confirmPasswordError = true;

        return {...status};
    }

    if(password.length < 6){
        status.message = 'Password must be at least 6 characters!';
        status.flag = 'error';
        status.passwordError = true;

        return {...status};
    }

    return {...status};
}

export const ValidateRecoveryForm = (email, status) => {
    status.message = '';
    status.flag = '';
    status.emailError = false;

    if(email === "" ){

        status.message = 'Fields must not be empty!';
        status.flag = 'error';
        status.emailError = true;

        return {...status};
    }

    if(!pattern .test(email)){
        status.message = 'Email entered incorrectly!';
        status.flag = 'error';
        status.emailError = true;

        return {...status};
    }

    return {...status};
}

export const ValidateNoteForm = (name, description, status) => {
    status.message = '';
    status.flag = '';
    status.nameError = false;
    status.descriptionError = false;

    if(name === "" ){

        status.message = 'Name must not be empty!';
        status.flag = 'error';
        status.nameError = true;

        return {...status};
    }

    if(description === "" ){

        status.message = 'Description must not be empty!';
        status.flag = 'error';
        status.descriptionError = true;

        return {...status};
    }
    

    return {...status};
}