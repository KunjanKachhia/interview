import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleFavorite, Event } from '../../store/favoritesSlice';
import { getEvents } from '../../services/api';
import EventCard from '../../components/EventCard';
import styles from './styles';
import { colors } from '../../theme';

import demoData from '../../assets/data/demo_events.json';

const EventListingScreen = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [isUsingDemoData, setIsUsingDemoData] = useState(false);
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.items);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        setIsUsingDemoData(false);
        try {
            const data = await getEvents();
            const eventList = data.data || data.events || (Array.isArray(data) ? data : []);

            if (eventList.length === 0) {
                setEvents(demoData as Event[]);
                setIsUsingDemoData(true);
            } else {
                setEvents(eventList);
            }
        } catch (error) {
            console.error('API Error, falling back to demo data:', error);
            setEvents(demoData as Event[]);
            setIsUsingDemoData(true);
        } finally {
            setLoading(false);
        }
    };

    const isFavorite = (eventId: number) => {
        return favorites.some((item) => item.event_date_id === eventId);
    };

    const handleToggleFavorite = (event: Event) => {
        dispatch(toggleFavorite(event));
    };

    const renderItem = ({ item }: { item: Event }) => {
        return (
            <EventCard
                item={item}
                isFavorite={isFavorite(item.event_date_id)}
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

            {loading ? (
                <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
            ) : (
                <FlatList
                    data={events}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.event_date_id.toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
};

export default EventListingScreen;
