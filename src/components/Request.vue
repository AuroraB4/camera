<template>
  <div class="all">
    <div class="wrapperRequest">
      <div class="containerRequest">
        <div class="v-alignedRequest">
          <div>
            <b>Term:</b>
            <div>{{ term }} </div>
          </div>
          <div style="margin-top:5px;" v-if="eurovocs.length > 0">
            <b>Eurovocs:</b>
              {{ formattedEurovocs }}     
          </div>
        </div>
        <div class="v-alignedRequest right-alignRequest">
          <div>
            <b>Date:</b>
            <div>{{ date }} </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import{ref, defineProps, computed } from 'vue';

const props = defineProps({
  term: {
    type: String,
    required: true,
    default: () => ""
  },
  eurovocs: {
    type: Array,
    required: true,
    default: () => []
  },
  date: {
    type: String,
    required: true,
    default: () => ""
  }
});
const formattedEurovocs = computed(() => {
  return props.eurovocs.join(', ');
});

</script>

<style>
  .containerRequest {
    display: flex;
    align-items: flex-start;
    padding-left:20px;
    padding-right:20px;
    font-size:13px;
    align-content:center;
  }
  .v-alignedRequest {
    width: 50%;
    align-items: flex-start;
  }

  .wrapperRequest{
    width: 100%;
    justify-content: center;
    background-color:#EEEEEE;
    border-radius:5pt;
    margin: auto;
    margin-top:10px;
    padding-top:10px;
    padding-bottom:10px;
    outline: 1px solid #B9B9B9;
    color:#6C6C6C;
    
  }
  .v-alignedRequest.right-alignRequest {
    text-align: right; 
    
  }
  .all{
    display:flex;
    justify-content: center;
  }

</style>