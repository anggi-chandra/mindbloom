import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('Liz');
    const [hobby, setHobby] = useState('Fishing');
    const [gender, setGender] = useState('Female');
    const [password, setPassword] = useState('••••••••••');
    const [showPassword, setShowPassword] = useState(false);

    const getHobbyIcon = (hobbyName: string) => {
        const lowerHobby = hobbyName.toLowerCase();
        if (lowerHobby.includes('fish')) return 'fish-outline';
        if (lowerHobby.includes('read') || lowerHobby.includes('book')) return 'book-outline';
        if (lowerHobby.includes('game') || lowerHobby.includes('gaming')) return 'game-controller-outline';
        if (lowerHobby.includes('music') || lowerHobby.includes('sing')) return 'musical-notes-outline';
        if (lowerHobby.includes('sport') || lowerHobby.includes('ball') || lowerHobby.includes('run')) return 'football-outline';
        if (lowerHobby.includes('cook') || lowerHobby.includes('food')) return 'restaurant-outline';
        if (lowerHobby.includes('travel')) return 'airplane-outline';
        if (lowerHobby.includes('art') || lowerHobby.includes('draw')) return 'color-palette-outline';
        return 'happy-outline'; // Default icon
    };

    const handleEditToggle = () => {
        if (isEditing) {
            // Save logic here
            console.log('Saved:', { name, hobby, gender, password });
        }
        setIsEditing(!isEditing);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <ThemedText type="title" style={styles.headerTitle}>Profile</ThemedText>
                    <TouchableOpacity onPress={handleEditToggle}>
                        <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
                    </TouchableOpacity>
                </View>

                {/* Avatar Section */}
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarWrapper}>
                        <View style={styles.avatarContent}>
                            <Ionicons name="person-outline" size={60} color="#666" />
                        </View>
                        <Image
                            source={require('@/assets/images/border_music_player.png')}
                            style={styles.avatarBorder}
                            resizeMode="contain"
                        />
                        <View style={styles.avatarShadow} />
                    </View>
                    <TouchableOpacity style={styles.editAvatarButton}>
                        <Ionicons name="create-outline" size={20} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* User Details */}
                <View style={styles.detailsContainer}>
                    {/* Name */}
                    <View style={styles.detailItem}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="person-outline" size={24} color="#000" />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.label}>Name</Text>
                            {isEditing ? (
                                <TextInput
                                    style={styles.input}
                                    value={name}
                                    onChangeText={setName}
                                />
                            ) : (
                                <Text style={styles.value}>{name}</Text>
                            )}
                        </View>
                    </View>

                    {/* Hobby */}
                    <View style={styles.detailItem}>
                        <View style={styles.iconContainer}>
                            <Ionicons name={getHobbyIcon(hobby) as any} size={24} color="#000" />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.label}>Hobby</Text>
                            {isEditing ? (
                                <TextInput
                                    style={styles.input}
                                    value={hobby}
                                    onChangeText={setHobby}
                                />
                            ) : (
                                <Text style={styles.value}>{hobby}</Text>
                            )}
                        </View>
                    </View>

                    {/* Gender */}
                    <View style={styles.detailItem}>
                        <View style={styles.iconContainer}>
                            <Ionicons
                                name={
                                    gender.toLowerCase() === 'male' ? 'male-outline' :
                                        gender.toLowerCase() === 'female' ? 'female-outline' :
                                            'male-female-outline'
                                }
                                size={24}
                                color="#000"
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.label}>Gender</Text>
                            {isEditing ? (
                                <TextInput
                                    style={styles.input}
                                    value={gender}
                                    onChangeText={setGender}
                                />
                            ) : (
                                <Text style={styles.value}>{gender}</Text>
                            )}
                        </View>
                    </View>

                    {/* Password */}
                    <View style={styles.detailItem}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="lock-closed-outline" size={24} color="#000" />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.label}>Password</Text>
                            {isEditing ? (
                                <View style={styles.passwordContainer}>
                                    <TextInput
                                        style={[styles.input, { flex: 1 }]}
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                    />
                                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                        <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#666" />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <Text style={styles.value}>{'•'.repeat(password.length)}</Text>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 30,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    editButtonText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 40,
        position: 'relative',
    },
    avatarWrapper: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    avatarBorder: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    avatarContent: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFF5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editAvatarButton: {
        position: 'absolute',
        bottom: 10,
        right: '35%', // Adjust based on the larger container
        backgroundColor: '#FFF',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#EEE',
        zIndex: 10,
    },
    avatarShadow: {
        position: 'absolute',
        bottom: -15,
        width: 100,
        height: 10,
        borderRadius: 50,
        backgroundColor: '#E0E0E0',
        opacity: 0.6,
    },
    detailsContainer: {
        gap: 25,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 2,
    },
    value: {
        fontSize: 14,
        color: '#666',
    },
    input: {
        fontSize: 14,
        color: '#333',
        borderBottomWidth: 1,
        borderBottomColor: '#FADADD',
        paddingVertical: 2,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#FADADD',
    },
});
