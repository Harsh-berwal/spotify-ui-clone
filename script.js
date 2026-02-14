let currentAudio = null;
let songs = [];
let currentSongIndex = -1;

const ICONS = {
    play: "icon/play.svg",
    pause: "icon/pause.svg",
    music: "icon/music.svg"
};

/* =========================
   TRENDING DATA
========================= */

const trendingSongs = [
    {
        title: "Espresso",
        artist: "Sabrina Carpenter",
        file: "espresso.mp3",
        image: "images/Espresso.png"
    },
    {
        title: "Hass Hass",
        artist: "Diljit Dosanjh & Sia",
        file: "hass.mp3",
        image: "images/Hass Hass.png"
    },
    {
        title: "Gata Only",
        artist: "FloyyMenor & Cris MJ",
        file: "gata.mp3",
        image: "images/Gata Only.png"
    },
    {
        title: "Kings & Queens",
        artist: "Ava Max",
        file: "kings&queen.mp3",
        image: "images/Kings & Queens.png"
    }
];



let recentlyPlayed = [];

/* =========================
   FETCH SONGS
========================= */

async function getSongs() {
    return [
        "Espresso - Sabrina Carpenter.mp3",
        "Gata Only - FloyyMenor & Cris MJ.mp3",
        "Hass Hass - Diljit Dosanjh & Sia.mp3",
        "Kings & Queens - Ava Max.mp3",
        "Na Ja - Pav Dharia.mp3",
        "Ghungroo - Arijit Singh & Shilpa Rao.mp3"
    ];
}



function parseSongAndArtist(filename) {
    const clean = decodeURIComponent(filename).replace(".mp3", "").trim();
    const parts = clean.split(" - ");

    return {
        song: parts[0] || "Unknown Song",
        artist: parts[1] || "Unknown Artist"
    };
}

/* =========================
   UI HELPERS
========================= */

function resetAllPlayIcons() {
    document.querySelectorAll(".play-pause-list-button")
        .forEach(btn => btn.src = ICONS.play);
}

function updateMainPlayIcon(isPlaying) {
    document.querySelector("#play").src = isPlaying ? ICONS.pause : ICONS.play;
}

function updateListPlayIcon(index, isPlaying) {
    const btn = document.querySelector(
        `.music-card-list-item[data-index="${index}"] .play-pause-list-button`
    );
    if (btn) btn.src = isPlaying ? ICONS.pause : ICONS.play;
}

/* =========================
   DISPLAY SONG LIST
========================= */

function displaySongs(list = songs) {
    const ul = document.querySelector(".song-list ul");
    ul.innerHTML = "";

    list.forEach((file, index) => {
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

/* =========================
   TRENDING RENDER
========================= */

function renderTrending() {
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

        card.querySelector(".trending-play").onclick = (e) => {
            e.stopPropagation();
            playFromTrending(song.file);
        };

        row.appendChild(card);
    });
}

/* =========================
   RECENTLY PLAYED RENDER
========================= */

function renderRecentlyPlayed() {
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


/* =========================
   PLAY MUSIC
========================= */

function playMusic(index) {
    if (currentAudio) currentAudio.pause();

    resetAllPlayIcons();
    currentSongIndex = index;

    currentAudio = new Audio("songs/" + songs[index]);
    currentAudio.play();

    const { song, artist } = parseSongAndArtist(songs[index]);
    document.querySelector(".song-info").textContent = `${song} - ${artist}`;
    document.querySelector(".song-info").style.display = "block";

    updateMainPlayIcon(true);
    updateListPlayIcon(index, true);

    currentAudio.ontimeupdate = updateSeekbar;
    currentAudio.onended = playNextSong;
}

function playFromTrending(filename) {
    const index = songs.indexOf(filename);
    if (index === -1) return;

    playMusic(index);

    const data = trendingSongs.find(s => s.file === filename);
    if (!data) return;

    recentlyPlayed = [
        data,
        ...recentlyPlayed.filter(s => s.file !== filename)
    ];

    renderRecentlyPlayed();
}


/* =========================
   SEEK BAR
========================= */

function updateSeekbar() {
    if (!currentAudio.duration) return;

    const percent = (currentAudio.currentTime / currentAudio.duration) * 100;

    document.querySelector(".seekbar-progress").style.width = percent + "%";
    document.querySelector(".seekbar-circle").style.left = percent + "%";

    document.querySelector(".song-time-left").textContent =
        formatTime(currentAudio.currentTime);
    document.querySelector(".song-time-right").textContent =
        formatTime(currentAudio.duration);
}

/* =========================
   UTILITIES
========================= */

function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

function playNextSong() {
    playMusic((currentSongIndex + 1) % songs.length);
}

function playPreviousSong() {
    playMusic((currentSongIndex - 1 + songs.length) % songs.length);
}

/* =========================
   EVENTS
========================= */

document.addEventListener("DOMContentLoaded", async () => {
    songs = await getSongs();
    displaySongs();

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
            songs.filter(file => {
                const { song, artist } = parseSongAndArtist(file);
                return song.toLowerCase().includes(value) ||
                       artist.toLowerCase().includes(value);
            })
        );
    };

    renderTrending();
    renderRecentlyPlayed();
});

