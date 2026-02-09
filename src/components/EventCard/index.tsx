import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Event } from '../../store/favoritesSlice';
import styles from './styles';
import { colors } from '../../theme';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/150';

interface EventCardProps {
    item: Event;
    isFavorite: boolean;
    onToggleFavorite: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ item, isFavorite, onToggleFavorite }) => {
    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.event_profile_img || PLACEHOLDER_IMAGE }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>

            <View style={styles.cardContent}>
                <View style={styles.topRow}>
                    <Text style={styles.title} numberOfLines={1}>{item.event_title}</Text>
                    <Icon name="arrow-right" size={20} color={colors.text.primary} style={styles.arrowIcon} />
                </View>

                <View style={styles.middleRow}>
                    <View style={styles.infoCol}>
                        <Text style={styles.dateRange}>{item.readable_from_date} - {item.readable_to_date}</Text>
                        <Text style={styles.price}>
                            {item.event_price_from === item.event_price_to
                                ? `€${item.event_price_from}`
                                : `€${item.event_price_from} - €${item.event_price_to}`}
                        </Text>
                    </View>
                    <Text style={styles.location}>{item.city_name}, {item.country_name}</Text>
                </View>

                <View style={styles.bottomRow}>
                    <View style={styles.tagsRow}>
                        {item.keywords?.map((tag, index) => (
                            <View key={index} style={styles.tag}>
                                <Text style={styles.tagText}>{tag}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.actionsRow}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Icon name="upload" size={20} color={colors.text.secondary} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onToggleFavorite(item)} style={styles.iconButton}>
                            <AntDesign
                                name={isFavorite ? 'heart' : 'hearto'}
                                size={20}
                                color={isFavorite ? colors.primary : colors.text.secondary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default EventCard;
