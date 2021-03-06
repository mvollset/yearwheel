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
                .get('/wheels/5cc7f9f7a10433022b58beb9')
                .then((response) => {
                    this.name=response.data.wheel.name;
                    this.year=response.data.wheel.year;
                    this._id=response.data.wheel._id;
                    this.items=parseData(response.data.wheel.activities);
                    this.updateWheel();
                });
              },
            methods: {
                getWheelById(id){
                    apiConnection
                    .get(`/wheels/${id}`)
                    .then((response) => {
                        this.name=response.data.wheel.name;
                        this.year=response.data.wheel.year;
                        this._id=response.data.wheel._id;
                        this.items=parseData(response.data.wheel.activities);
                        this.updateWheel();
                    });
                },
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
                         //We must also add the activity to the current wheel
                         activity.wheelid=this._id;
                        apiConnection.post(`/activities`,activity).then(result => {
                           
                            activity._id=result.data.activity._id;
                            
                        })
                        

                    }

                },
                updateWheel() {
                    if(!this._id){
                        //Create a new wheel
                        apiConnection.post(`/wheels`,{
                            name:this.name,
                            year:this.year
                        }).then(result => {
                            //We must also add the activity to the current wheel
                            //activity._id=result.data.activity._id;
                            this._id=result.data.wheel._id;
                            this.items=[];
                        })
                    }
                    else{
                        //Create a new wheel
                        apiConnection.put(`/wheels/${this._id}`,{
                            name:this.name,
                            year:this.year
                        }).then(result => {
                            
                        })
                    }
                    const activityData = [];
                    const eventData = [];
                    for (let i = 0; this.items && i < this.items.length; i++) {
                        let item = this.getItem(this.items[i]);
                        this.saveActivity(item);
                        if (item.level!==undefined) {
                            activityData.push(item);
                        }
                        else {
                            item.level=-1;
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
                        level:0,
                        wheelid:this._id
                    });
                },
                getItem(item){
                    let res = {
                        _id:item._id,
                        name: item.name,
                        level: item.level>-1?item.level:undefined,
                        startDateID:item.startDate?moment(item.startDate).dayOfYear() - 1:null
                    }
                    if (item.level>-1) {
                        res.endDateID = moment(item.endDate).dayOfYear() - 1;
                       
                    }
                    return res;
                }
            }
        });
