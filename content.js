//alert("Content js is working");
chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});

chrome.extension.onMessage.addListener(
  function(request, sender, response) {
    console.log(JSON.stringify(request))
      if( request.action === 'GetMap' ) {
        var info = {
          status:'success'
        }
        response(info)
      }
  }
);
