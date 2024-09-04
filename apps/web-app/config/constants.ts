export const STORAGE_KEY = {
    ACCESS_TOKEN: 'latus_group_access_token',
    ID_TOKEN: 'latus_group_id_token',
    REFRESH_TOKEN: 'latus_group_refresh_token',
    COGNITO_SESSION: 'cognito_session',
};

export const ROUTES = {
    AUTH_LOGIN: '/auth/login',
    AUTH_SIGNUP: '/auth/sign-up',
    AUTH_ENTER_OTP: '/auth/enter-otp',
    AUTH_COMPLETE_PROFILE: '/auth/complete-profile',
    AUTH_FORGOT_PASSWORD: '/auth/forgot-password',
};

export const API_CONFIG = {
    CORE_URL: process.env.NX_API_URL_CORE,
    AUTH_URL: process.env.NX_API_URL_AUTHENTICATION,
    CHART_URL: process.env.NX_API_URL_CHART,
    SUBSCRIPTION_URL: process.env.NX_API_URL_SUBSCRIPTION,
    THERAPY_URL: process.env.NX_API_URL_THERAPY,
    USER_URL: process.env.NX_API_URL_USER,
    // 'AUTH': process.env['NX_API_AUTH'],
    // 'USERS': process.env['NX_API_USERS']
};

export const REPORT_VIEW = {
    REFERRAL_FORM: 'REFERRAL_FORM',
    REFERRAL_NOTES: 'REFERRAL_NOTES',
    GENERATED_REPORT: 'GENERATED_REPORT',
};
