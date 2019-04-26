var datepickerOptions = {
    sundayFirst: true
  }
  // install plugin
  Vue.use(window.AirbnbStyleDatepicker, datepickerOptions)
 var app=new Vue({
            el: '#app',
            components: {
                vuejsDatepicker,
                AirbnbStyleDatepicker
            },
            data: function() {

                return {
                    name: null,
                    items: null,
                    year:0,
                    _id:null

                };

            },
            created: function () {
                
              },
              mounted:function(){
                apiConnection
                .get('/wheels/5cc2c4f4bbc1bf000491d72c')
                .then((response) => {
                    this.name=response.data.wheel.name;
                    this.year=response.data.wheel.year;
                    this._id=response.data.wheel._id;
                    this.items=parseData(response.data.wheel.activities);
                    this.updateWheel();
                });
              },
            methods: {
                onOk() {
                    console.log('ok')
                },
                onCancel() {
                    console.log('cancel')
                },
                saveActivity(activity){
                    if(activity._id){
                        
                        apiConnection.put(`/activities/${activity._id}`,activity);
                    }
                    else{
                        apiConnection.post(`/activities`,activity).then(result => {
                            //We must also add the activity to the current wheel
                            activity._id=result.data.activity._id;
                             apiConnection.put(`wheels/5cc2c4f4bbc1bf000491d72c`,{activities:[result.data.activity._id]});
                        })
                        

                    }

                },
                updateWheel() {
                    const activityData = [];
                    const eventData = [];
                    for (let i = 0; i < this.items.length; i++) {
                        let item = this.getItem(this.items[i]);
                        this.saveActivity(item);
                        if (item.level!==undefined) {
                            activityData.push(item);
                        }
                        else {
                            eventData.push(item);
                        }

                    }
                    renderData(activityData, eventData);
                },
                addItem(){
                    this.items.push({
                        startDateID:1,
                        endDateID:32,
                        name:"New event",
                        level:0
                    });
                },
                getItem(item){
                    let res = {
                        _id:item._id,
                        name: item.name,
                        level: item.level,
                        startDateID:item.startDate?moment(item.startDate).dayOfYear() - 1:null
                    }
                    if (item.level!==undefined) {
                        res.endDateID = moment(item.endDate).dayOfYear() - 1;
                       
                    }
                    return res;
                }
            }
        });
