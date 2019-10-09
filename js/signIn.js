function signIn(e) {
    e.preventDefault();
    const data = {
        username: e.target[0].value,
        password: e.target[1].value
    }
    $.ajax({
        type: 'POST',
        url: "/SignIn",
        data: data,
        success: function(result) {
            console.log("Logged In:\n" + result);
        },
        error: function() {
            throw "An error occured please try again.";
        }
    });
}

function SignInRenderError(errorMessage) {
    if (errorMessage == undefined) {
        return (null);
    } else {
        if ((errorMessage.signInError == undefined) || (errorMessage.signInError == '')) {
            return (null);
        } else {
            console.log(errorMessage.signInError);
        }
    }
}

function handleSubmit(e) {
    e.preventDefault();
    let errorMessages = {
        noError: true
    };

    if (this.state.firstName != undefined) {
        if (this.state.firstName.length == 0) {
            errorMessages.firstNameError = "Please enter a first name.";
            errorMessages.noError = false;
        }

        if (this.state.firstName != undefined) {
            if (this.state.firstName.length > 50) {
                errorMessages.firstNameError = "Please enter a first name less than 50 characters.";
                errorMessages.noError = false;
            }
        }
    } else {
        errorMessages.firstNameError = "Please enter a first name.";
        errorMessages.noError = false;
    }

    if (this.state.lastName != undefined) {
        if (this.state.lastName.length == 0) {
            errorMessages.lastNameError = "Please enter a last name.";
            errorMessages.noError = false;
        }

        if (this.state.lastName != undefined) {
            if (this.state.lastName.length > 50) {
                errorMessages.lastNameError = "Please enter a last name less than 50 characters.";
                errorMessages.noError = false;
            }
        }
    } else {
        errorMessages.lastNameError = "Please enter a last name.";
        errorMessages.noError = false;
    }

    if (this.state.email != undefined) {
        if (this.state.email.length == 0) {
            errorMessages.emailError = "Please enter an email.";
            errorMessages.noError = false;
        }

        if (this.state.email.length > 100) {
            errorMessages.emailError = "Please enter an email less than 100 characters.";
            errorMessages.noError = false;
        }

        if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email))) {
            errorMessages.emailError = "Please enter a valid email address.";
            errorMessages.noError = false;
        }
    } else {
        errorMessages.emailError = "Please enter an email.";
        errorMessages.noError = false;
    }

    if (this.state.username != undefined) {
        if (this.state.username.length == 0) {
            errorMessages.usernameError = "Please enter a username.";
            errorMessages.noError = false;
        }

        if (this.state.username.length > 50) {
            errorMessages.usernameError = "Please enter a username less than 50 characters.";
            errorMessages.noError = false;
        }
    } else {
        errorMessages.usernameError = "Please enter a username.";
        errorMessages.noError = false;
    }

    if (this.state.password != "") {
        if (this.state.password != this.state.confirmPassword) {
            errorMessages.passwordError = "Those passwords didn't match. Try again.";
            errorMessages.noError = false;
        }
    } else {
        errorMessages.passwordError = "Please enter a password.";
        errorMessages.noError = false;
    }

    if (errorMessages.noError) {
        signUp(event);
    } else {
        const returnState = {
            errorMessage,
            firstName: ((errorMessages.firstNameError == undefined) ? this.state.firstName : ''),
            lastName: ((errorMessages.lastNameError == undefined) ? this.state.lastName : ''),
            email: ((errorMessages.emailError == undefined) ? this.state.email : ''),
            username: ((errorMessages.usernameError == undefined) ? this.state.username : '')
        }
        console.log("Error:\n" + returnState);
    }
}

function signUp(e) {
    e.preventDefault();
    const data = {
        firstName: e.target[0].value,
        lastName: e.target[1].value,
        email: e.target[2].value,
        username: e.target[3].value,
        password: e.target[4].value
    }

    $.ajax({
        type: 'POST',
        url: "/SignUp",
        data: data,
        success: function(result) {
            if (result.errorMessage != undefined) {
                let returnState = {
                    errorMessage: result.errorMessage,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: result.email
                }
                
                document.cookie = returnState;
                console.log(returnState);
            } else {
                alert("New user created successfuly.")
            }
        },
        error: function () {
            throw "An error occured please try again.";
        }
    });
}