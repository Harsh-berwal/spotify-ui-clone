import { getSongs } from "./service.js";
import { setSongs, currentAudio, currentSongIndex } from "./state.js";
import {
    displaySongs,
    renderTrending,
    renderRecentlyPlayed,
    updateMainPlayIcon,
    updateListPlayIcon
} from "./ui.js";
import {
    playMusic,
    playNextSong,
    playPreviousSong
} from "./player.js";
import { parseSongAndArtist } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
    const songList = await getSongs();
    setSongs(songList);
    displaySongs(songList);

    document.querySelector("#play").onclick = () => {
        if (!currentAudio) return playMusic(0);

        if (currentAudio.paused) {
            currentAudio.play();
            updateMainPlayIcon(true);
            updateListPlayIcon(currentSongIndex, true);
        } else {
            currentAudio.pause();
            updateMainPlayIcon(false);
            updateListPlayIcon(currentSongIndex, false);
        }
    };

    document.querySelector("#next").onclick = playNextSong;
    document.querySelector("#previous").onclick = playPreviousSong;

    document.querySelector(".seekbar").onclick = e => {
        if (!currentAudio) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        currentAudio.currentTime = percent * currentAudio.duration;
    };

    document.querySelector(".search-input").oninput = e => {
        const value = e.target.value.toLowerCase();
        displaySongs(
            songList.filter(file => {
                const { song, artist } = parseSongAndArtist(file);
                return song.toLowerCase().includes(value) ||
                       artist.toLowerCase().includes(value);
            })
        );
    };

    renderTrending();
    renderRecentlyPlayed();
});
