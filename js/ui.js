import { ICONS, trendingSongs, recentlyPlayed } from "./data.js";
import { parseSongAndArtist } from "./utils.js";
import { playMusic, playFromTrending } from "./player.js";

export function resetAllPlayIcons() {
    document.querySelectorAll(".play-pause-list-button")
        .forEach(btn => btn.src = ICONS.play);
}

export function updateMainPlayIcon(isPlaying) {
    document.querySelector("#play").src =
        isPlaying ? ICONS.pause : ICONS.play;
}

export function updateListPlayIcon(index, isPlaying) {
    const btn = document.querySelector(
        `.music-card-list-item[data-index="${index}"] .play-pause-list-button`
    );
    if (btn) btn.src = isPlaying ? ICONS.pause : ICONS.play;
}

export function displaySongs(songs) {
    const ul = document.querySelector(".song-list ul");
    ul.innerHTML = "";

    songs.forEach((file, index) => {
        const { song, artist } = parseSongAndArtist(file);

        const li = document.createElement("li");
        li.className = "music-card-list-item";
        li.dataset.index = index;

        li.innerHTML = `
            <div class="music-card-in-list">
                <img src="${ICONS.music}" class="invert">
                <div class="song-text">
                    <h4>${song}</h4>
                    <p>${artist}</p>
                </div>
                <img src="${ICONS.play}" class="play-pause-list-button invert">
            </div>
        `;

        li.onclick = () => playMusic(index);
        ul.appendChild(li);
    });
}

export function renderTrending() {
    const row = document.querySelector(".trending-row");
    if (!row) return;

    row.innerHTML = "";

    trendingSongs.forEach(song => {
        const card = document.createElement("div");
        card.className = "trending-card";

        card.innerHTML = `
            <div class="trending-image">
                <img src="${song.image}">
                <div class="trending-play">▶</div>
            </div>
            <h4>${song.title}</h4>
            <p>${song.artist}</p>
        `;

        card.querySelector(".trending-play").onclick = e => {
            e.stopPropagation();
            playFromTrending(song.file);
        };

        row.appendChild(card);
    });
}

export function renderRecentlyPlayed() {
    const list = document.querySelector(".recent-list");
    if (!list) return;

    list.innerHTML = "";

    recentlyPlayed.slice(0, 5).forEach(song => {
        const item = document.createElement("div");
        item.className = "recent-item";

        item.innerHTML = `
            <img src="${song.image}">
            <div>
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>
            <span class="recent-play">▶</span>
        `;

        item.onclick = () => playFromTrending(song.file);
        list.appendChild(item);
    });
}
