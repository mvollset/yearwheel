Vue.component('font-shifter',{
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
        updateValue() {
            this.$emit('updatestyle',{property:'--fontFamily',value:this.selected});
            //document.documentElement.style.setProperty('--fontFamily', this.selected);
        }
    }
})

    