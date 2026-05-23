export const ICONS = {
    play: "icon/play.svg",
    pause: "icon/pause.svg",
    music: "icon/music.svg"
};

export const trendingSongs = [
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

export let recentlyPlayed = [];
export function setRecentlyPlayed(value) {
    recentlyPlayed = value;
}
