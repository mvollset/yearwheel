Vue.component('activity-editor', {
    components: {
                vuejsDatepicker
            },
    model:{
      prop:'picked',
      event:'change'
    },
    props: ['activity'],
    template: `<form>
               <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Name</label>
                                                <input type="text" name="name" v-model="activity.name" class="form-control" placeholder="name" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Level</label>
                                                <level-editor v-bind:level="activity.level" v-on:change="function(val){activity.level=parseInt(val);}">
                                                </level-editor>
                                            </div>
                                        </div>
                </div>
                <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label>Fra</label>
                                                <vuejs-datepicker v-model="activity.startDate" input-class="form-control"></vuejs-datepicker>
                                            
                                                <label>Til</label>
                                                <vuejs-datepicker v-model="activity.endDate" input-class="form-control"></vuejs-datepicker>
                                            </div>
                                        </div>
                                    
                                    </div>
                 </form>`                   ,
    /*data:function(){
        return {
            picked:activity.level,
            name:activity.name,
            startDate:activity.startDate,
            endDate:activity.endDate
        }
    },
    computed: {
        intLevel: function () {
            return parseInt(this.picked);
        }
    }*/
});