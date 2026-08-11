import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from '@expo/vector-icons/Entypo';
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";

export default function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = () => {
        router.replace('/(drawer)/(tabs)/teste');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.logoContainer}>
                    <View style={styles.logoCircle}>
                        <Entypo name="leaf" size={24} color="white" />
                    </View>
                    <Text style={styles.title}>
                        Ecofield
                    </Text>
                    <Text style={styles.subtitle}>
                        Bem-vindo ao sistema de monitoramento de campo.
                    </Text>
                    <Text style={styles.label}>E-mail</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={24} style={styles.inputIcon} />
                        <TextInput
                            placeholder="seu@gmail.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                        />
                    </View>
                    <Text style={styles.label}>Senha</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={24} style={styles.inputIcon} />
                        <TextInput
                            placeholder="*******"
                            keyboardType="default"
                            autoCapitalize="none"
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                        />
                    </View>
                    <TouchableOpacity onPress={handleLogin} style={styles.button}>
                        <Text style={styles.buttonText}>ENTRAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F9FF'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F8F9FF'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#F8F9FF',
        width: '100%',
        borderRadius: 20,

    },
    logoContainer: {
        alignItems: 'center',

    },
    logoCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        marginVertical: 10
    },
    subtitle: {
        fontSize: 16,
        color: '#666666',
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 6,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000000',
        backgroundColor: '#F8F9FF',
        borderRadius: 10,
        marginBottom: 16,
    },
    inputIcon: {
        paddingLeft: 12
    },
    input: {
        flex: 1,
        padding: 12,
        fontSize: 15,
        color: '#000000'
    },
    button: {
        backgroundColor: '#000000',
        paddingHorizontal: 80,
        paddingVertical: 10,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 20
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 600,
        color: '#FFFFFF',
        letterSpacing: 1.5
    }
})