export const validateEmail = (email: any) => {
    if (!email) {
        return "Email is Required"
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return "invalid email address"
    }
}

export const validatePassword = (password: any) => {
    if (!password) {
        return "Password is required"
    }

    if (typeof password !== 'string' || password.length < 6) {
        return "Password must be at least 6 characters long"
    }
}

export const validateField = (value: any, name: string) =>{
    if (!value) {
        return `${name} is required`
    }
}