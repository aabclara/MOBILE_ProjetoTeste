import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function TesteScreen() {
    return (
        <View style={styles.container}>
            <Text>EXEMPLOOOOO</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});
