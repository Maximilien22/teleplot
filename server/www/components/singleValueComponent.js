Vue.component('single_value_component',{

    props: {
        options: {type : Object, required : true},
        widget: {type: Object, required : true}
    },

    template : '<div><span class="single-value-mode">{{options.widgetMode}}</span><span @click="widget.toogleValuePrecision()" class="single-value">{{options.singlevalue.toPrecision(options.number_precision)}}</span><span class="single-value-serie-name">{{options.serie_name}}</span></div>',
 });
