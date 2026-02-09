import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { login, setAuthToken } from '../../services/api';
import { AuthScreenNavigationProp } from '../../navigation/types';
import styles from './styles';
import { colors } from '../../theme';

import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<AuthScreenNavigationProp>();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email and password');
            return;
        }

        setLoading(true);
        try {
            const response = await login(email, password);
            const token = response.token || response.access_token || response.data?.token;

            if (token) {
                setAuthToken(token);
                navigation.navigate('Main');
            } else {
                if (response.success !== false) {
                    navigation.navigate('Main');
                } else {
                    Alert.alert('Login Failed', 'Invalid credentials');
                }
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
            console.error(error);
            Alert.alert('Login Failed', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleGuest = () => {
        navigation.navigate('Main');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logoText}>Pliē</Text>
                <View style={styles.placeholderImage}>
                    <Icon name="image" size={50} color={colors.text.placeholder} />
                </View>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="email@email.com"
                    placeholderTextColor={colors.text.placeholder}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        placeholderTextColor={colors.text.placeholder}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={secureTextEntry}
                    />
                    <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                        <Icon name={secureTextEntry ? "eye" : "eye-off"} size={20} color={colors.text.placeholder} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signInButton} onPress={handleLogin} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color={colors.text.light} />
                    ) : (
                        <Text style={styles.signInButtonText}>Sign In</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Not a member? </Text>
                    <TouchableOpacity>
                        <Text style={styles.signUpLink}>Sign Up Here</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>or Sign In with:</Text>
                    <View style={styles.divider} />
                </View>

                <View style={styles.socialButtons}>
                    <TouchableOpacity style={styles.socialButton}><AntDesign name="google" size={24} color={colors.social.google} /></TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}><AntDesign name="apple1" size={24} color={colors.social.apple} /></TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}><FontAwesome name="facebook" size={24} color={colors.social.facebook} /></TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.guestButton} onPress={handleGuest}>
                <Text style={styles.guestButtonText}>Enter as Guest</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default LoginScreen;
