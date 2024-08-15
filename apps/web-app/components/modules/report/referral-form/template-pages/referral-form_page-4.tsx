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
        color: '#000000',
        fontFamily: 'Calibri-bold',
    },
});

export function ReferralFormPage4() {
    return (
        <Page size="LETTER" style={styles.page}>
            {/* Section 2 */}
            <View>
                {/* Manager's Signature */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 308,
                        left: 115,
                    }}
                >
                    Joe Bloggs
                </Text>

                {/* Date */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 308,
                        left: 390,
                    }}
                >
                    25th November 2022
                </Text>
            </View>

            <Image
                style={styles.pageBackground}
                src="/assets/referral-form-template/Occupational_Referral_Form_Template_Page-4.jpeg"
            />
        </Page>
    );
}
