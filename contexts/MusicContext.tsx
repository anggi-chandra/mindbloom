import React, { createContext, ReactNode, useContext, useState } from 'react';

interface Song {
    id: number;
    name: string;
    artist: string;
}

interface MusicContextType {
    currentSong: Song | null;
    isPlaying: boolean;
    playSong: (song: Song) => void;
    pauseSong: () => void;
    resumeSong: () => void;
    closePlayer: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playSong = (song: Song) => {
        setCurrentSong(song);
        setIsPlaying(true);
    };

    const pauseSong = () => {
        setIsPlaying(false);
    };

    const resumeSong = () => {
        setIsPlaying(true);
    };

    const closePlayer = () => {
        setCurrentSong(null);
        setIsPlaying(false);
    };

    return (
        <MusicContext.Provider value={{ currentSong, isPlaying, playSong, pauseSong, resumeSong, closePlayer }}>
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (context === undefined) {
        throw new Error('useMusic must be used within a MusicProvider');
    }
    return context;
};
