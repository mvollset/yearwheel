Vue.component('css-color-shifter',{
    components: {
        'colpicker': VueColor.Chrome

    },
    props: ['cssProperty', 'label'],
    template: `
    <div>
    <h6 class="sidebar-heading" v-on:click="setCSSValue()"><span >{{ label }}</span><a data-toggle="collapse" v-bind:href="'#' + elementId" role="button" aria-expanded="false" aria-controls="collapseExample">
    <i class="material-icons md-16" v-bind:style="'color: var(' + prop + ')'">edit</i></a>
    </h6>
    <div class="collapse" v-bind:id="elementId" >
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
            this.$emit('updatestyle',{property:this.cssProperty,value:value.hex})
            this.color = value;
        },
        setValue(value){
            this.color=value;
        },
        setCSSValue(){
            let prop = this.cssProperty;
        let m = document.getElementById('styleapp');
        let c = getComputedStyle(m).getPropertyValue(prop);
        this.color=c;
        }
    }
});