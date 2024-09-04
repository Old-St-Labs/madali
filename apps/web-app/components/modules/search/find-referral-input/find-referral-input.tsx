import { Button, Input, SearchOutline, Typography } from '@ui';
// import SearchState from '../search-state/search-state';
import { useQueryEmployeeListByJobNumber } from '@web-app/hooks/query/useQueryEmployees';
import { useSessionStore } from '@web-app/hooks/state-management';
import { useEffect, useState } from 'react';
import FindReferralResults from '../find-referral-results/find-referral-results';
import styles from './find-referral-input.module.scss';

/* eslint-disable-next-line */
export interface FindReferralInputProps {}

export function FindReferralInput(props: FindReferralInputProps) {
    const { employeeData: sessionEmployeeData, updateEmployeeData } =
        useSessionStore((state) => state);

    const [jobNumber, setJobNumber] = useState<string>(null);
    const [isSearch, setIsSearch] = useState<boolean>(false);

    const {
        employeeData,
        employeeDataStatus,
        isFetchingEmployeeData,
        refetchEmployeeData,
    } = useQueryEmployeeListByJobNumber(jobNumber, isSearch);

    const handleSearchUpdate = () => {
        setIsSearch(false);

        updateEmployeeData({
            jobId: jobNumber,
            threadId: '',
            currentEmployeeId: '',
            employeeList: employeeData?.body,
        });
    };

    useEffect(() => {
        if (employeeDataStatus === 'success') handleSearchUpdate();
    }, [employeeDataStatus]);

    useEffect(() => {
        if (isSearch) {
            refetchEmployeeData();
            handleSearchUpdate();
        }
    }, [isSearch]);

    useEffect(() => {
        if (sessionEmployeeData.jobId !== '')
            setJobNumber(sessionEmployeeData.jobId);
    }, []);

    return (
        <>
            <div className={styles['container']}>
                <Typography
                    size="text-base"
                    fontWeight="font-semibold"
                    className="text-T1"
                >
                    Job Number
                </Typography>

                <div className={styles['container__input-group']}>
                    <Input
                        label=""
                        leftIcon={SearchOutline}
                        placeholder="Search by job number..."
                        className={styles['container__input-input']}
                        onChange={(value) => setJobNumber(value as string)}
                    />

                    <Button
                        size="lg"
                        label="Search"
                        className={styles['container__input-button']}
                        variant="primary"
                        onClick={() => setIsSearch(true)}
                        isProcessing={isFetchingEmployeeData}
                    />
                </div>
            </div>

            <FindReferralResults
                isLoading={isFetchingEmployeeData}
                data={employeeData?.body}
            />
        </>
    );
}

export default FindReferralInput;
