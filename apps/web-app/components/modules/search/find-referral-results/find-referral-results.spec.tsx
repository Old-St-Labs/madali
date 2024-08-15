import { render } from '@testing-library/react';

import FindReferralResults from './find-referral-results';

describe('FindReferralResults', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<FindReferralResults />);
        
        expect(baseElement).toBeTruthy();
    });
});
