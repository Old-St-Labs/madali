import { render } from '@testing-library/react';

import FindReferralInput from './find-referral-input';

describe('FindReferralInput', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<FindReferralInput />);
        
        expect(baseElement).toBeTruthy();
    });
});
