Vue.component('single_value_component',{

    props: {
        options: {type : Object, required : true}
    },

    template : '<div><p class="single-value-title">{{options.widgetMode}} of {{options.serie_name}}</p><p class="single-value">{{options.singlevalue.toFixed(options.decimals_count)}}</p></div>',
   

 });