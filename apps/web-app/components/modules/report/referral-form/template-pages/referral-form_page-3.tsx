/* eslint-disable jsx-a11y/alt-text */
import { Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

Font.register({ family: 'Calibri-regular', src: '/fonts/calibri-regular.ttf' });
Font.register({ family: 'Calibri-bold', src: '/fonts/calibri-bold.ttf' });
Font.register({ family: 'Calibri-italic', src: '/fonts/calibri-italic.ttf' });

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
        lineHeight: 1.5,
        fontSize: 11,
        width: '100%',
        color: '#44546a',
        fontFamily: 'Calibri-bold',
    },
    pageHighlightedText: {
        position: 'absolute',
        lineHeight: 1.5,
        fontSize: 11,
        width: '76%',
        color: '#ff0000',
        fontFamily: 'Calibri-italic',
    },
    pageSectionYesNo: {
        position: 'absolute',
        flexDirection: 'row',
    },
    textYes: {
        fontSize: 11,
        color: '#000000',
        fontFamily: 'Calibri-bold',
    },
    textNo: {
        fontSize: 11,
        color: '#ff0000',
        fontFamily: 'Calibri-bold',
    },
});

export function ReferralFormPage3() {
    return (
        <Page size="LETTER" style={styles.page}>
            {/* Section 6 */}
            <View>
                {/* Are there any underlying health conditions accounting for this employee’s absence(s) */}
                <View
                    style={{
                        ...styles.pageSectionYesNo,
                        top: 260,
                        left: 500,
                    }}
                >
                    <Text style={styles.textYes}>YES</Text>
                    <Text style={styles.textYes}>/</Text>
                    <Text style={styles.textYes}>NO</Text>
                </View>

                {/* In your opinion are there any work-related issues which may be a contributory factor? */}
                <View
                    style={{
                        ...styles.pageSectionYesNo,
                        top: 286,
                        left: 500,
                    }}
                >
                    <Text style={styles.textYes}>YES</Text>
                    <Text style={styles.textYes}>/</Text>
                    <Text style={styles.textYes}>NO</Text>
                </View>

                {/* In your opinion is the employee fit for their full duties? */}
                <View
                    style={{
                        ...styles.pageSectionYesNo,
                        top: 312,
                        left: 500,
                    }}
                >
                    <Text style={styles.textYes}>YES</Text>
                    <Text style={styles.textYes}>/</Text>
                    <Text style={styles.textYes}>NO</Text>
                </View>

                {/* In your opinion is the employee fit to attend management/procedural meetings? */}
                <View
                    style={{
                        ...styles.pageSectionYesNo,
                        top: 338,
                        left: 500,
                    }}
                >
                    <Text style={styles.textYes}>YES</Text>
                    <Text style={styles.textYes}>/</Text>
                    <Text style={styles.textYes}>NO</Text>
                </View>

                {/* Is this condition likely to be considered a disability as described in the Equality Act 2010? */}
                <View
                    style={{
                        ...styles.pageSectionYesNo,
                        top: 365,
                        left: 500,
                    }}
                >
                    <Text style={styles.textYes}>YES</Text>
                    <Text style={styles.textYes}>/</Text>
                    <Text style={styles.textYes}>NO</Text>
                </View>

                {/* What is the likely return to work time frame/date */}
                <View
                    style={{
                        ...styles.pageSectionYesNo,
                        top: 391,
                        left: 500,
                    }}
                >
                    <Text style={styles.textYes}>YES</Text>
                    <Text style={styles.textYes}>/</Text>
                    <Text style={styles.textYes}>NO</Text>
                </View>

                {/* Upon returning to work are there any restrictions, on their ability to carry out their duties or any modifications or adjustments recommended and for how long is this required? */}
                <View
                    style={{
                        ...styles.pageSectionYesNo,
                        top: 424,
                        left: 500,
                    }}
                >
                    <Text style={styles.textYes}>YES</Text>
                    <Text style={styles.textYes}>/</Text>
                    <Text style={styles.textYes}>NO</Text>
                </View>

                {/* Additional questions not covered by the above may also be asked if they are relevant to the individual referral. */}
                <Text
                    style={{
                        ...styles.pageHighlightedText,
                        top: 490,
                        left: 76,
                    }}
                >
                    Joe Bloggs has had Breast Cancer,surgery, a full
                    reconstruction, chemo and radiotherapy, Joe Bloggs has
                    worked from home since just before COVID and has not really
                    been out of her house since, she is frightened of picking up
                    COVID or a viral infection, with this in mind Joe Bloggs now
                    suffers from anxiety. Undergoing from her surgery and taking
                    out her lymph nodes she has to visit the hospital regular to
                    have the fluid massaged out of her arm. Joe Bloggs is very
                    vulnerable and wants to carry working from home for the time
                    being, she has some big news coming from the hospital in
                    February and just would like to remain working from home
                    until she receives this news and until her therapy for her
                    anxiety has been done which starts just after the Xmas
                    period for a period of 6 weeks. I am wanting an assessment
                    to ensure that Joe Bloggs is receiving the full support
                    needed from the company and that you agree that working from
                    home is in her best welfare. Joe Bloggs does want to come
                    back to work when she is ready but on a phased
                    return-to-work.
                </Text>
            </View>

            <Image
                style={styles.pageBackground}
                src="/assets/referral-form-template/Occupational_Referral_Form_Template_Page-3.jpeg"
            />
        </Page>
    );
}
