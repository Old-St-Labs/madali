/* eslint-disable jsx-a11y/alt-text */
import { Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

Font.register({ family: 'Poppins-regular', src: '/fonts/Poppins-Regular.ttf' });
Font.register({ family: 'Poppins-bold', src: '/fonts/Poppins-SemiBold.ttf' });

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        paddingLeft: 40,
        paddingRight: 40,
        position: 'relative',
    },
    pageLogo: {
        height: '27px',
        width: '95px',
        alignSelf: 'flex-end',
    },
    pageFooterContainer: {
        position: 'absolute',
        bottom: 9,
        left: 9,
    },
    pageFooter: {
        height: '65px',
        width: '577px',
    },
    tableHeader: {
        marginTop: 6,
        backgroundColor: '#35A7AC',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
    },
    pageTableHeaderText: {
        fontSize: 11,
        width: '100%',
        color: '#FFFFFF',
        fontFamily: 'Poppins-bold',
    },
    tableRow: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#000000',
        borderStyle: 'solid',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
    },
    tableRowHeader: {
        borderBottomWidth: 1,
        borderColor: '#000000',
        borderStyle: 'solid',
        backgroundColor: '#E6F4F5',
        paddingTop: 5,
        paddingBottom: 2,
        paddingLeft: 10,
        paddingRight: 10,
    },
    tableRowBody: {
        backgroundColor: '#FFFFFF',
        paddingTop: 13,
        paddingBottom: 13,
        paddingLeft: 10,
        paddingRight: 10,
    },
    tableRowText: {
        fontSize: 10,
        width: '100%',
        color: '#000000',
        lineHeight: 2,
        fontFamily: 'Poppins-regular',
    },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function GeneratedReportTemplatePage2(data: any) {
    return (
        <Page style={styles.page} size="A4">
            <View fixed>
                <Image
                    style={styles.pageLogo}
                    src="/assets/latus-group_report-logo.png"
                />
            </View>

            <View style={styles.tableHeader}>
                <Text style={styles.pageTableHeaderText}>Report Questions</Text>
            </View>

            {Array.isArray(data.data) &&
                data.data.map((item, i) => (
                    <View key={i} style={styles.tableRow}>
                        <View style={styles.tableRowHeader}>
                            <Text style={styles.tableRowText}>
                                {i + 1}. {item.question}
                            </Text>
                        </View>

                        <View style={styles.tableRowBody}>
                            <Text style={styles.tableRowText}>
                                {item.answer}
                            </Text>
                        </View>
                    </View>
                ))}

            <View style={styles.pageFooterContainer} fixed>
                <Image
                    style={styles.pageFooter}
                    src="/assets/generate-report-footer.png"
                />
            </View>
        </Page>
    );
}
