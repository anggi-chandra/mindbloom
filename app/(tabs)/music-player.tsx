import { useMusic } from '@/contexts/MusicContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function MusicPlayerScreen() {
    const router = useRouter();
    const { currentSong, isPlaying, pauseSong, resumeSong } = useMusic();

    if (!currentSong) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>No song playing</Text>
                <TouchableOpacity onPress={() => router.push('/(tabs)/song-list')}>
                    <Text>Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/(tabs)/song-list')}>
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <View style={styles.albumArtContainer}>
                    <View style={styles.albumArt}>
                        {/* Decorative hearts would go here, simplified for now */}
                        <Ionicons name="heart" size={40} color="#FFF" style={{ position: 'absolute', top: 20, left: 20, opacity: 0.5 }} />
                        <Ionicons name="heart" size={60} color="#FFF" style={{ position: 'absolute', bottom: 40, right: 20, opacity: 0.5 }} />
                    </View>
                </View>

                <View style={styles.songDetails}>
                    <Text style={styles.songTitle}>{currentSong.name}</Text>
                    <Text style={styles.artistName}>{currentSong.artist}</Text>
                </View>

                <View style={styles.progressContainer}>
                    <View style={styles.progressBarBackground}>
                        <View style={styles.progressBarFill} />
                    </View>
                    <View style={styles.timeContainer}>
                        <Text style={styles.timeText}>00:20</Text>
                        <Text style={styles.timeText}>02:20</Text>
                    </View>
                </View>

                {/* Visual placeholders for the 3 circles in design */}
                <View style={styles.visualControls}>
                    <TouchableOpacity style={styles.visualCircleSmall}>
                        <Ionicons name="play-skip-back" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={isPlaying ? pauseSong : resumeSong} style={styles.visualCircleLarge}>
                        <Ionicons name={isPlaying ? "pause" : "play"} size={32} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.visualCircleSmall}>
                        <Ionicons name="play-skip-forward" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF5F5',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    albumArtContainer: {
        marginBottom: 40,
        shadowColor: '#E89898',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    albumArt: {
        width: width * 0.7,
        height: width * 0.7,
        backgroundColor: '#E89898',
        borderRadius: 30,
        position: 'relative',
        overflow: 'hidden',
    },
    songDetails: {
        alignItems: 'center',
        marginBottom: 40,
    },
    songTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
        textAlign: 'center',
    },
    artistName: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
    },
    progressContainer: {
        width: '100%',
        marginBottom: 40,
    },
    progressBarBackground: {
        height: 6,
        backgroundColor: '#F0F0F0',
        borderRadius: 3,
        marginBottom: 10,
    },
    progressBarFill: {
        width: '30%',
        height: '100%',
        backgroundColor: '#9CC5A1',
        borderRadius: 3,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timeText: {
        fontSize: 12,
        color: '#333',
    },
    visualControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 50,
    },
    visualCircleSmall: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#F4C2C2',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    visualCircleLarge: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#F4C2C2',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
