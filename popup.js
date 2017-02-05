document.addEventListener('DOMContentLoaded',function(){
  document.getElementById("on-click").addEventListener("click",handler);
});

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
  for(var obj in info){
    document.getElementById("tick"+ ++i).innerHTML = info[obj].name +" : " +info[obj].count
  }
}
