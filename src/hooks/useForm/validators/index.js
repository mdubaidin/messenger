const validators = {
    email: email =>
        /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/.test(email) ? "" : "Email is not valid",
    phone: phone => (/^\d{10}$/.test(phone) ? "" : "Phone number must be 10 digits long"),
};

export default validators;
