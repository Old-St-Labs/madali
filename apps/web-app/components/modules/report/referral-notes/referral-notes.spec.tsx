import { render } from '@testing-library/react';

import ReferralNotes from './referral-notes';

describe('ReferralNotes', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ReferralNotes />);
        
        expect(baseElement).toBeTruthy();
    });
});
