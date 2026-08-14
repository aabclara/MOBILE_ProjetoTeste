import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from '@expo/vector-icons/Entypo';
import { Ionicons, Feather } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";

export default function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    const handleLogin = () => {
        router.replace('/(drawer)/(tabs)');
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.card}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logoCircle}>
                            <Entypo name="leaf" size={28} color="white" />
                        </View>
                        <Text style={styles.title}>EcoField</Text>
                        <Text style={styles.subtitle}>
                            Acesse o sistema de monitoramento de campo
                        </Text>
                    </View>

                    <View style={styles.formContainer}>
                        <Text style={styles.label}>E-mail</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                            <TextInput
                                placeholder="seu@email.com"
                                placeholderTextColor="#999"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.passwordHeader}>
                            <Text style={styles.label}>Senha</Text>
                            <TouchableOpacity>
                                <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <Feather name="lock" size={18} color="#666" style={styles.inputIcon} />
                            <TextInput
                                placeholder="••••••••"
                                placeholderTextColor="#999"
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                                value={password}
                                onChangeText={setPassword}
                                style={styles.input}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.checkboxContainer}
                            onPress={() => setRememberMe(!rememberMe)}
                        >
                            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                                {rememberMe && <Ionicons name="checkmark" size={12} color="#000" />}
                            </View>
                            <Text style={styles.checkboxLabel}>Lembrar meu acesso</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleLogin} style={styles.button}>
                            <Text style={styles.buttonText}>Entrar</Text>
                            <Feather name="arrow-right" size={20} color="#FFF" style={{ marginLeft: 8 }} />
                        </TouchableOpacity>

                        <View style={styles.divider} />

                        <TouchableOpacity style={styles.footerContainer}>
                            <Text style={styles.footerText}>
                                Não tem uma conta? <Text style={styles.footerTextBold}>Solicite acesso</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAF3FA', // Fundo gradiente azulado
    },
    keyboardView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        maxWidth: 400,
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    logoCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 13,
        color: '#666666',
        textAlign: 'center',
        lineHeight: 18,
    },
    formContainer: {
        width: '100%',
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 8,
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    passwordHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 8,
    },
    forgotPassword: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333333',
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
        height: 44,
    },
    inputIcon: {
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 14,
        color: '#333333',
    },
    eyeIcon: {
        paddingHorizontal: 12,
        height: '100%',
        justifyContent: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 24,
    },
    checkbox: {
        width: 16,
        height: 16,
        borderWidth: 1,
        borderColor: '#AAAAAA',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    checkboxChecked: {
        borderColor: '#000000',
    },
    checkboxLabel: {
        fontSize: 13,
        color: '#666666',
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#000000',
        height: 48,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    divider: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginTop: 24,
        marginBottom: 20,
    },
    footerContainer: {
        alignItems: 'center',
    },
    footerText: {
        fontSize: 13,
        color: '#666666',
    },
    footerTextBold: {
        fontWeight: 'bold',
        color: '#333333',
    }
});