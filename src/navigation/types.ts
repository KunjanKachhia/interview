import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Login: undefined;
    Main: undefined;
};

export type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
