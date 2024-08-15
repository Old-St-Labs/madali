/* eslint-disable jsx-a11y/alt-text */
import { Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

Font.register({ family: 'Calibri-bold', src: '/fonts/calibri-bold.ttf' });

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#FFFFFF',
    },
    pageBackground: {
        height: 792,
        position: 'absolute',
        zIndex: -1,
        top: 0,
        width: '100%',
    },
    pageText: {
        position: 'absolute',
        fontSize: 11,
        width: '100%',
        color: '#44546a',
        fontFamily: 'Calibri-bold',
    },
});

export function ReferralFormPage1() {
    return (
        <Page size="LETTER" style={styles.page}>
            {/* Secrion 1 */}
            <View>
                {/* Date of Referral */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 282,
                        left: 175,
                    }}
                >
                    25th November 2022
                </Text>

                {/* Manager's Name */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 308,
                        left: 175,
                    }}
                >
                    Joe Bloggs
                </Text>

                {/* Manager's Title */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 282,
                        left: 410,
                    }}
                >
                    People Adviser
                </Text>

                {/* Site */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 308,
                        left: 410,
                    }}
                >
                    Dale Street
                </Text>
            </View>

            {/* Secrion 2 */}
            <View>
                {/* OH consent form signed and saved to Core? */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 415,
                        left: 175,
                    }}
                >
                    Yes
                </Text>

                {/* First and last name */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 455,
                        left: 175,
                    }}
                >
                    Joe Bloggs
                </Text>

                {/* Payroll no */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 482,
                        left: 175,
                    }}
                >
                    642
                </Text>

                {/* DOB */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 511,
                        left: 175,
                    }}
                >
                    31.10.1982
                </Text>

                {/* Contact number */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 543,
                        left: 175,
                    }}
                >
                    07580 08****
                </Text>

                {/* Email Address */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 574,
                        left: 175,
                    }}
                >
                    joebloggs@gmail.com
                </Text>

                {/* Would you prefer a Telephone appointment or via Teams (video call)? */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 625,
                        left: 175,
                    }}
                >
                    Teams
                </Text>

                {/* Driving activity */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 415,
                        left: 410,
                    }}
                >
                    None
                </Text>

                {/* Job Title */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 455,
                        left: 410,
                    }}
                >
                    Asst Merchandiser
                </Text>

                {/* Shift & Department */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 482,
                        left: 410,
                    }}
                >
                    Merch
                </Text>

                {/* Current hours of work */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 511,
                        left: 410,
                    }}
                >
                    Working from home F/T
                </Text>

                {/* Translator required */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 543,
                        left: 410,
                    }}
                >
                    No
                </Text>

                {/* Language spoken */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 574,
                        left: 410,
                    }}
                >
                    English
                </Text>

                {/* Would you be open to having your OH appointment on a non-working day */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 625,
                        left: 410,
                    }}
                >
                    No
                </Text>
            </View>
            <Image
                style={styles.pageBackground}
                src="/assets/referral-form-template/Occupational_Referral_Form_Template_Page-1.jpeg"
            />
        </Page>
    );
}
