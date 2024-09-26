const validation = (values) => {
    let error = {};

    if (!values.email) {
        error.email = "Email should not be empty";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        error.email = "Email address is invalid";
    }

    if (!values.password) {
        error.password = "Password should not be empty!";
    } else if (values.password.length < 1) {
        error.password = "Password should be at least 6 characters long!";
    }

    return error;
}

export default validation;
