// eslint-disable-next-line @nx/enforce-module-boundaries
import { useConfirmPasswordChangeMutation } from '@data-access/hooks';
import { Button, Form } from '@ui';
import AuthenticationLayout from '@web-app/components/layouts/authentication/authentication';
import PrimaryLayout from '@web-app/components/layouts/primary-layout/primary-layout';
import { ROUTES } from '@web-app/config/constants';
import { schema, structure } from '@web-app/config/formStructure/setNewPassword';
// import { useCountdown } from '@web-app/hooks/useCountdown';
import LOGIN_LOGO from '@web-app/public/assets/latus-group_logo.png';
import { NextPageWithLayout } from '@web-app/types/pages';
import clsx from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './index.module.scss';
import { CognitoForgotPasswordDto } from '@dto';


/* eslint-disable-next-line */
export interface SetNewPasswordProps { }

export const SetNewPassword: NextPageWithLayout<SetNewPasswordProps> = () => {
    const router = useRouter();

    // const { countdown, enableCounting, isCounting } = useCountdown();

    const [success, setSuccess] = useState<boolean>(false);

    // mutation hooks
    // const resendCodeMutation = useResendConfirmationMutation(enableCounting);
    const confirmPasswordMutation = useConfirmPasswordChangeMutation();

    const [error, setError] = useState<{ [key: string]: string }>(null);

    const handleSubmit = async (data: { [key: string]: string }) => {
        confirmPasswordMutation.mutate({
            email: router.query.email as string,
            password: data.password,
        } as CognitoForgotPasswordDto
        );

        setSuccess(true);
    };

    // const handleRequestNew = async () => {
    //     enableCounting(true);

    //     try {
    //         await Cognito.resendConfirmationCode(router.query.email as string);

    //         setFlashNotification({
    //             title: 'New verification code has been sent to your email address',
    //             message: 'Please check your inbox and enter the code to continue.',
    //             alertType: 'success'
    //         });
    //     } catch (err) {
    //         setFlashNotification({
    //             title: 'Failed to resend verification code',
    //             message: 'Please try again.',
    //             alertType: 'error'
    //         });
    //     }
    // };

    // prevent user from requesting new code while request is still processing
    // const handleRequestNew = async () => {
    //     // prevent request if account is being verified
    //     if (confirmPasswordMutation) return;
    //     enableCounting(true);

    //     resendCodeMutation.mutate(router.query.email as string);
    // };

    // structure[0].fields[0][0]['extra'] = <div className='flex flex-row items-center'>
    //     <Typography className='p-1'>{'Didn’t receive a code?'}</Typography>
    //     <Typography className='w-12'>
    //         {isCounting
    //             ? countdown
    //             : <span onClick={handleRequestNew} className='cursor-pointer font-semibold text-B600'>
    //                 Resend
    //             </span>
    //         }
    //     </Typography>
    // </div>;

    return (
        
        <div className={styles['container']}>
            <div className={styles['container__header']}>
                <div className="relative mx-auto h-[2.75rem] w-[9.688rem]">
                    <Image src={LOGIN_LOGO} alt="Latus Group Logo" fill />
                </div>
            </div>
            
            <div className={styles['container__body']}>
                  
                { !success ? 
                    (
                        <>
                            <h5 className="font-semibold text-xl text-BLGR600 mb-4">
                                SET NEW PASSWORD
                            </h5>

                            <Form
                                structure={structure}
                                schema={schema}
                                onSubmitForm={handleSubmit}
                                isProcessing={confirmPasswordMutation.isLoading}
                                submitLabel='Update Password'
                                resultError={error}
                                resetResultError={() => setError(null)}
                                data={{ confirmPassword: '', password: '' }} />
                        </>
                    ) : 
                    
                    (
                        <div className='py-28 text-center'>
                            <h5 className='font-semibold text-BLGR600 text-xl'> Change Successful </h5>
                            <h5 className='text-sm pt-4'>Your password has been changed. Click continue to login. </h5>
                            <div className={clsx('flex', 'flex-row', 'gap-3', 'pt-10', 'w-full', 'justify-end')}> 
                                <Button label='Continue' className='flex-1' onClick={() => router.push(ROUTES.AUTH_LOGIN)}></Button>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default SetNewPassword;

SetNewPassword.getLayout = (page) => {
    return (
        <PrimaryLayout title='Latus Group | Set New Password'>
            <AuthenticationLayout>
                {page}
            </AuthenticationLayout>
        </PrimaryLayout>
    );
};