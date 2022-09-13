var BuilderInstance = null;

class WidgetBuilder{
    constructor(){
        if (BuilderInstance != null)
            throw new Error("WidgetBuilder is of type Singleton, use getInstance() to instanciate it");
    }


    static getInstance()
    {
        if (BuilderInstance === null)
            BuilderInstance = new WidgetBuilder();

        return BuilderInstance;
    }

    static buildChartWidget(telemetryName, isTimeBased, prepend=false)
    {
        let chart = new ChartWidget(!isTimeBased);
        let serie = new DataSerie(telemetryName);
        serie.addSource(telemetryName);
        chart.addSerie(serie);

        if(prepend)
            widgets.unshift(chart);
        else 
            widgets.push(chart);
    }

}

//TODO MAKE UML FOR THAT + Make it better ( see design pattern + make it for layout)


