import { useCompleteNewPasswordMutation } from '@data-access/hooks';
import { useStore } from '@data-access/state-management';
import { Form } from '@ui';
import AuthenticationLayout from '@web-app/components/layouts/authentication/authentication';
import PrimaryLayout from '@web-app/components/layouts/primary-layout/primary-layout';
import { STORAGE_KEY } from '@web-app/config/constants';
import {
    schema,
    structure,
} from '@web-app/config/formStructure/createAccountStructure';
import useAuth from '@web-app/hooks/useAuth';
import LOGIN_LOGO from '@web-app/public/assets/latus-group_logo.png';
import { NextPageWithLayout } from '@web-app/types/pages';
import Cookies from 'js-cookie';
import Image from 'next/image';
import styles from './index.module.scss';

/* eslint-disable-next-line */
export interface CompleteProfileProps {}

export const CompleteProfile: NextPageWithLayout<CompleteProfileProps> = () => {
    const { authenticationUser } = useAuth();
    const authedUser = useStore((state) => state.authedUser);

    const completeNewPasswordMutation =
        useCompleteNewPasswordMutation(authenticationUser);

    const handleSubmit = async (data) => {
        data['session'] = Cookies.get(STORAGE_KEY.COGNITO_SESSION);
        delete data.confirmPassword;

        completeNewPasswordMutation.mutate(data);
    };

    return (
        <div className={styles['container']}>
            <div className={styles['container__header']}>
                <div className="relative mx-auto h-[2.75rem] w-[9.688rem]">
                    <Image src={LOGIN_LOGO} alt="Latus Group Logo" fill />
                </div>
            </div>

            <div className={styles['container__body']}>
                <h5 className="font-semibold text-xl text-BLGR600 mb-4">
                    COMPLETE YOUR PROFILE
                </h5>
                <Form
                    structure={structure}
                    schema={schema}
                    onSubmitForm={handleSubmit}
                    isProcessing={completeNewPasswordMutation.isLoading}
                    data={{
                        email: authedUser.email,
                        password: '',
                        confirmPassword: '',
                    }}
                />
            </div>
        </div>
    );
};

export default CompleteProfile;

CompleteProfile.getLayout = (page) => {
    return (
        <PrimaryLayout title="Complete Your Profile">
            <AuthenticationLayout>{page}</AuthenticationLayout>
        </PrimaryLayout>
    );
};
