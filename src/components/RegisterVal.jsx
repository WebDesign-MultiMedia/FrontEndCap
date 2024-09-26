const  validation = (values) => {
    let error = {}

    if (values.firstName === "") {
        error.firstName = "First Name should not be empty";
    }

    if (values.lastName === "") {
        error.lastName = "Last Name should not be empty";
    }

    if (values.email === "") {
        error.email = "Email should not be empty";
    }

    if (values.password === "") {
        error.password = "Password should not be empty!";
    }

    if (values.role === "") {
        error.role = "Role should not be empty!";
    }

    return error;
}

export default validation;
