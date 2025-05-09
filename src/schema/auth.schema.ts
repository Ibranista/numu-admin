import * as Yup from 'yup';

export const initialState = {
    first_name: '',
    last_name: '',
    email: '',
    role: 'parent',
    password: '',
}

export const registerUserSchema = Yup.object({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    role: Yup.string().oneOf(['parent', 'admin'], 'Invalid role').required('Role is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const loginInitialState = {
    email: '',
    password: '',
}

export const loginSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});
