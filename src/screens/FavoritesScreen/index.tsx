import React from 'react';
import {
    View,
    Text,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleFavorite, Event } from '../../store/favoritesSlice';
import EventCard from '../../components/EventCard';
import styles from './styles';

const FavoritesScreen = () => {
    const favorites = useSelector((state: RootState) => state.favorites.items);
    const dispatch = useDispatch();

    const handleToggleFavorite = (event: Event) => {
        dispatch(toggleFavorite(event));
    };

    const renderItem = ({ item }: { item: Event }) => {
        return (
            <EventCard
                item={item}
                isFavorite={true}
                onToggleFavorite={handleToggleFavorite}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Hello Renzo!</Text>
                <Text style={styles.subGreeting}>Are you ready to dance?</Text>
            </View>

            {favorites.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No favorites yet.</Text>
                </View>
            ) : (
                <FlatList
                    data={favorites}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.event_date_id.toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
};

export default FavoritesScreen;
