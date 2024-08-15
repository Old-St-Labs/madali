// import { checkIfEmailExisit } from '@web-app/api/user';
import { AdminInitiateAuthCommandOutput } from '@aws-sdk/client-cognito-identity-provider';
import { useLoginUserMutation } from '@data-access/hooks';
import { useStore } from '@data-access/state-management';
import { Form, Typography } from '@ui';
import AuthenticationLayout from '@web-app/components/layouts/authentication/authentication';
import PrimaryLayout from '@web-app/components/layouts/primary-layout/primary-layout';
import { ROUTES, STORAGE_KEY } from '@web-app/config/constants';
import {
    schema,
    structure,
} from '@web-app/config/formStructure/loginStructure';
import useAuth from '@web-app/hooks/useAuth';
import LOGIN_LOGO from '@web-app/public/assets/latus-group_logo.png';
import { NextPageWithLayout } from '@web-app/types/pages';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import styles from './index.module.scss';

/* eslint-disable-next-line */
export interface LoginProps {}

export const Login: NextPageWithLayout<LoginProps> = () => {
    const router = useRouter();

    const { authenticationUser } = useAuth();

    const handleCompleteProfile = (data: AdminInitiateAuthCommandOutput) => {
        Cookies.set(STORAGE_KEY.COGNITO_SESSION, data.Session);
        router.push('/auth/complete-profile');
    };

    const loginUserMutation = useLoginUserMutation(
        authenticationUser,
        handleCompleteProfile
    );

    const clearAuthedUser = useStore((state) => state.clearAuthedUser);

    const [error, setError] = useState<{ [key: string]: string }>(null);

    useEffect(() => {
        clearAuthedUser();
    }, []);

    const handleSubmit = useCallback(
        async (data: { email: string; password: string }) => {
            loginUserMutation.mutate(data);
        },
        []
    );

    return (
        <div className={styles['container']}>
            <div className={styles['container__header']}>
                <div className="relative mx-auto h-[2.75rem] w-[9.688rem]">
                    <Image src={LOGIN_LOGO} alt="Latus Group Logo" fill />
                </div>
            </div>

            <div className={styles['container__body']}>
                <h5 className="font-semibold text-xl text-BLGR600 mb-4">
                    LOGIN
                </h5>
                <Form
                    structure={structure}
                    schema={schema}
                    onSubmitForm={handleSubmit}
                    isProcessing={loginUserMutation.isLoading}
                    data={{ email: '', password: '' }}
                    resetResultError={() => setError(null)}
                    resultError={error}
                    submitLabel="Login"
                >
                    <div className="flex justify-start">
                        <Link href={ROUTES.AUTH_FORGOT_PASSWORD}>
                            <Typography
                                color="text-BLGR300"
                                className="mb-3 text-sm font-semibold"
                            >
                                Forgot Password?
                            </Typography>
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;

Login.getLayout = (page) => {
    return (
        <PrimaryLayout title="Latus Group | Login">
            <AuthenticationLayout>{page}</AuthenticationLayout>
        </PrimaryLayout>
    );
};
