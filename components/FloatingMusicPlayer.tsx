import { useMusic } from '@/contexts/MusicContext';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function FloatingMusicPlayer() {
    const { currentSong, isPlaying, pauseSong, resumeSong, closePlayer } = useMusic();
    const router = useRouter();
    const pathname = usePathname();

    if (!currentSong || pathname.includes('music-player')) return null;

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.9}
            onPress={() => router.push('/(tabs)/music-player')}
        >
            <View style={styles.songInfo}>
                <View style={styles.iconPlaceholder} />
                <View style={styles.textContainer}>
                    <Text style={styles.songName} numberOfLines={1}>{currentSong.name}</Text>
                    <Text style={styles.artistName} numberOfLines={1}>{currentSong.artist}</Text>
                </View>
            </View>

            <View style={styles.controls}>
                <TouchableOpacity onPress={isPlaying ? pauseSong : resumeSong} style={styles.controlButton}>
                    <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity onPress={closePlayer} style={styles.controlButton}>
                    <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 100, // Above the tab bar (which is ~70-90 height + bottom margin)
        left: 20,
        right: 20,
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        zIndex: 100, // Ensure it's above everything
    },
    songInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E89898', // Pinkish placeholder
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    songName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    artistName: {
        fontSize: 12,
        color: '#666',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    controlButton: {
        padding: 5,
    },
});
