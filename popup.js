document.addEventListener('DOMContentLoaded',function(){
  document.getElementById("on-click").addEventListener("click",handler);
});

function handler() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
  alert('clicked on popup '+tabs[0].id)
    chrome.runtime.sendMessage(
      {
        action: 'GetMap'
      },
    setValues);
  });
}

function setValues(info){
  alert(JSON.stringify(info));
  document.getElementById("tick").innerHTML = info.status
}
