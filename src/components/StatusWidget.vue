<template>
  <div class="container">
    <div class="progress-circle">
      <span class="progress-text" :style="{left: getProgressOffsets().x + 'px', top: getProgressOffsets().y + 'px'}">{{ progress }}</span>
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

var strokeWidth = 40;
var containerWidth = 300;
var center = containerWidth/2;

function getProgressOffsets() {
  let progress = parseFloat(this.progress);
  let angle = (progress / 100 * 360 - 90) * (Math.PI / 180);  

  let xOffset = center + Math.cos(angle) * (containerWidth/2-20);
  let yOffset = center + Math.sin(angle) * (containerWidth/2-20);



  return {x: xOffset, y: yOffset};
}

function drawCircle(progress) {
  var canvas = this.$refs.circleCanvas;
  var ctx = canvas.getContext('2d');

  var radius = center - strokeWidth/2,
      // 0deg   - 1.5 * Pi,
      // 90deg  - 0   *d Pi, 
      // 180deg - 0.5 * Pi, 
      // 270deg - 1   * Pi
      angleStart = -Math.PI/2,
      angleEnd = (progress/100) * 2 * Math.PI + (-Math.PI/2);

  //Create gradient
  var gradient = ctx.createLinearGradient(0,500,0, 0);
  gradient.addColorStop(0, '#c0e674');
  gradient.addColorStop(1, '#40d6a5');

  //Draw circle
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, 2*Math.PI, false);
  ctx.lineWidth = strokeWidth;
  ctx.strokeStyle = 'rgba(0,0,0, 0.2)'
  ctx.stroke();

  //Draw arc
  ctx.beginPath();
  ctx.arc(center, center, radius, angleStart, angleEnd);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = strokeWidth;
  ctx.lineCap = 'butt';
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
    progress: String,
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
  mounted: function() {
    this.drawCircle(this.progress);
  },
  methods: {
    drawCircle,
    getProgressOffsets
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
