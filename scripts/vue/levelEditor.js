Vue.component('level-editor', {
    model:{
      prop:'picked',
      event:'change'
    },
    props: ['level'],
    template2: `<div>
                    <div class="form-check form-check-inline">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio"  
                                v-model="picked" 
                                v-on:change="$emit('change', $event.target.value)"
                                value="-1"/>
                                <label class="form-check-label">Single day</label>
                            </div>
                     </div>       
    <div class="form-check form-check-inline csslevel0">
    <input class="form-check-input" type="radio"  
    v-model="picked" 
    v-on:change="$emit('change', $event.target.value)"
    value="0"><label class="form-check-label">1</label></div>
    <div class="form-check form-check-inline csslevel1">
    <input class="form-check-input" type="radio"  v-model="picked" 
    v-on:change="$emit('change', $event.target.value)"
    value="1" ><label class="form-check-label">2</label></div>
    <div class="btn-group mr-2" role="group" aria-label="First group">
    <button type="button" class="btn btn-secondary">Enkel dag</button>
    <button type="button" class="btn csslevel0">1</button>
    <button type="button" class="btn csslevel1">2</button>
  </div>
    </div>`,
    template: `<div>
    <select class="custom-select" v-model="picked"  v-on:change="$emit('change', $event.target.value)">
        <option value="-1">Enkelt dag</option>
        <option value="0" class="csslevel0">Nivå 1</option>
        <option value="1" class="csslevel1">Nivå 2</option>
    </select>
    </div>`,
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
});