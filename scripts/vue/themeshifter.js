Vue.component('theme-dropdown',{
    template: `<div class="form-group">
    <label for="themeDropdown">Fonts</label>
    <select class="form-control" id="themeDropdown" @change="updateTheme()" v-model="themeProperties">
      <option v-for="option in options" v-bind:value="option.properties" v-bind:style="{fontFamily:option.value}">{{option.name}}</option>
    </select>
  </div>`,
    data: function() {
        return {
            selected: null,
            themeProperties:null,
            options: [{
                    "name": "Sopra",
                    "properties": {
                        "monthTextColor": "#000000",
                        "fontFamily": "MySopraFontRegular",
                        "level0Color": "#E45E2A",
                        "level1Color": "#01738B",
                        "monthArc": "#D0122D",
                        "activityTextColor": "#000000"
                    }
                },
                {
                    "name": "Material Purple",
                    "properties": {
                        "monthTextColor": "#000000",
                        "fontFamily": "\"Roboto\", Myriad, \"Roboto\", sans-serif",
                        "level0Color": "#6200EE",
                        "level1Color": "#3700B3",
                        "monthArc": "#03DAC5",
                        "activityTextColor": "#FFFFFF"
                    }
                }

            ]
        }
    },
    methods: {
        onOk() {
            console.log('ok')
        },
        onCancel() {
            console.log('cancel')
        },
        updateTheme(value) {
            for(let p in this.themeProperties){
                this.$emit('updatestyle',{property:'--' + p,value:this.themeProperties[p]});
                //document.documentElement.style.setProperty(, this.themeProperties[p]);
            }
        }
    }
});
    