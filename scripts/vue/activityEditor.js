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
                                                <div v-bind:class="validation()">
                                                  Looks good!
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label>Level</label>
                                                <level-editor v-bind:level="activity.level" v-on:change="function(val){activity.level=parseInt(val);}">
                                                </level-editor>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                          <div class="form-group">
                                                <label>Period</label>  
                                                <div class="datepicker-trigger">
                                                  <button v-bind:id="'datepicker-button-trigger-' + activity.name">
                                                    {{ formatDates(buttonDateOne, buttonDateTwo) || 'Select dates' }}
                                                  </button>

                                                  <airbnb-style-datepicker
                                                    :trigger-element-id="'datepicker-button-trigger-'+ activity.name"
                                                    :mode="'range'"
                                                    v-bind:date-one="activity.startDate"
                                                    v-bind:date-two="activity.endDate"
                                                    :min-date="'2019-01-01'"
                                                    :max-date="'2019-12-31'"
                                                    :fullscreen-mobile="true"
                                                    :months-to-show="2"
                                                    :offset-y="10"
                                                    :trigger="trigger"
                                                    v-on:date-one-selected="function(val){activity.startDate=val;buttonDateOne=val;}"
                                                    v-on:date-two-selected="function(val){activity.endDate=val;buttonDateTwo=val;}"
                                                    v-on:closed="onClosed"
                                                    v-on:previous-month="onMonthChange"
                                                    v-on:next-month="onMonthChange"
                                                  ></airbnb-style-datepicker>
                                                </div>
                                                <div>{{duration}} - {{hasRoomForText}}
                                                </div>
                                                </div>
                                            </div>
                              
                </div>
                                      
                                        
                                  
                 </form>`                   ,
                 data: function (){
                   return {
                        dateFormat: 'D MMM',
                        buttonDateOne: '',
                        buttonDateTwo: '',
                        inlineDateOne: '',
                        sundayDateOne: '',
                        sundayFirst: false,
                        alignRight: false,
                        trigger: false
                   }
                },
                computed:{
                  duration:function(){
                    return moment(this.activity.endDate).dayOfYear() - moment(this.activity.startDate).dayOfYear();
                  },
                  hasRoomForText:function(){
                    const o = this.activity.name.length;
                    return (this.duration>(o/2));
                  }
                },
                 methods:{
                    formatDates: function(dateOne, dateTwo) {
                        var formattedDates = ''
                        if (dateOne) {
                          formattedDates = dateFns.format(dateOne, this.dateFormat)
                        }
                        if (dateTwo) {
                          formattedDates += ' - ' + dateFns.format(dateTwo, this.dateFormat)
                        }
                        return formattedDates
                      },
                      validation:function(){
                          if(this.activity.endDateID>0)
                            return hasRoomForText(this.activity)?"valid-feedback":"invalid-feedback"
                          return "valid-feedback";  
                      },
                      onClosed: function() {
                        var datesStr = this.formatDates(this.inputDateOne, this.inputDateTwo)
                        console.log('Dates Selected: ' + datesStr)
                        this.trigger = false
                      },
                      toggleAlign: function() {
                        this.alignRight = !this.alignRight
                      },
                      onDateFromChange: function(val){
                         this.buttonDateOne=val;
                          console.log("one");
                      },
                      onDateToChange: function(val){
                        this.buttonDateTwo=val;
                        console.log("two");
                    },
                      triggerDatepicker: function() {
                        this.trigger = !this.trigger
                      },
                      onMonthChange: function(dates) {
                        console.log('months changed', dates)
                      }
                 }
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