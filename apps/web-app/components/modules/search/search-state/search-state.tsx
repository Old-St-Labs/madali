import { AlertTriangle, FileMinus, Search, Typography } from '@ui';
import cn from 'classnames';
import styles from './search-state.module.scss';

/* eslint-disable-next-line */
export interface SearchStateProps {
    searchState: 'default' | 'denied' | 'noResults';
}

export function SearchState({ searchState }: SearchStateProps) {
    const getStateData = () => {
        const defaultText = {
            title: 'Search for referral form and notes',
            description: 'Find what you need quickly. Search by job number.',
        };

        const deniedText = {
            title: 'Access Permission needed',
            description:
                'There seems to be a problem accessing the files. Ensure you have the necessary  permissions and try refreshing page.',
        };

        const noResultsText = {
            title: 'No results found',
            description: 'Oops! We coudn’t find anything matching your search.',
        };

        switch (searchState) {
            case 'default':
                return defaultText;
            case 'denied':
                return deniedText;
            case 'noResults':
                return noResultsText;
        }
    };

    return (
        <div
            className={cn(styles['container'], {
                [styles['-error']]: searchState === 'denied',
                [styles['-not-found']]: searchState === 'noResults',
            })}
        >
            {searchState === 'default' && <Search size={40} color="#185B8A" />}
            {searchState === 'denied' && <AlertTriangle />}
            {searchState === 'noResults' && <FileMinus />}

            <div className={styles['container__text']}>
                <Typography
                    size="text-lg"
                    color={
                        searchState === 'denied'
                            ? 'text-error400'
                            : searchState === 'noResults'
                                ? 'text-warning400'
                                : 'text-B700'
                    }
                    fontWeight="font-semibold"
                >
                    {getStateData().title}
                </Typography>

                <Typography
                    size="text-base"
                    color={
                        searchState === 'denied'
                            ? 'text-error300'
                            : searchState === 'noResults'
                                ? 'text-warning400'
                                : 'text-B700'
                    }
                >
                    {getStateData().description}
                </Typography>
            </div>
        </div>
    );
}

export default SearchState;
