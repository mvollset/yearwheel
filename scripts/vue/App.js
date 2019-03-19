 new Vue({
            el: '#app',
            components: {
                vuejsDatepicker
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
                        let item = dataItems[i];
                        let res = {
                            name: item.name,
                            level: item.level
                        }
                        if (item.startDate) {
                            res.startDateID = moment(item.startDate).dayOfYear() - 1;
                        }
                        if (item.level!==undefined) {
                            res.endDateID = moment(item.endDate).dayOfYear() - 1;
                            activityData.push(res);
                        }
                        else {
                            eventData.push(res);
                        }

                    }
                    renderData(activityData, eventData);
                }
            }
        });
