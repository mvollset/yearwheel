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
                    name: 'dfgdfg',
                    items: dataItems

                };

            },
            methods: {
                onOk() {
                    console.log('ok')
                },
                onCancel() {
                    console.log('cancel')
                },
                updateWheel() {
                    const activityData = [];
                    const eventData = [];
                    for (let i = 0; i < dataItems.length; i++) {
                        let item = this.getItem(dataItems[i]);
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
