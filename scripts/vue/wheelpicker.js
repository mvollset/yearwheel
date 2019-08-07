Vue.component('wheel-picker',{
    template:`<div class="form-group">
    <label for="themeDropdown">Fonts</label>
    <select class="form-control" id="wheelDropdown" @change="getWheel" v-model="wheelid">
      <option v-for="wheel in wheels" v-bind:value="wheel._id" >{{wheel.name}} ({{wheel.year}})</option>
    </select>
  </div>`,
  data: function() {

    return {
        wheelid: null,
        wheels:[]

    };
},
mounted:function(){
    apiConnection
    .get('/wheels')
    .then((response) => {
       this.wheels = response.data.wheels
    });
  },
  methods:{
      getWheel:function(){
            this.$emit('wheelselected',this.wheelid);
  }
}
})