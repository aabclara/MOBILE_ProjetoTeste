import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text, Button, TouchableOpacity, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useState, useRef } from 'react';
import { Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CameraScreen() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [flash, setFlash] = useState<boolean>(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
    const [lastSavedPhoto, setLastSavedPhoto] = useState<string | null>(null);
    const cameraRef = useRef<CameraView>(null);

    if (!permission) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Precisamos de permissão para usar a câmera</Text>
                <Button onPress={requestPermission} title="Conceder Permissão" />
            </View>
        );
    }

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const toggleFlash = () => {
        setFlash(current => !current);
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync({
                    quality: 0.8,
                });
                if (photo && photo.uri) {
                    setCapturedPhoto(photo.uri);
                }
            } catch (error) {
                console.error("Falha ao tirar foto:", error);
            }
        }
    }

    const retakePicture = () => {
        setCapturedPhoto(null);
    }

    const savePicture = async () => {
        if (!capturedPhoto) return;

        if (!mediaPermission || !mediaPermission.granted) {
            const permissionResponse = await requestMediaPermission();
            if (!permissionResponse.granted) {
                Alert.alert("Erro", "Precisamos de permissão para salvar fotos na sua galeria.");
                return;
            }
        }

        try {
            await MediaLibrary.saveToLibraryAsync(capturedPhoto);
            Alert.alert("Sucesso", "Foto salva na galeria!");
            setLastSavedPhoto(capturedPhoto);
            setCapturedPhoto(null);
        } catch (error) {
            console.error("Erro ao salvar foto:", error);
            Alert.alert("Erro", "Não foi possível salvar a foto.");
        }
    }

    if (capturedPhoto) {
        return (
            <View style={styles.container}>
                <Image source={{ uri: capturedPhoto }} style={styles.fullScreenImage} contentFit="cover" />
                <SafeAreaView style={styles.previewControlsOverlay}>
                    <View style={styles.previewControlsContainer}>
                        <TouchableOpacity style={styles.previewButton} onPress={retakePicture}>
                            <Ionicons name="close" size={24} color="#FFF" />
                            <Text style={styles.previewButtonText}>Tirar Outra</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.previewButtonPrimary} onPress={savePicture}>
                            <Ionicons name="checkmark" size={24} color="#000" />
                            <Text style={styles.previewButtonTextPrimary}>Salvar Foto</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                enableTorch={flash}
                ref={cameraRef}
            >
                <SafeAreaView style={styles.cameraOverlay}>
                    <View style={styles.topControls}>
                        <TouchableOpacity style={styles.iconButton} onPress={toggleFlash}>
                            <Ionicons name={flash ? "flash" : "flash-off"} size={24} color="white" />
                        </TouchableOpacity>
                        <View style={{ width: 44 }} />
                    </View>

                    <View style={styles.bottomControls}>
                        <TouchableOpacity style={styles.galleryThumbnail}>
                            {lastSavedPhoto ? (
                                <Image source={{ uri: lastSavedPhoto }} style={styles.thumbnailImage} contentFit="cover" />
                            ) : (
                                <Ionicons name="image-outline" size={24} color="white" />
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.captureButtonContainer} onPress={takePicture}>
                            <View style={styles.captureButtonInner} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconButton} onPress={toggleCameraFacing}>
                            <Ionicons name="camera-reverse-outline" size={28} color="white" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    message: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 20,
        textAlign: 'center'
    },
    camera: {
        flex: 1,
    },
    fullScreenImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    cameraOverlay: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    topControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 20,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gpsContainer: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 16,
        alignItems: 'center',
    },
    gpsActiveRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    gpsActiveText: {
        color: '#4ADE80',
        fontWeight: 'bold',
        fontSize: 12,
        marginLeft: 6,
        letterSpacing: 1.5,
    },
    gpsCoordinates: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '600',
        marginTop: 2,
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    targetBoxContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    targetBox: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderColor: '#4ADE80',
        justifyContent: 'center',
        alignItems: 'center',
    },
    targetDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#4ADE80',
    },
    targetInfo: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 8,
        marginLeft: 10,
        borderRadius: 4,
    },
    targetInfoText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
    },
    bottomControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    galleryThumbnail: {
        width: 50,
        height: 50,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#FFF',
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbnailImage: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
    },
    captureButtonContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButtonInner: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#FFF',
    },
    previewControlsOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    previewControlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 24,
        paddingHorizontal: 20,
    },
    previewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 30,
    },
    previewButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
    },
    previewButtonPrimary: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 30,
    },
    previewButtonTextPrimary: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
    }
});
