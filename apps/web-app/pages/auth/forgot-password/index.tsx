// import { checkIfEmailExisit } from "@web-app/api/user";
import { useForgotPasswordMutation } from '@data-access/hooks';
import { ResponseError } from '@data-access/types/responseError';
import { CognitoEmailDto } from '@dto';
import { Form } from '@ui';
import AuthenticationLayout from '@web-app/components/layouts/authentication/authentication';
import PrimaryLayout from '@web-app/components/layouts/primary-layout/primary-layout';
import { ROUTES } from '@web-app/config/constants';
import { schema, structure } from '@web-app/config/formStructure/forgotPasswordStructure';
import LOGIN_LOGO from '@web-app/public/assets/latus-group_logo.png';
import { NextPageWithLayout } from '@web-app/types/pages';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';



export const ForgotPassword: NextPageWithLayout = () => {
    const [error, setError] = useState<{ [key: string]: string }>(null);
    const [success, setSuccess] = useState<{ [key: string]: string }>(null);

    const forgotPasswordMutation = useForgotPasswordMutation();

    useEffect(() => {
        if ((forgotPasswordMutation.error as ResponseError)?.response?.status === 401) {
            setError({
                email: 'We could not find any account with this email address. Please check your details and try again.'
            });
        }
    }, [(forgotPasswordMutation.error as ResponseError)?.response?.status]);

    const handleSubmit = async (data: CognitoEmailDto) => {
        forgotPasswordMutation.mutate(data);
        
        // ilalagay sa onSuccess
        structure[0].fields[0][0]['extra'] = <p className='p-2 text-sm'>
            Email sent! Check you email to reset password.
        </p>;

        setSuccess({email: 'Didn\'t receive email? '});

    };

    return (
        <div className={styles['container']}>
            <div className={styles['container__header']}>
                <div className="relative mx-auto h-[2.75rem] w-[9.688rem]">
                    <Image src={LOGIN_LOGO} alt="Latus Group Logo" fill />
                </div>
            </div>
            
            <div className={styles['container__body']}>
                <div className='mb-10'>
                    <h5 className="font-semibold text-xl text-BLGR600 mb-3">
                        FORGOT PASSWORD
                    </h5>

                    <h5 className ='text-sm text-N700'>
                        Please enter your email to reset the password
                    </h5>
                </div>


                <Form
                    structure={structure}
                    schema={schema}
                    data={{ email: '' }}
                    onSubmitForm={handleSubmit}
                    isProcessing={forgotPasswordMutation.isLoading}
                    submitLabel='Continue'
                    resultError={error}
                    resetResultError={() => setError(null)}/>

                {success?.email && (
                    <div className='pt-6 text-center'>
                        <h5 className='text-sm'>
                            {success.email}
                            <span className='text-BLGR500 underline hover:cursor-pointer'>
                                Resend Email
                            </span>
                        </h5> 
                        
                    </div>
                )}

                <div className='text-sm mt-20'>
                    <h6 className='text-center'>
                        Back to&nbsp;
                        <Link href = {ROUTES.AUTH_LOGIN} className='text-BLGR300'>
                             Login     
                        </Link> 
                        &nbsp;Page
                    </h6>
                </div>
                    
            
            </div>
           
        </div>
    );
};

export default ForgotPassword;

ForgotPassword.getLayout = (page) => {
    return (
        <PrimaryLayout title='Latus Group | Forgot Password'>
            <AuthenticationLayout>
                {page}
            </AuthenticationLayout>
        </PrimaryLayout>
    );
};