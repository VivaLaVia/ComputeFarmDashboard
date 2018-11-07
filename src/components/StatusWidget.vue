<template>
  <div class="container">
    <div class="progress-circle">
      <span class="current-progress-text" :style="{left: getCurrentProgressOffsets.x + 'px', top: getCurrentProgressOffsets.y + 'px'}">{{ currentProgress }}</span>
      <span class="overall-progress-text" :style="{left: getOverallProgressOffsets.x + 'px', top: getOverallProgressOffsets.y + 'px'}">{{ overallProgress }}</span>
      <canvas ref="circleCanvas" :width="containerWidth" :height="containerWidth" class="circle"></canvas>
      <div class="progress-circle-inner">
        <Card :user="user" :suit="card.suit" :value="card.value" />
      </div>      
      <span class="task-name">{{ task }}</span>
      <span class="timestamp">{{ timestamp }}</span>
    </div>
  </div>
</template>

<script>

var strokeWidth = 20;
var containerWidth = 300;
var center = containerWidth/2;

function drawCircle(currentProgress, overallProgress = currentProgress) {
  let canvas = this.$refs.circleCanvas;
  let ctx = canvas.getContext('2d');

  let radius = center - strokeWidth
      // 0deg   - 1.5 * Pi,
      // 90deg  - 0   *d Pi, 
      // 180deg - 0.5 * Pi, 
      // 270deg - 1   * Pi
  let angleStart = -Math.PI/2;
  let currentAngleEnd = (currentProgress/100) * 2 * Math.PI + (-Math.PI/2);
  let overallAngleEnd = (overallProgress/100) * 2 * Math.PI + (-Math.PI/2);

  //Create gradient
  let gradient = ctx.createLinearGradient(0,500,0, 0);
  gradient.addColorStop(0, '#c0e674');
  gradient.addColorStop(1, '#40d6a5');

  /*
   *  Draw Background Circle
   */
  ctx.beginPath();
  ctx.arc(center, center, radius-10, 0, 2*Math.PI, false);
  ctx.lineWidth = strokeWidth*2;
  ctx.strokeStyle = 'rgba(0,0,0, 0.2)';
  ctx.stroke();

  /*
   *  Draw Progress Arcs
   */

  // Overall
  ctx.beginPath();
  ctx.arc(center, center, radius-25, angleStart, overallAngleEnd);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = strokeWidth-10;
  ctx.lineCap = 'butt';
  ctx.stroke();  

  // Current
  ctx.beginPath();
  ctx.arc(center, center, radius-5, angleStart, currentAngleEnd);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = strokeWidth + 10;
  ctx.lineCap = 'butt';
  ctx.stroke();  

  // Divider
  ctx.beginPath();
  ctx.arc(center, center, radius-20, 0, 2*Math.PI, false);
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(0,0,0, 0.25)';
  ctx.stroke();
}

import Card from '@/components/Card.vue';

export default {
  name: 'StatusWidget',
  components: {
    Card
  },
  props: {
    card: Object,
    machineName: String,
    user: String,
    task: String,
    currentProgress: Number,
    overallProgress: Number,
    timestamp: String,
  },
  data() {
    return {
      containerWidth: containerWidth,
      suit: "diamond",
      color: "red",
      value: "A"
    }
  },
  computed: {
    getCurrentProgressOffsets: function () {
      let progress = parseFloat(this.currentProgress);
      let angle = (progress / 100 * 360 - 90) * (Math.PI / 180);  

      let xOffset = center + Math.cos(angle) * (this,containerWidth/2-20);
      let yOffset = center + Math.sin(angle) * (this,containerWidth/2-20);

      return {x: xOffset, y: yOffset};
    },
    getOverallProgressOffsets: function () { 
      let progress = parseFloat(this.currentProgress);
      let angle = (progress / 100 * 360 - 90) * (Math.PI / 180);  

      let xOffset = center + Math.cos(angle) * (this,containerWidth/2-20);
      let yOffset = center + Math.sin(angle) * (this,containerWidth/2-20);

      return {x: xOffset, y: yOffset};
    }
  },
  mounted: function() {
    console.log(this.currentProgress, this.overallProgress)
    this.drawCircle(this.currentProgress, this.overallProgress);
  },
  methods: {
    drawCircle
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .progress-circle {
    position: relative;
  }
  .progress-text {
    position: absolute;
    width: 26px;
    height: 26px;
    margin-left: -13px;
    margin-top: -13px;
    line-height: 26px;
    font-weight: 600;
    font-size: 1em;
    z-index: 100;
  }
  .container {
    width: 300px;
    height: 300px;
    display: inline-block;
    margin: 8px;
    position: relative;
  }
  .task-name {
    display: block;
    font-weight: 600;
    font-size: 1.2em;
  }
  .timestamp {
    color: rgba(0,0,0, 0.37);
    font-size: .9em;
  }
  .card {
    width: 160px;
    height: 200px;
    background-color: white;
    box-shadow: 2px 2px 8px 0px rgba(0,0,0, 0.37);
    border-radius: 3px;
    position: absolute;
    top: 50px;
    left: 70px;
  }
</style>
