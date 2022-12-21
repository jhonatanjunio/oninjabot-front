<template>
    <Transition>
        <div v-if="show">
            <div class="cardx" id="border" :style="{ 'background-image': 'url(' + image + ')' }">
                <div id="image_block">
                    <a :href="spotify_url">
                        <div id="spotify_icon">
                            <font-awesome-icon :icon="['fab', 'spotify']" size="2x" />
                        </div>
                    </a>
                </div>
                <div id="info" :style="title.length > 23 ? 'height: 100px' : ''">
                    <div id="progress_bar">
                        <div id="current_time">{{ progress }}</div>
                        <div id="total_time">{{ duration }}</div>
                        <div id="fill" :style="{ 'width': progress_percentage + '%' }"></div>
                    </div>
                    <div id="artist">
                        <h2 id="song_name">{{ title }}</h2>
                        <h3 id="artist_name">{{ artist }}</h3>
                    </div>
                </div>
            </div>
            <div id="requester" v-if="requester != ''">
                <h2 id="requester_name">Adicionado por: {{ requester }}</h2>
            </div>
        </div>
    </Transition>
</template>

<script lang="ts">

export default {
    name: "Musicplayer",
    data() {
        return {
            show: false,
            title: "Fetching data...",
            artist: "Someone",
            image: "/src/assets/no_song.png",
            progress: "3:00",
            duration: "3:00",
            progress_percentage: 100,
            spotify_url: "#",
            requester: "",
            progressMs: 0,
            durationMs: 0,
            interval: 0
        };
    },

    sockets: {
        connect: function () {
            console.log('socket connected')
        },
        getMusic: function (musicData) {
            this.show = true;
            clearInterval(this.interval)
            this.getMusic(musicData);
        }
    },

    methods: {

        millisToMinutesAndSeconds(millis) {
            let minutes = Math.floor(millis / 60000);
            let seconds = ((millis % 60000) / 1000).toFixed(0);
            return (
                parseInt(seconds) == 60 ?
                    (minutes + 1) + ":00" :
                    minutes + ":" + (parseInt(seconds) < 10 ? "0" : "") + seconds
            );
        },

        getArtists(artistsArr) {
            let artists = "";

            for (let artist of artistsArr) {
                artists += artist.name + ", ";
            }
            if (artists.length) return artists.slice(0, -2);
            else return "Some artist";
        },

        musicProgress() {

            this.interval = setInterval(() => {

                this.progressMs = this.progressMs + 1000;
                this.progress_percentage = (this.progressMs / this.durationMs) * 100;
                this.progress = this.millisToMinutesAndSeconds(this.progressMs);

                if (this.millisToMinutesAndSeconds(this.progressMs) == this.millisToMinutesAndSeconds(this.durationMs)) {
                    clearInterval(this.interval);
                }
            }, 1000);

        },

        getMusic(musicData) {

            if (musicData.requester) {
                this.requester = musicData.requester;
            }
            musicData = musicData.musicData;

            this.progressMs = musicData.progress_ms;
            this.durationMs = musicData.duration_ms;

            let duration_min_sec = this.millisToMinutesAndSeconds(musicData.duration_ms);
            // let progress_min_sec = this.millisToMinutesAndSeconds(musicData.progress_ms);
            this.artist = this.getArtists(musicData.artists);
            this.title = musicData.name;
            this.image = musicData.album.images[1].url;
            this.duration = duration_min_sec;
            // this.progress = progress_min_sec;
            // this.progress_percentage = Math.floor((musicData.progress_ms / musicData.duration_ms) * 100);
            this.musicProgress();
            this.spotify_url = musicData.external_urls.spotify;

            var that = this;

            setTimeout(function () {
                that.show = false;
            }, 20000);
        },

    },
};
</script>

<script lang="ts" setup>

</script>

<style lang="css">

@import url("https://fonts.googleapis.com/css?family=Questrial");

#requester {
    font-family: "Questrial", sans-serif;
    position: relative;
    margin: auto;
    width: 300px;
    overflow: hidden;
    background-color: black;
    color: white;
    box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.6);
}

#requester_name {
    margin: 5px;
    text-align: center;
    font-size: 0.75em;
}

#border {
    font-family: "Questrial", sans-serif;
    position: relative;
    margin: auto;
    width: 300px;
    height: 300px;
    overflow: hidden;
    background-size: 300px;
    box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.6);
}

#spotify_icon {
    color: rgba(255, 255, 255, 0.9);
    position: absolute;
    right: 10px;
    top: 10px;
}

#spotify_icon:hover {
    color: rgba(255, 255, 255, 1);
    transition: all .5s;
    transform: translateY(-2px);
}

#info {
    height: 90px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.87);
}

#progress_bar {
    height: 5px;
    width: 73%;
    margin: 6% auto;
    background-color: #c0cfb2;
    border-radius: 10px;
}

#fill {
    background-color: #8ba989;
    height: 0.3rem;
    border-radius: 2px;
}

#artist {
    text-align: center;
    margin-top: -3px;
}

#current_time,
#total_time {
    font-size: 10px;
    position: absolute;
    margin-top: -2px;
}

#current_time {
    left: 15px;
}

#total_time {
    right: 15px;
}

#artist_name,
#song_name {
    text-transform: uppercase;
    margin: 0;
}

#song_name {
    font-size: 1em;
    letter-spacing: 3px;
    color: #49654d;
}

#artist_name {
    font-size: 0.85em;
    letter-spacing: 1.7px;
    margin-top: 5px;
    color: #8ba989;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>