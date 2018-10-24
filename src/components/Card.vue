<template>
  <div class="card-container">
    <span class="user-top">{{ user }}</span>
    <div class="card-inner" :class="[suit, value]">

    </div>
    <span class="user-bottom">{{ user }}</span>
  </div>
</template>

<script>

function drawCircle(progress) {
  var canvas = this.$refs.circleCanvas;
  var ctx = canvas.getContext('2d');
  
  var strokeWidth = 30;
  var containerWidth = 300;
  var center = 300/2;

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
  ctx.lineWidth = 30;
  ctx.lineCap = 'butt';
  ctx.stroke();  
}

export default {
  name: 'Card',
  props: {
    user: String,
    suit: String,
    value: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .card-container {
    position: absolute;
    top: 50px;
    left: 70px;
    width: 160px;
    height: 200px;
    border-radius: 10px;
    background: #fff;
    -webkit-box-shadow: 3px 3px 7px rgba(0,0,0,0.3);
    box-shadow: 3px 3px 7px rgba(0,0,0,0.3);

    .card-inner {
      border: 1px solid #000;
      width: 120px;
      height: 170px;
      margin: 14px 19px;
      position: relative;

      &:before, &:after {
        font-size: 3em;
        line-height: 0px;
        margin: 21px 6px;
      }

      &:before {
        position: absolute;
        top: 0px;
        left: 0px;
      }

      &:after {
        position: absolute;
        bottom: 0px;
        right: 0px;
      }    
    }

    .user-top {
      position: absolute;
      top: 0px;
      left: 0px;
      font-size: 1.2em;
      padding: 2px 3px;
    }

    .user-bottom {
      position: absolute;
      bottom: 0px;
      right: 0px;
      font-size: 1.2em;
      padding: 2px 3px;
    }

  }




  .diamond:before, .diamond:after {
    content: "♦";
    color: #ff0000;
  }
  
  .heart:before, .heart:after {
    content: "♥";
    color: #ff0000;
  }
  
  .club:before, .club:after {
    content: "♣";
    color: #000000;
  }
  
  .spade:before, .spade:after {
    content: "♠";
    color: #000000;
  }
</style>
