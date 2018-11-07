<template>
  <div id="app">
    <StatusWidget v-for="machine in Machines" 
            :key="machine.name" 
            :card="getCardAttrib(machine.name)" 
            :machine="machine.name" 
            :user="machine.user | short" 
            :task="machine.task" 
            :currentProgress="machine.currentProgress" 
            :overallProgress="machine.overallProgress" 
            :timestamp="machine.timestamp" />
  </div>
</template>

<script>
import StatusWidget from '@/components/StatusWidget.vue';
import Config from '@/config.json';
import Machines from '@/machines.json';

function getCardAttrib(machine) {
  return {
    "suit": Config.machines[machine].suit ? Config.machines[machine].suit : "joker",
    "value": Config.machines[machine].value ? Config.machines[machine].suit : "joker"
  }
}

export default {
  name: 'app',
  components: {
    StatusWidget,
  },
  data: function() {
    return {
      Config,
      Machines
    }
  },
  methods: {
    getCardAttrib
  },
  filters: {
    short: (name) => {
      if (!name) return '';
      return name[0];
    }
  },
  created() {
        // Load in Status File
        // Store in machines
  }
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
