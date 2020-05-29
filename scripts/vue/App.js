var datepickerOptions = {
    sundayFirst: true
}
// install plugin
Vue.use(window.AirbnbStyleDatepicker, datepickerOptions)
var app = new Vue({
    el: '#app',
    components: {
        AirbnbStyleDatepicker
    },
    data: function () {

        return {
            name: null,
            items: null,
            year: 0,
            _id: null

        };

    },
    created: function () {

    },
    mounted: function () {

    },
    methods: {
        getWheel(wheel) {
            this.getWheelById(wheel._id);
        },
        getWheelById(id) {
            apiConnection
                .get(`/wheels/${id}`)
                .then((response) => {
                    this.name = response.data.wheel.name;
                    this.year = response.data.wheel.year;
                    this._id = response.data.wheel._id;
                    this.items = parseData(response.data.wheel.activities);
                    this.drawWheel();
                });
        },
        onOk() {
            console.log('ok')
        },
        onCancel() {
            console.log('cancel')
        },
        saveActivity: async function (activity) {
            if (activity._id) {
                await apiConnection.put(`/activities/${activity._id}`, activity);
                return;
            }
            else {
                //We must also add the activity to the current wheel
                activity.wheelid = this._id;
                let result = await apiConnection.post(`/activities`, activity)
                activity._id = result.data.activity._id;
                return;
            }

        },
        updateWheel: async function () {
            if (!this._id) {
                //Create a new wheel
                let newWheel = await apiConnection.post(`/wheels`, {
                    name: this.name,
                    year: this.year
                });
                this._id = newWheel.data.wheel._id;
                this.items = [];

            }
            else {
                
                await apiConnection.put(`/wheels/${this._id}`, {
                    name: this.name,
                    year: this.year
                });
                for (let i = 0; this.items && i < this.items.length; i++) {
                        let item = this.getItem(this.items[i]);
                        await this.saveActivity(item);
                }
                this.drawWheel();       
            }
            

        },
        deleteActivity: async function (activity){
            try{
                let res = await apiConnection.delete(`/activities/${activity._id}`);
                let p = this.items.findIndex((p)=>p._id==activity._id);
                this.items.splice(p,1);
                this.drawWheel();
            }
            catch (err){
                alert(err);
            }
        },
        drawWheel() {
            const activityData2 = [];
            const eventData2 = [];
            for (let i = 0; this.items && i < this.items.length; i++) {
                let item = this.getItem(this.items[i]);
                if (item.level !== undefined) {
                    activityData2.push(item);
                }
                else {
                    item.level = -1;
                    eventData2.push(item);
                }

            }
            activityData=activityData2;
            eventData=eventData2;
            renderData(activityData2, eventData2);
        },
        addItem() {
            this.items.push({
                startDateID: 1,
                endDateID: 32,
                name: "New event",
                level: 0,
                wheelid: this._id
            });
        },
        getItem(item) {
            let res = {
                _id: item._id,
                name: item.name,
                level: item.level > -1 ? item.level : undefined,
                startDateID: item.startDate ? moment(item.startDate).dayOfYear() - 1 : null
            }
            if (item.level > -1) {
                res.endDateID = moment(item.endDate).dayOfYear() - 1;

            }
            return res;
        },
        setCSSProperty(property, value) {
            document.documentElement.style.setProperty(property, value);
        },
        updateStyle(event) {
            this.setCSSProperty(event.property, event.value);
        },
        onShowStyles() {
            let editableProperties = ["--monthTextColor", "--fontFamily", "--level0Color", "--level1Color", "--monthArc", "--activityTextColor"]
            let cssProps = {};
            let m = document.getElementById('styleapp');
            for (let i = 0; i < editableProperties.length; i++) {
                const c = getComputedStyle(m).getPropertyValue(editableProperties[i]);
                cssProps[editableProperties[i].substr(2)] = c;
            }
            console.log(JSON.stringify(cssProps, 0, 4));
        }
    }
});
