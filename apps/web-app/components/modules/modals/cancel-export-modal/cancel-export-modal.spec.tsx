import { render } from '@testing-library/react';

import CancelExportModal from './cancel-export-modal';

describe('CancelExportModal', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CancelExportModal />);
        
        expect(baseElement).toBeTruthy();
    });
});
