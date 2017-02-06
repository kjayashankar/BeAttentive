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
  //console.log('badurl is '+JSON.stringify(badurl))
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
          //console.log('Inside executeScript '+JSON.stringify(tab.url))
          var host = getURL(tab.url)
          if(host != undefined) {
            var hits = 0;
            chrome.storage.local.get(host, function (result) {
              //console.log(host,result[host]);
              var value = result[host];
              if(value >= 1){
                hits = value
              }
              else{
                hits = 0
              }
              //alert(host+ " ++ "+hits)
              updateStorage(host,hits+1);
            });
        }
      }
});
chrome.runtime.onMessage.addListener(function (msg, sender,sendResponse) {
  //console.log('in background '+JSON.stringify(msg))
  if( msg.action === 'GetMap' ) {

    var info = {
      status:'success'
    }
    chrome.storage.local.get(null, function (result){
      var sortedMap = sort(result)
      var output = prepareOutput(sortedMap,result)
      //console.log('background sorted map '+JSON.stringify(sortedMap))
      sendResponse(output)
    })
    return true;
  }
  if( msg.action === 'DelMap' ) {
    chrome.storage.local.clear()
    window.close();
    sendResponse({"a":1})
  }
  return true
});
function prepareOutput(sortedMap, result){
  var i = 0;
  var output = [];
  var max = sortedMap.length
  if(sortedMap.length > 6){
    max = 6
  }
  while(i < max){
    var unit = {
      name : sortedMap[i],
      count : result[sortedMap[i]]
    }
    output.push(unit)
    i++
  }
  return output
}

function sort(obj){
  var keys = []
  for( var key in obj){
    keys.push(key)
  }
  return keys.sort(function(a,b){
    return obj[b]-obj[a]
  })
}


function updateStorage(host,value){
  chrome.storage.local.get("datejay",function(result){
    if(result["datejay"] === undefined) {
      var dt = new Date();
      var utcDate = dt.toLocaleDateString();
      chrome.storage.local.set({['datejay']:utcDate});
    }
  })
  chrome.storage.local.set({[host]:value});
}
