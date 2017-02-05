function getURL(badurl){
  // strip protocol
  badurl = stripDomain(badurl);
  // get array of split(".")
  return badurl;
}

function stripDomain(badurl){
  if (badurl.indexOf("://") == -1)
    return badurl
  badurl = badurl.substring(badurl.indexOf("://")+3)
  badurl = badurl.substring(0,badurl.indexOf("/"))
  badurl = badurl.split(".")
  console.log('badurl is '+JSON.stringify(badurl))
  if(badurl.length >= 2){
    if(badurl.length === 2){
      return badurl[0]
    }
    return badurl[1]
  }
}
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

    if (changeInfo.status != 'complete')
        return;
     else {
          /*chrome.storage.local.get(null, function(results){
            console.log("all the host urls "+ JSON.stringify(results))
          })*/
          console.log('Inside executeScript '+JSON.stringify(tab.url))
          var host = getURL(tab.url)
          if(host != undefined) {
            var hits = 0;
            chrome.storage.local.get(host, function (result) {
              console.log(host,result[host]);
              var value = result[host];
              if(value >= 1){
                hits = value
              }
              else{
                hits = 0
              }
              //alert(host+ " ++ "+hits)
              updateStorage(host,hits+1);
              //console.log('myKey', obj);
            });
        }
      }
});
chrome.runtime.onMessage.addListener(function (msg, sender) {
  // First, validate the message's structure
  if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
    // Enable the page-action for the requesting tab
    chrome.pageAction.show(sender.tab.id);
  }
});


chrome.browserAction.onClicked.addListener(function (tab){
  console.log('inside the browser action clicked '+tab.url)
})

function updateStorage(host,value){
  chrome.storage.local.set({[host]:value});
}
