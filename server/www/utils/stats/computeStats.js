function computeStats(data) {
    let stats = {
        min:0,
        max:0,
        sum:0,
        mean:0,
        med:0,
        stdev:0,
    };

    let values = data[1];
    //Find min/max indexes from timestampWindow
    let minIdx = 0, maxIdx = data[1].length;
    if(timestampWindow.min !=0 && timestampWindow.max != 0)
    {
        minIdx = findClosestLowerByIdx(data[0], timestampWindow.min) + 1;
        maxIdx = findClosestLowerByIdx(data[0], timestampWindow.max);
        if(maxIdx<=minIdx || maxIdx>=data[0].length) return stats;
        values = data[1].slice(minIdx, maxIdx);
    }
    if(values.length==0) return stats;
    // Sort
    let arr = sortAndClean(values);

    if(arr.length==0) return stats;
    // Min, Max
    stats.min = getMinOnArray(arr,0,arr.length-1, true);
    stats.max = getMaxOnArray(arr,0,arr.length-1, true);
    // Sum, Mean
    stats.sum = getArraySum(arr, 0, arr.length-1);
    
    stats.mean = getArrayMean(arr, stats.sum);
    // Stdev
    stats.stdev = getArrayStdevSum(arr, stats.mean);
    // Median (only one that requires the costly sort)
    stats.med = getMedOnSortedArray(arr);

    return stats;
}


// this function is called when our mouse leave the chart 
function resetDisplayedVarValues(){
    //for each telem, set latest value
    let telemList = Object.keys(app.telemetries);
    for(let telemName of telemList) {
        let telem = app.telemetries[telemName];
        if(telem.xy) continue;
        let idx = telem.data[0].length-1;
        if(0 <= idx && idx < telem.data[0].length) {
            telem.value = telem.data[1][idx];
        }
    }
}

function sortAndClean(array)
{
    let res = array.slice().sort(function(a, b){return a - b;});

    for(let i=0;i<res.length;i++) {
        if(!isFinite(res[i]) || isNaN(res[i])) {
            res.splice(i,1);
            i--;
        }
    }

    return res;
}

function getMinOnArray(array, startIdx, endIdx, isSorted=false)
{
    if (array.length == 0)
        return undefined;

    if (isSorted)
        return array[startIdx];
    else
    {
        let currMin = array[startIdx];
        for (let i = startIdx; i<=endIdx; i++)
        {
            if (array[i] < currMin) currMin = array[i];
        }
        return currMin;
    }
}

function getMaxOnArray(array, startIdx, endIdx, isSorted=false)
{
    if (array.length == 0)
        return undefined;

    if (isSorted)
        return array[endIdx];
    else
    {
        let currMax = array[startIdx];
        for (let i = startIdx; i<=endIdx; i++)
        {
            if (array[i] > currMax) currMax = array[i];
        }
        return currMax;
    }
}

function getArraySum(array, startIdx, endIdx)
{
    if (array.length == 0)
        return undefined;

    let res = 0;

    for(let i=startIdx;i<=endIdx;i++)
        res += array[i];

    return res;
}

function getArrayMean(array, sum=undefined)
{
    if (array.length == 0)
        return undefined;

    sum = sum == undefined?getArraySum(array):sum;

    return sum/array.length;
}

function getArrayStdevSum(array, mean=undefined)
{
    if (array.length == 0)
        return undefined;
    mean = (mean == undefined)?getArrayMean(array):mean;

    let stdevSum=0;
    for(let i=0;i<array.length;i++)
        stdevSum += (array[i] - mean) * (array[i] - mean);
    

    return Math.sqrt(stdevSum/array.length);
}

function getMedOnSortedArray(array)
{
    let midSize = array.length / 2;
	return midSize % 1 ? array[midSize - 0.5] : (array[midSize - 1] + array[midSize]) / 2;
}