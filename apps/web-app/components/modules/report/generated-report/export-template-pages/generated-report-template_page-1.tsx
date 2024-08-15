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
    pageHeaderText: {
        fontSize: 11,
        width: '100%',
        color: '#000000',
        lineHeight: 1.5,
        fontFamily: 'Poppins-bold',
    },
    pageText: {
        fontSize: 10,
        width: '100%',
        color: '#000000',
        lineHeight: 2,
        fontFamily: 'Poppins-regular',
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
        flexDirection: 'row',
    },
    tableRowInnerLeft: {
        borderColor: '#000000',
        borderRightWidth: 1,
        borderStyle: 'solid',
        width: '50%',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 10,
        paddingRight: 10,
    },
    tableRowInnerRight: {
        width: '50%',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 10,
        paddingRight: 10,
    },
    tableRowTextLeft: {
        color: '#000000',
        fontSize: 10,
        width: '100%',
        fontFamily: 'Poppins-bold',
    },
    tableRowTextRight: {
        color: '#000000',
        fontSize: 10,
        width: '100%',
        fontFamily: 'Poppins-regular',
    },
});

const referralDetailsData = [
    {
        label: 'Name of addressee:',
        value: 'Sample Text',
    },
    {
        label: 'Name of organization/ employer:',
        value: 'Sample Text',
    },
    {
        label: 'Employee forename and surname:',
        value: 'Sample Text',
    },
    {
        label: 'Date of Birth:',
        value: 'Sample Text',
    },
    {
        label: 'Job Title:',
        value: 'Sample Text',
    },
    {
        label: 'Length of service:',
        value: 'Sample Text',
    },
    {
        label: 'Date of consultation:',
        value: 'Sample Text',
    },
    {
        label: 'Type of  consultation:',
        value: 'Sample Text',
    },
    {
        label: 'Consultation undertaken by:',
        value: 'Sample Text',
    },
    {
        label: 'Consent give to release medical report:',
        value: 'Lorem ipsum dolor sit amet. Aut iusto error est incidunt voluptas et',
    },
    {
        label: 'Length of  Service:',
        value: 'Sample Text',
    },
    {
        label: 'What are the main issues which have given rise to this assessment?',
        value: 'Lorem ipsum dolor sit amet. Aut iusto error est incidunt voluptas et quidem corporis eum placeat eveniet vel maiores suscipit! Qui sunt laboriosam ',
    },
    {
        label: 'Is employee  fit for current work role?',
        value: 'Lorem ipsum dolor sit amet. Aut iusto error est incidunt voluptas et quidem corporis eum placeat eveniet vel maiores suscipit! Qui sunt laboriosam ',
    },
];

export function GeneratedReportTemplatePage1() {
    return (
        <Page style={styles.page} size="A4">
            <View fixed>
                <Image
                    style={styles.pageLogo}
                    src="/assets/latus-group_report-logo.png"
                />
            </View>

            <View style={{ marginTop: 12 }}>
                <Text style={styles.pageHeaderText}>
                    PRIVATE AND CONFIDENTIAL
                </Text>
                <Text style={{ ...styles.pageHeaderText, marginTop: 16 }}>
                    OH Consultation Report
                </Text>
                <Text style={{ ...styles.pageText, marginTop: 12 }}>
                    Lorem ipsum dolor sit amet. Rem earum doloribus qui voluptas
                    sunt non omnis itaque eos provident modi et internos minus
                    sed neque vitae nam officia consequatur. Aut facilis
                    accusantium est ipsum consequatur non maiores consequuntur
                    ut enim vitae qui placeat.
                </Text>
            </View>

            <View style={styles.tableHeader}>
                <Text style={styles.pageTableHeaderText}>Referral Details</Text>
            </View>

            {referralDetailsData.map((data, i) => (
                <View key={i} style={styles.tableRow}>
                    <View style={styles.tableRowInnerLeft}>
                        <Text style={styles.tableRowTextLeft}>
                            {data.label}
                        </Text>
                    </View>

                    <View style={styles.tableRowInnerRight}>
                        <Text style={styles.tableRowTextRight}>
                            {data.value}
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
