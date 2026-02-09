import { Platform } from 'react-native';

export const typography = {
    fonts: {
        regular: Platform.OS === 'ios' ? 'System' : 'Roboto',
        bold: Platform.OS === 'ios' ? 'System' : 'Roboto_medium',
        light: Platform.OS === 'ios' ? 'System' : 'Roboto_light',
    },
    size: {
        h1: 32,
        h2: 24,
        h3: 18,
        body: 16,
        caption: 14,
        small: 12,
    },
    weight: {
        regular: '400',
        medium: '500',
        bold: '700',
        light: '300',
    }
};
