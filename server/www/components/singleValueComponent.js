Vue.component('single_value_component',{

    props: {
        options: {type : Object, required : true},
        widget: {type: Object, required : true}
    },
    template:'<div class="container-div-single-value"><svg width = "100%" height = "100%" viewBox="0 0 260 200"> <foreignObject width="100%" height="100%" ><div class="div-infos-single-value"><span class="single-value-mode">{{options.widgetMode}}</span><br><span @click="widget.toogleValuePrecision()" class="single-value-value">{{options.singlevalue.toPrecision(options.number_precision)}}</span><span class="single-value-telem">{{options.serie_name}}</span></div></foreignObject></svg></div>',
    //template : '<div><span class="single-value-mode">{{options.widgetMode}}</span><span @click="widget.toogleValuePrecision()" class="single-value">{{options.singlevalue.toPrecision(options.number_precision)}}</span><span class="single-value-serie-name">{{options.serie_name}}</span></div>',
 });
