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

export function ReferralFormPage2() {
    return (
        <Page size="LETTER" style={styles.page}>
            {/* Section 2 */}
            <View>
                {/* Please state any upcoming unavailabity e.g. holidays */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 78,
                        left: 175,
                    }}
                >
                    {/* Sample Text */}
                </Text>
            </View>

            {/* Section 5 */}
            <View>
                {/* What is the official name of your condition? */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 360,
                        left: 284,
                    }}
                >
                    Breast Cancer
                </Text>

                {/* When did your condition start? */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 386,
                        left: 284,
                    }}
                >
                    {/* Sample text */}
                </Text>

                {/* What are your symptoms? */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 405,
                        left: 284,
                    }}
                >
                    {/* Sample text */}
                </Text>

                {/* What makes your symptoms better/worse? */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 426,
                        left: 284,
                    }}
                >
                    {/* Sample text */}
                </Text>

                {/* How does your condition affect you physically or mentally day-to-day?*/}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 457,
                        left: 284,
                    }}
                >
                    {/* Sample text */}
                </Text>

                {/* Please state what treatment are you currently getting (if any)? */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 490,
                        left: 284,
                    }}
                >
                    Hormone and Anxiety Treatment
                </Text>

                {/* Please state what medication you are currently taking (if any)? */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 522,
                        left: 284,
                    }}
                >
                    {/* Sample text */}
                </Text>

                {/* What current advice do you have from your doctor (if any)? */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 559,
                        left: 284,
                    }}
                >
                    {/* Sample text */}
                </Text>

                {/* What adjustments at work did you think would help/do help you? */}
                <Text
                    style={{
                        ...styles.pageText,
                        top: 592,
                        left: 284,
                    }}
                >
                    {/* Sample text */}
                </Text>
            </View>
            <Image
                style={styles.pageBackground}
                src="/assets/referral-form-template/Occupational_Referral_Form_Template_Page-2.jpeg"
            />
        </Page>
    );
}
