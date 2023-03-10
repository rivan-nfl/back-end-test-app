export default function inputValidation(inputString = '') {
    const lowerCase = new RegExp("^(?=.*?[a-z])")
    const upperCase = new RegExp("^(?=.*?[A-Z])")
    const digit = new RegExp("^(?=.*?[0-9])")
    const specialCharacter = new RegExp("^(?=.*?[#?!@$%^&*-])")
    const min8Char = new RegExp("^.{8,}$")

    if(!min8Char.test(inputString)) return { success: false, message: 'Password must have at least 8 Characters !' };
    if(!lowerCase.test(inputString)) return { success: false, message: 'Password must have at least 1 lowercase letter !' };
    if(!upperCase.test(inputString)) return { success: false, message: 'Password must have at least 1 uppercase letter !' };
    if(!digit.test(inputString)) return { success: false, message: 'Password must have at least 1 numeric letter !' };
    if(!specialCharacter.test(inputString)) return { success: false, message: 'Password must have at least 1 special character !' };
    return { success: true, message: 'All good' };
};