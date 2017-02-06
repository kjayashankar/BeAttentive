document.addEventListener('DOMContentLoaded',function(){
  document.getElementById("on-click").addEventListener("click",handler);
  document.getElementById("reset").addEventListener("click",resetHandler);
});

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
  var labels = [];
  var data = [];
  var date;
  console.log(JSON.stringify(info))
  for(var obj in info){
    if(info[obj].name === 'datejay'){
      date = info[obj].count
    }
    else{
      labels.push(info[obj].name)
      data.push(info[obj].count)
    }
    //document.getElementById("tick"+ ++i).innerHTML = info[obj].name +" : " +info[obj].count
  }
  if(info != undefined && info.length > 0) {
    var ctx = document.getElementById("chartContainer").getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Top 5 site visits from '+date,
          data: data
        }]
      }
    });
  }
  else{
    document.getElementById("reset").style.display = "none";
    document.getElementById("message").innerHTML = "Start by browsing!"
  }
}
