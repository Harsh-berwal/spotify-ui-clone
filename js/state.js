export let currentAudio = null;
export let songs = [];
export let currentSongIndex = -1;

export function setCurrentAudio(audio) {
    currentAudio = audio;
}

export function setSongs(list) {
    songs = list;
}

export function setCurrentSongIndex(index) {
    currentSongIndex = index;
}
