import { StyleSheet, TextStyle } from 'react-native';
import { colors, typography, spacing } from '../../theme';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: spacing.l,
        paddingTop: spacing.m,
        paddingBottom: spacing.l,
        backgroundColor: colors.background,
    },
    greeting: {
        fontSize: typography.size.h2,
        fontWeight: typography.weight.bold as TextStyle['fontWeight'],
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    subGreeting: {
        fontSize: typography.size.body,
        color: colors.text.secondary,
    },
    loader: {
        marginTop: 50,
    },
    listContent: {
        paddingHorizontal: spacing.m,
        paddingBottom: spacing.s,
    },
});
