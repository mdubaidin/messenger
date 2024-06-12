const emailValidator = (v: string) =>
    /^(?!\.)([\w-]|(\.(?!\.))|(\+(?!\+)))+@([\w-]+\.(?!\.))+[\w-]{2,4}$/.test(v);
const phoneValidator = (v: string) => /^\d{3}-\d{3}-\d{4}$/.test(v); // bugfix
const usernameValidator = (v: string) => /^[a-z]([a-z0-9]|(\.(?!\.)))*[a-z0-9]$/.test(v);

const stripeIdValidator = (v: string) => /^prod_[a-zA-Z0-9]+$/.test(v);

export { emailValidator, phoneValidator, usernameValidator, stripeIdValidator };
