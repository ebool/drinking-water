<template>
  <div class="bottle-cont">
    <svg version="1.1"
      baseProfile="full"
      width="100%" height="100%"
      class="svg"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="water" width=".25" height="1.1" patternContentUnits="objectBoundingBox">
          <path fill="white" d="M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25,0C0.25,0.327,0.25,1,0.25,1z"/>
        </pattern>
        <text id="text" min-width="320px" transform="matrix(1 0 0 1 -8.0684 116.7852)" font-size="130">{{dashboardData.toFixed(1)}}%</text>
        <mask id="text_mask">
          <use x="0" y="0" xlink:href="#text" opacity="1" fill="#3498db"/>
        </mask>
      </defs>
      <use x="0" y="0" xlink:href="#text" fill="#3498db"/>
      <!-- <rect class="water-fill" fill="url(#water)" x="0" y="0" width="800" height="120"/> -->
      <rect class="water-fill" mask="url(#text_mask)" fill="url(#water)" x="0" y="0" width="1600" height="180"/>
    </svg>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      dashboardData: 0
    }
  },
  computed: {
    todayDrinkWaterProportion () {
      let result = (this.todayDrinkWater / this.recommendedAmount) * 100;
      if (result >= 100) return 100;
      // return result.toFixed(1);
      return result;
    },
    ...mapGetters(['recommendedAmount', 'todayDrinkWater'])
  },
  watch: {
    todayDrinkWaterProportion (v) {
      if (!v) return;
      let diff = v - this.dashboardData;
      let termTime = 100;
      let totalTime = 500;
      let term = diff / termTime;

      let timer = setInterval(() => {
        this.dashboardData += term;
        if (diff > 0) {
          if (this.dashboardData >= v) {
            this.dashboardData = v;
            clearInterval(timer);
          }
        } else {
          if (this.dashboardData <= v) {
            this.dashboardData = v;
            clearInterval(timer);
          }
        }
      }, totalTime / termTime)
    }
  }
}
</script>

<style lang="scss" scoped>
.bottle-cont {

  .svg {
    overflow: visible;
  }
  .water-fill {
    animation: wave .7s infinite linear, fill-up 10s infinite linear alternate;
  }
  @keyframes wave {
    0% { x: -400px; }
    100% { x: 0; }
  }
  @keyframes fill-up {
    0% {
      height: 0;
      y: 140px;
    }
    100% {
      height: 140px;
      y: 0px;
    }
  }
}
</style>
