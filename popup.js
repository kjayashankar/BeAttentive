document.addEventListener('DOMContentLoaded',function(){
  document.getElementById("on-click").addEventListener("click",handler);
  document.getElementById("reset").addEventListener("click",resetHandler);
});

window.addEventListener ("load", handler, false);

function resetHandler(){
  reset();
  //reset();
}
function reset() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.runtime.sendMessage(
      {
        action: 'DelMap'
      },
    delValues);
  });

}

function delValues(){
  window.close();
}

function handler() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.runtime.sendMessage(
      {
        action: 'GetMap'
      },
    setValues);
  });
}

function setValues(info){
  document.getElementById("on-click").style.display = "none";
  document.getElementById("reset").style.display = "block";
  i = 0;
  var bgOriginalColors = ['rgba(7, 0, 128, 0.9)',
                          'rgba(33, 17, 103, 0.8)',
                          'rgba(51, 31, 79, 0.8)',
                          'rgba(63, 77, 111, 0.6)',
                          'rgba(107, 97, 140, 0.5)'];
  var borderOriginalColors = ['rgba(7, 0, 128, 1)',
                          'rgba(33, 17, 103, 1)',
                          'rgba(51, 31, 79, 1)',
                          'rgba(63, 77, 111, 1)',
                          'rgba(107, 97, 140, 1)'];
  var labels = [];
  var data = [];
  var bgColors = [];
  var borderColors = [];
  var date;
  console.log(JSON.stringify(info))
  for(var obj in info){
    if(info[obj].name === 'datejay'){
      date = info[obj].count
      var label = 'Top 5 site visits from '+date
      document.getElementById("label").innerHTML = label
    }
    else{
      bgColors.push(bgOriginalColors[obj])
      borderColors.push(borderOriginalColors[obj])
      labels.push(info[obj].name)
      data.push(info[obj].count)
    }
  }


  if(info != undefined && info.length > 0) {
    var ctx = document.getElementById("chartContainer").getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: 2,
          data: data
        }]
      },
      options:{
        legend:{
            display: false
        },
        scales: {
        yAxes: [{
            display: true,
            ticks: {
                suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                // OR //
                beginAtZero: true   // minimum value will be 0.
            }
        }]
      }
      }
    });
  }
  else{
    document.getElementById("reset").style.display = "none";
    document.getElementById("message").innerHTML = "Start by browsing!"
  }
}

var randomColorGenerator = function () {
    return '#' + (Math.random().toString(16) + '0000000').slice(2, 8);
};
