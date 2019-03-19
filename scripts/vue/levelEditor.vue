<template>
    <div><div class="form-check form-check-inline csslevel0"><input class="form-check-input" type="radio"  
    v-model="picked" 
    v-on:change="$emit('change', $event.target.intLevel)"
    value="0"><label class="form-check-label">Level 1</label></div>
    <div class="form-check form-check-inline csslevel1">
    <input class="form-check-input" type="radio"  v-model="picked" 
    v-on:change="$emit('change', $event.target.intLevel)"
    value="1" ><label class="form-check-label">Level 2</label></div></div>
</template>
<script>
export default {
  model:{
      prop:'picked',
      event:'change'
    },
    props: ['level'],
    data:function(){
        return {
            picked:this.level
        }
    },
    computed: {
        intLevel: function () {
            return parseInt(this.picked);
        }
    }    
}
