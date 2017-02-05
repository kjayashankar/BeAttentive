document.addEventListener('DOMContentLoaded',function(){
  document.getElementById("on-click").addEventListener("click",handler);
  document.getElementById("reset").addEventListener("click",reset);
});

function reset() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.runtime.sendMessage(
      {
        action: 'DelMap'
      },
    setValues);
  });
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
  i = 0;
  var labels = [];
  var data = [];
  alert(JSON.stringify(info))
  for(var obj in info){
    labels.push(info[obj].name)
    data.push(info[obj].count)
    //document.getElementById("tick"+ ++i).innerHTML = info[obj].name +" : " +info[obj].count
  }
  if(info.length > 0) {
    var ctx = document.getElementById("chartContainer").getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Traffic',
          data: data
        }]
      }
    });
  }

}
