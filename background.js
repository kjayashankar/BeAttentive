
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
  badurl = badurl.split(".")
  if(badurl.length === 2)
    return badurl[0]
  return badurl[1]
}
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

    if (changeInfo.status != 'complete')
        return;
     else {

          console.log('Inside executeScript '+JSON.stringify(tab.url))
          var host = getURL(tab.url)
          alert(host)
        }
});
