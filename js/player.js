import {
    currentAudio,
    songs,
    currentSongIndex,
    setCurrentAudio,
    setCurrentSongIndex
} from "./state.js";

import { parseSongAndArtist, formatTime } from "./utils.js";
import {
    resetAllPlayIcons,
    updateMainPlayIcon,
    updateListPlayIcon,
    renderRecentlyPlayed
} from "./ui.js";

import { trendingSongs, recentlyPlayed, setRecentlyPlayed } from "./data.js";

export function playMusic(index) {
    if (currentAudio) currentAudio.pause();

    resetAllPlayIcons();
    setCurrentSongIndex(index);

    const audio = new Audio("songs/" + songs[index]);
    setCurrentAudio(audio);
    audio.play();

    const { song, artist } = parseSongAndArtist(songs[index]);
    document.querySelector(".song-info").textContent = `${song} - ${artist}`;
    document.querySelector(".song-info").style.display = "block";

    updateMainPlayIcon(true);
    updateListPlayIcon(index, true);

    audio.ontimeupdate = updateSeekbar;
    audio.onended = playNextSong;
}

export function playFromTrending(filename) {
    const index = songs.indexOf(filename);
    if (index === -1) return;

    playMusic(index);

    const data = trendingSongs.find(s => s.file === filename);
    if (!data) return;

    setRecentlyPlayed([
        data,
        ...recentlyPlayed.filter(s => s.file !== filename)
    ]);

    renderRecentlyPlayed();
}

export function playNextSong() {
    playMusic((currentSongIndex + 1) % songs.length);
}

export function playPreviousSong() {
    playMusic((currentSongIndex - 1 + songs.length) % songs.length);
}

export function updateSeekbar() {
    if (!currentAudio.duration) return;

    const percent =
        (currentAudio.currentTime / currentAudio.duration) * 100;

    document.querySelector(".seekbar-progress").style.width =
        percent + "%";
    document.querySelector(".seekbar-circle").style.left =
        percent + "%";

    document.querySelector(".song-time-left").textContent =
        formatTime(currentAudio.currentTime);
    document.querySelector(".song-time-right").textContent =
        formatTime(currentAudio.duration);
}
