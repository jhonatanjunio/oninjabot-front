<template>
    <div class="container">

        <!-- Dynamic healthbar -->
        <svg class="healthbar" xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 38 9" shape-rendering="crispEdges">
            <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
            <path stroke="#222034"
                d="M3 2h1M3 2h32M3  3h1M2 3h1M35 3h1M3 4h1M2 4h1M35 4h1M3  5h1M2 5h1M35 5h1M3 6h32M3" />


            <path stroke="#323c39" d="M3 3h32" />
            <path stroke="#494d4c" d="M3 4h32M3 5h32" />
            <!-- Fill container -->
            <svg x="3" y="2.5" width="32" height="3">
                <rect class="healthbar_fill" :style="`width: ${expMeter}%`" height="3" />
            </svg>

        </svg>
        <span class="avatarLvl">
            {{ avatarLvl }}
        </span>
        <button type="button" @click="giveXp(30)">Dar xp</button>        
    </div>
</template>

<style lang="scss">
@import "../../styles/base/base.scss";
</style>

<script lang="ts" setup>

</script>

<script lang="ts">
import { httpService } from '../../services'

export default {

    data() {
        return {
            avatarLvl: 1,
            expMeter: 0,
        }
    },

    sockets: {
        connect: function () {
            console.log('socket connected')
        },
        avatarGiveXp: function (amount) {            
            this.giveXp(amount.givenXp);
        }
    },

    mounted: function(){
        this.getXp();
    },

    methods: {
        
        getXp() {            
            httpService.get("/get-avatar").then(result => {
                this.avatarLvl = result.data.data.level;
                this.expMeter = result.data.data.currentXp;
            });
        },

        giveXp(amount) {
            let newValue = this.expMeter + amount;
            
            if (newValue == 100) {
                this.avatarLvl += 1;
                this.expMeter = 0;
            } else if (newValue > 100) {
                this.avatarLvl += 1;
                this.expMeter = newValue - 100;
            } else if (newValue < 100) {
                this.expMeter += newValue
            }

            httpService.post("/give-exp", {
                currentXp: this.expMeter,
                level: this.avatarLvl
            }).then(result => {
                this.avatarLvl = result.data.data.level;
                this.expMeter = result.data.data.currentXp;
            });
        },
    },
};
</script>