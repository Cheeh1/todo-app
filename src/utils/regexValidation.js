export const Email_Regex_Validation = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

// Password must contain at least a digit, special symbol, Uppercase, Lowercase and 8-10 characters long
export const Password_Regex_Validation =
  /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,16}$/;

export const Phone_Regex_Validation =
  /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
