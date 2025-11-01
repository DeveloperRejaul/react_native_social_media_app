export const rules = {
    password :{
       required: 'Password is required',
        minLength: {
        value: 6,
        message: 'Password must be at least 6 characters long'
        },
    },
    name:{
        required: 'name is required',
    },
    email: {
        required: 'Email is required',
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        }
    },
    confirmPassword: {
        required: 'Please confirm your password',
        validate: (value:string, formValues:any) => value === formValues.password || 'Passwords do not match'
    }
};