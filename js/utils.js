export function parseSongAndArtist(filename) {
    const clean = decodeURIComponent(filename).replace(".mp3", "").trim();
    const parts = clean.split(" - ");

    return {
        song: parts[0] || "Unknown Song",
        artist: parts[1] || "Unknown Artist"
    };
}

export function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}
