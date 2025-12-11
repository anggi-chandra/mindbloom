import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function CalmBreathCompletionScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('@/assets/images/logo_samping_warna.png')}
                        style={styles.logoImage}
                        contentFit="contain"
                    />
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.illustrationContainer}>
                    <Image
                        source={require('@/assets/images/gambar4.png')}
                        style={styles.illustrationImage}
                        contentFit="contain"
                    />
                    <Text style={styles.completionText}>
                        Great job, you've{'\n'}completed your{'\n'}Calm Breath{'\n'}Exercise!
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push('/(tabs)/recommend-activities-list')}
                >
                    <Text style={styles.buttonText}>Try Another Activity</Text>
                </TouchableOpacity>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoImage: {
        width: 120,
        height: 30,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 50,
    },
    illustrationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    illustrationImage: {
        width: width * 1.5,
        height: width * 1.5,
        position: 'absolute', // Position image behind text if needed, or adjust layout
        opacity: 0.8, // Adjust opacity if it's a background for the text
        marginTop: 100, // Move image down
    },
    // Based on the design image, the text is overlaid on the tree image or the tree is the background
    // Let's adjust: The image seems to be a large tree. The text is centered.
    // I'll make the image a large central element and overlay text if that's the design intent, 
    // or just place them vertically. 
    // Looking at the uploaded image: The tree is in the background, text is on top.

    completionText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        lineHeight: 40,
        zIndex: 1, // Ensure text is on top
        marginTop: -250, // Move text up further
    },
    button: {
        backgroundColor: '#E89898',
        paddingVertical: 18,
        width: '100%',
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#E89898',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
});
