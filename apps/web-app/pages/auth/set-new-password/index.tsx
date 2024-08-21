// eslint-disable-next-line @nx/enforce-module-boundaries
import {
    useConfirmPasswordChangeMutation,
    useResendConfirmationMutation,
} from '@data-access/hooks';
import { CognitoForgotPasswordDto } from '@dto';
import { Button, Form, Typography } from '@ui';
import AuthenticationLayout from '@web-app/components/layouts/authentication/authentication';
import PrimaryLayout from '@web-app/components/layouts/primary-layout/primary-layout';
import { ROUTES } from '@web-app/config/constants';
import {
    schema,
    structure,
} from '@web-app/config/formStructure/setNewPassword';
import { useCountdown } from '@web-app/hooks/useCountdown';
import LOGIN_LOGO from '@web-app/public/assets/latus-group_logo.png';
import { NextPageWithLayout } from '@web-app/types/pages';
import clsx from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

/* eslint-disable-next-line */
export interface SetNewPasswordProps {}

export const SetNewPassword: NextPageWithLayout<SetNewPasswordProps> = () => {
    const router = useRouter();

    const { countdown, enableCounting, isCounting } = useCountdown();
    const [isPasswordMutateSuccess, setIsPasswordMutateSuccess] =
        useState<boolean>(false);

    // mutation hooks
    const resendCodeMutation = useResendConfirmationMutation(enableCounting);
    const confirmPasswordMutation = useConfirmPasswordChangeMutation();

    const [error, setError] = useState<{ [key: string]: string }>(null);

    const handleSubmit = async (data: { [key: string]: string }) => {
        confirmPasswordMutation.mutate({
            email: router.query.email as string,
            password: data.password,
        } as CognitoForgotPasswordDto);
    };

    // prevent user from requesting new code while request is still processing
    const handleRequestNew = async () => {
        // prevent request if account is being verified
        if (confirmPasswordMutation.isLoading) return;
        enableCounting(true);

        resendCodeMutation.mutate(router.query.email as string);
    };

    structure[0].fields[0][0]['extra'] = (
        <div className="flex flex-row items-center">
            <Typography className="p-1">{'Didn’t receive a code?'}</Typography>
            <Typography className="w-24">
                {isCounting ? (
                    countdown
                ) : (
                    <span
                        onClick={handleRequestNew}
                        className="cursor-pointer underline text-BLGR400"
                    >
                        Resend Email
                    </span>
                )}
            </Typography>
        </div>
    );

    useEffect(() => {
        if (confirmPasswordMutation.isSuccess) setIsPasswordMutateSuccess(true);
    }, [confirmPasswordMutation.isSuccess]);

    return (
        <div className={styles['container']}>
            <div className={styles['container__header']}>
                <div className="relative mx-auto h-[2.75rem] w-[9.688rem]">
                    <Image src={LOGIN_LOGO} alt="Latus Group Logo" fill />
                </div>
            </div>

            <div className={styles['container__body']}>
                {!isPasswordMutateSuccess ? (
                    <>
                        <div className="mb-10">
                            <h5 className="font-semibold text-xl text-BLGR600 mb-4">
                                Check your email
                            </h5>

                            <h5 className="text-base text-N700">
                                We sent you a verification code to reset your
                                password
                            </h5>
                        </div>

                        <Form
                            structure={structure}
                            schema={schema}
                            onSubmitForm={handleSubmit}
                            isProcessing={confirmPasswordMutation.isLoading}
                            submitLabel="Update Password"
                            resultError={error}
                            resetResultError={() => setError(null)}
                            data={{ confirmPassword: '', password: '' }}
                        />
                    </>
                ) : (
                    <div className="py-28 text-center">
                        <h5 className="font-semibold text-BLGR600 text-xl">
                            Password Changed
                        </h5>
                        <h5 className="text-base pt-4 w-[90%] mx-auto">
                            Your password has been changed successfully. Click
                            continue to login.
                        </h5>
                        <div
                            className={clsx(
                                'flex',
                                'flex-row',
                                'gap-3',
                                'pt-10',
                                'w-full',
                                'justify-end'
                            )}
                        >
                            <Button
                                label="Continue"
                                size="lg"
                                className="flex-1"
                                onClick={() => router.push(ROUTES.AUTH_LOGIN)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SetNewPassword;

SetNewPassword.getLayout = (page) => {
    return (
        <PrimaryLayout title="Latus Group | Set New Password">
            <AuthenticationLayout>{page}</AuthenticationLayout>
        </PrimaryLayout>
    );
};
