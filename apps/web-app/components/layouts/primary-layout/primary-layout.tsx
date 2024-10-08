import RouteGuard from '@web-app/components/modules/route-guard/route-guard';
import Head from 'next/head';

export interface IPrimaryLayout {
    children?: React.ReactNode;
    title: string;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children, title }) => {
    return (
        <RouteGuard>
            <Head>
                <title>{title}</title>
            </Head>
            <main className="h-screen" style={{ backgroundColor: '#f7f8ee' }}>
                {children}
            </main>
        </RouteGuard>
    );
};

export default PrimaryLayout;
