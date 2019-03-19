let colorP = {
    components: {
        'colpicker': VueColor.Chrome

    },
    props: ['cssProperty', 'label'],
    template: `
    <div>
    <h6 class="sidebar-heading"><span>{{ label }}</span><a data-toggle="collapse" v-bind:href="'#' + elementId" role="button" aria-expanded="false" aria-controls="collapseExample">
    <i class="material-icons md-16" v-bind:style="'color: var(' + prop + ')'">edit</i></a>
    </h6>
    <div class="collapse" v-bind:id="elementId">
    <colpicker :value="color" @input="updateValue"></colpicker>
    </div>
    </div>
    `,
    data: function() {
        let prop = this.cssProperty;
        let m = document.getElementById('styleapp');
        let c = getComputedStyle(m).getPropertyValue(prop);
        return {
            color: c,
            elementId: "elem" + prop.substr(2),
            prop: prop
        }
    },
    methods: {
        onOk() {
            console.log('ok')
        },
        onCancel() {
            console.log('cancel')
        },
        updateValue(value) {
            document.documentElement.style.setProperty(this.cssProperty, value.hex);
            this.color = value
        }
    }
};
let themePicker = {
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
                document.documentElement.style.setProperty('--' + p, this.themeProperties[p]);
            }
        }
    }
}
let fontShifter = {
    template: `<div class="form-group">
    <label for="fontDropdown">Fonts</label>
    <select class="form-control" id="fontDropdown" @change="updateValue()" v-model="selected">
      <option v-for="option in options" v-bind:value="option.value" v-bind:style="{fontFamily:option.value}">{{option.label}}</option>
    </select>
  </div>`,
    data: function() {
        return {
            selected: null,
            options: [{
                    value: "'Arial', Myriad, 'Roboto', sans-serif",
                    label: "Arial",
                    style: "fontFamily:'Arial', Myriad, 'Roboto', sans-serif;"
                },
                {
                    value: "'Times', Myriad, 'Roboto', sans-serif",
                    label: "Times",
                    style: "fontFamily:'Arial', Myriad, 'Roboto', sans-serif;"
                },
                {
                    value: "'Roboto', Myriad, 'Roboto', sans-serif",
                    label: "Android",
                    style: "fontFamily:'Roboto', Myriad, 'Roboto', sans-serif;"
                },
                {
                    value: "MySopraFontRegular",
                    label: "Sopra Steria",
                    style: "fontFamily:MySopraFontRegular, Myriad, 'Roboto', sans-serif;"
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
        updateValue(value) {
            document.documentElement.style.setProperty('--fontFamily', this.selected);
        }
    }
}
new Vue({
    el: '#styleapp',
    components: {
        'css-color-shifter': colorP,
        'font-shifter': fontShifter,
        'theme-dropdown': themePicker
    },
    data() {

        return {
            color: "#194d33"
        };
    },
    methods: {
        onOk() {
            console.log('ok')
        },
        onCancel() {
            console.log('cancel')
        },
        updateValue(value) {

        },
        onShowStyles() {
            let editableProperties = ["--monthTextColor", "--fontFamily", "--level0Color", "--level1Color", "--monthArc", "--activityTextColor"]
            let cssProps = {};
            let m = document.getElementById('styleapp');
            for (let i = 0; i < editableProperties.length; i++) {
                const c = getComputedStyle(m).getPropertyValue(editableProperties[i]);
                cssProps[editableProperties[i].substr(2)] = c;
            }
            console.log(JSON.stringify(cssProps, 0, 4))
            window.alert(JSON.stringify(cssProps, 0, 4));

        }
    }

});
