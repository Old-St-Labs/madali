import { FormSection } from '@ui-types/input';
import * as yup from 'yup';

export const schema = yup.object().shape({
    verificationCode: yup.string().required('Please enter verification code'),
    password: yup.string().required('Please enter a password')
        // eslint-disable-next-line no-useless-escape
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'Your password does not meet the minimum security requirements. Please input a different password.'),
    confirmPassword: yup.string().required('Please enter a confirm password')
        .oneOf([yup.ref('password'), null], 'Passwords do not match!')
});
// The passwords you entered do not match. Please try again.
export const structure: FormSection[] = [{
    fields: [    
        [
            { label: 'Verification Code', placeholder: '', name: 'verificationCode' }
        ],
        [
            { label: 'New Password', placeholder: '', name: 'password', inputType: 'password' }
        ], [
            { label: 'Confirm Password', placeholder: '', name: 'confirmPassword', inputType: 'password' }
        ]]
}];

