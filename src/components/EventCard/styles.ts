import { StyleSheet, TextStyle } from 'react-native';
import { colors, typography, spacing } from '../../theme';

export default StyleSheet.create({
    card: {
        backgroundColor: colors.card.background,
        borderRadius: spacing.m,
        marginBottom: spacing.l,
        shadowColor: colors.card.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
        flexDirection: 'row',
        padding: spacing.s,
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: spacing.s,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.m,
        backgroundColor: colors.border,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    cardContent: {
        flex: 1,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 2,
    },
    title: {
        fontSize: typography.size.body + 2,
        fontWeight: typography.weight.bold as TextStyle['fontWeight'],
        color: colors.text.primary,
        flex: 1,
        marginRight: spacing.s,
    },
    arrowIcon: {
        marginTop: 2,
    },
    middleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    infoCol: {
        flex: 1,
    },
    dateRange: {
        fontSize: typography.size.small,
        color: colors.primary,
        fontWeight: typography.weight.medium as TextStyle['fontWeight'],
        marginBottom: 2,
    },
    price: {
        fontSize: typography.size.small,
        color: colors.text.secondary,
    },
    location: {
        fontSize: 12,
        color: colors.text.secondary,
        textAlign: 'right',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    tagsRow: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
        marginRight: 2,
    },
    tag: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: spacing.s,
        paddingVertical: 4,
        borderRadius: 20,
        marginRight: 2,
        marginBottom: 4,
    },
    tagText: {
        fontSize: 10,
        color: '#374151',
        fontWeight: '600',
    },
    actionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginLeft: spacing.m,
        padding: 4,
    },
});
