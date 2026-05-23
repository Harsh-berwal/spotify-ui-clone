import { getSongs } from "./service.js";
import { setSongs, currentAudio, currentSongIndex } from "./state.js";
import {
    displaySongs,
    renderMobileSearchResults,
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

    const sidebarToggle = document.querySelector(".nav-toggle");
    const sidebarBackdrop = document.querySelector(".sidebar-backdrop");

    const setSidebarOpen = isOpen => {
        document.body.classList.toggle("sidebar-open", isOpen);
        if (sidebarToggle) {
            sidebarToggle.setAttribute("aria-expanded", String(isOpen));
        }

        if (sidebarBackdrop) {
            sidebarBackdrop.hidden = !isOpen;
        }
    };

    if (sidebarToggle) {
        sidebarToggle.onclick = () => {
            setSidebarOpen(!document.body.classList.contains("sidebar-open"));
        };
    }

    if (sidebarBackdrop) {
        sidebarBackdrop.onclick = () => setSidebarOpen(false);
    }

    window.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            setSidebarOpen(false);
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            setSidebarOpen(false);
        }
    });

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
        const filteredSongs = songList.filter(file => {
            const { song, artist } = parseSongAndArtist(file);
            return song.toLowerCase().includes(value) ||
                   artist.toLowerCase().includes(value);
        });

        displaySongs(
            filteredSongs
        );

        if (window.innerWidth < 768) {
            renderMobileSearchResults(filteredSongs, value);
        } else {
            const panel = document.querySelector(".mobile-search-results");
            if (panel) {
                panel.hidden = true;
                panel.classList.remove("is-visible");
                panel.innerHTML = "";
            }
        }
    };

    renderTrending();
    renderRecentlyPlayed();
});
