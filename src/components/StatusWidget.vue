<template>
  <div class="container">
    <div class="progress-circle">

      <span class="current-progress-text" :style="{left: getCurrentProgressOffsets.x + 'px', top: getCurrentProgressOffsets.y + 'px'}">{{ currentProgress }}</span>
      <span class="overall-progress-text" :style="{left: getOverallProgressOffsets.x + 'px', top: getOverallProgressOffsets.y + 'px'}">{{ overallProgress }}</span>
      
      <div class="progress-tooltop" ref="progressTooltip"></div>

      <canvas ref="circleCanvas" @mouseover="mouseOver" @mouseleave="hideProgress" :width="containerWidth" :height="containerWidth" class="circle"></canvas>

      <div class="progress-circle-inner">
        <Card :user="user" :suit="card.suit" :value="card.value" />
      </div>  

      <span class="task-name">{{ task }}</span>
      <span class="timestamp">{{ timestamp }}</span>

    </div>
  </div>
</template>

<script>

  const strokeWidth = 40;
  const containerWidth = 300;
  const center = containerWidth/2;

  const progressCircleRadius = center - strokeWidth/2;

  const currentArcWeight = .75;
  const overallArcWeight = .25;

  const currentCircleRadius = progressCircleRadius - (strokeWidth/2) + (strokeWidth * currentArcWeight / 2);
  const overallCircleRadius = currentCircleRadius + (strokeWidth * currentArcWeight / 2) + (strokeWidth * overallArcWeight / 2);
  const dividerRadius = currentCircleRadius + (strokeWidth * currentArcWeight / 2);

  function drawCircle(currentProgress, overallProgress = currentProgress) {
    let canvas = this.$refs.circleCanvas;
    let ctx = canvas.getContext('2d');

    let angleStart = -Math.PI/2;
    let currentAngleEnd = (currentProgress/100) * 2 * Math.PI + (-Math.PI/2);
    let overallAngleEnd = (overallProgress/100) * 2 * Math.PI + (-Math.PI/2);

    // Create gradient
    let gradient = ctx.createLinearGradient(0,500,0, 0);
    gradient.addColorStop(0, '#c0e674');
    gradient.addColorStop(1, '#40d6a5');

    /*
    *  Draw Background Circle
    */
    ctx.beginPath();
    ctx.arc(center, center, progressCircleRadius, 0, 2*Math.PI, false);
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = 'rgba(0,0,0, 0.2)';
    ctx.stroke();

    /*
    *  Draw Progress Arcs
    */

    // Overall
    ctx.beginPath();
    ctx.arc(center, center, overallCircleRadius, angleStart, overallAngleEnd);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = strokeWidth*overallArcWeight;
    ctx.lineCap = 'butt';
    ctx.stroke();  

    // Current
    ctx.beginPath();
    ctx.arc(center, center, currentCircleRadius, angleStart, currentAngleEnd);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = strokeWidth*currentArcWeight;
    ctx.lineCap = 'butt';
    ctx.stroke();  

    // Divider
    ctx.beginPath();
    ctx.arc(center, center, dividerRadius, 0, 2*Math.PI, false);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0,0,0, 0.25)';
    ctx.stroke();
  }

  function mouseOver(mouse) {
    let x  = mouse.clientX;
    let y  = mouse.clientY + window.pageYOffset;

    let canvasBounds = this.$refs.circleCanvas.getBoundingClientRect();
    
    let a = x - (canvasBounds.left + containerWidth/2);
    let b = y - (window.pageYOffset + canvasBounds.top + containerWidth/2);

    let distFromCenter = Math.sqrt(Math.pow(Math.abs(a), 2) + Math.pow(Math.abs(b), 2));

    if(distFromCenter >= currentCircleRadius - (strokeWidth * currentArcWeight / 2) && 
        distFromCenter <= currentCircleRadius + (strokeWidth * currentArcWeight / 2)) {

        showProgress(this.$refs, x, y, `Current job progress: ${this.currentProgress}%`);
        return;
    } 
    
    if(distFromCenter >= overallCircleRadius - (strokeWidth * overallArcWeight / 2) && 
        distFromCenter <= overallCircleRadius + (strokeWidth * overallArcWeight / 2)) {

        showProgress(this.$refs, x, y, `Overall jobs progress: ${this.overallProgress}%`);
        return;
    }
  }

  function showProgress($refs, x, y, text) {
    let tooltip = $refs.progressTooltip;
    console.log(tooltip)
    tooltip.style.display = "inline-block";
    //tooltip.style.left = x;
    //tooltip.style.top = y;
    tooltip.innerHTML = text;
  }

  function hideProgress() {
    this.$refs.progressTooltip.style.display = "none";
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
      this.drawCircle(this.currentProgress, this.overallProgress);
    },
    methods: {
      drawCircle,
      mouseOver,
      hideProgress
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

 .container {
    width: 300px;
    height: 300px;
    display: inline-block;
    margin: 8px;
    position: relative;

      .progress-circle {
        position: relative;

          &:hover > .progress-tooltip {
            display: inline-block;
          }

          .progress-tooltip {
            display: none;
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

          .task-name {
            display: block;
            font-weight: 600;
            font-size: 1.2em;
          }

          .timestamp {
            color: rgba(0,0,0, 0.37);
            font-size: .9em;
          }
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
  }



 



</style>
