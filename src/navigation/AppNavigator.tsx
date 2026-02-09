import React from 'react';
import { colors } from '../theme';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { store } from '../store';
import { checkAuthToken } from '../services/api';
import { Text, View, ActivityIndicator } from 'react-native';
import EventListingScreen from '../screens/EventListingScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const PlaceholderScreen = ({ name }: { name: string }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{name}</Text>
    </View>
);

const SearchScreen = () => <PlaceholderScreen name="Search" />;
const ProfileScreen = () => <PlaceholderScreen name="Profile" />;

function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName = 'circle';
                    if (route.name === 'Search') iconName = 'search';
                    else if (route.name === 'Events') iconName = 'calendar';
                    else if (route.name === 'Favorites') iconName = 'heart';
                    else if (route.name === 'Profile') iconName = 'user';
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.text.primary,
                tabBarInactiveTintColor: colors.text.secondary,
            })}
        >
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Events" component={EventListingScreen} />
            <Tab.Screen name="Favorites" component={FavoritesScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

function AppNavigator() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [initialRoute, setInitialRoute] = React.useState('Login');

    React.useEffect(() => {
        const checkAuth = async () => {
            const hasToken = await checkAuthToken();
            setInitialRoute(hasToken ? 'Main' : 'Login');
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Main" component={MainTabNavigator} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

export default AppNavigator;
