class SingleValueWidget extends DataWidget{
    constructor(widgetMode) {
        super();
        this.type = "singleValue";
        this.options = {
            title: "",
            width: undefined,
            height: undefined,
            scales: { x: {  time: true }, y:{} },
            focus: { alpha: 1.0, },
            cursor: {
                lock: false,
                focus: { prox: 16, },
                sync: {  key: window.cursorSync.key,  setSeries: true }
            },
            legend: { show: false }
        }
        this.value = undefined;// type : Number, the value of the widget ( so the average, the max or the min ... according to widgetMode )
        this.widgetMode = widgetMode;// type : String, what our widget value is going to be ( either "average", "max", "min" or "last")

        this.forceUpdate = true;

        updateWidgetSize_(this);
    }

    setSerie(serie)
    {
        if (this.series.length != 0)
            throw new Error("SingleValueWidget should contain only one serie");
        this.series.push(serie);
    }

    destroy(){
        if (this.series.length == 1)
            this.series[0].destroy();
    }

    update(){

        this.series[0].update();


        
        if(app.isViewPaused) return;

        let serieValues = serie.data[1];
        this.value = serieValues[serieValues.length -1];

        
    }   
}