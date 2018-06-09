/* **************************************************
  Working Example
************************************************** */
// Setups a script, waits for the script to load and then it inits the callback function
function testAddingAssets() {
  scriptSource = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
  stylesheetSource= "https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css";

  setTimeout(
    function(){
      addAsset(stylesheetSource, functionThatFiresWhenCSSIsLoaded);
    }, 3000);

  setTimeout(
    function(){
      addAsset(scriptSource, loadBootstrap);
    }, 8000);
}

function loadBootstrap(){
  scriptSource= "https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js";

  console.log("My JQuery is ready");

  addAsset(scriptSource, null, true);

  console.log("All my JS is ready!");
  document.querySelector('#jsTest').innerHTML = "<em>Bootstrap's JS loaded</em> Now you have a working carousel"

}

function functionThatFiresWhenCSSIsLoaded(){
  console.log("My CSS is ready!");
  document.querySelector('#cssTest').innerHTML = "<em>Bootstrap's CSS loaded</em> Now everything here is uppercase"
  document.querySelector('#jsTest').innerHTML = "<em>Bootstrap's JS hasn't loaded yet</em> It should look better but it doesn't work"
}

/* *** Add Asset ******************************** */
// Adds a script or CSS link tag to the DOM.
// In the case of scripts, it assumes there's at least one script tag (the one that launches this code)
// to use it as reference of where to inject it (inserts before script[0])
// Original script by: zzzzBov (https://stackoverflow.com/users/497418/zzzzbov)
// URL: https://stackoverflow.com/questions/7718935/load-scripts-asynchronously#answer-7719185

function addAsset( src, callback, addLast) {
  var asset,
      ready,
      tag,
      isStylesheet,
      addLast;

  ready = false;
  isStylesheet = (src.indexOf(".css") > -1) ? true : false;
  asset = (isStylesheet) ? document.createElement('link') : document.createElement('script');

  if(isStylesheet){
    asset = document.createElement('link');
    asset.type = 'text/css';
    asset.href = src;
    asset.rel = "stylesheet";
    asset.media = "screen,print";

    var head = document.head || document.getElementsByTagName('head')[0];
  }
  else{
    asset = document.createElement('script');
    asset.type = 'text/javascript';
    asset.src = src;

    var body = document.body || document.getElementsByTagName('body')[0];
  }

  asset.onload = asset.onreadystatechange = function() {
    if ( !ready && (!this.readyState || this.readyState == 'complete') )
    {
      ready = true;
      if(callback) callback();
    }
  };

  if(isStylesheet){
    tag = (document.getElementsByTagName('link')[0]) ? document.getElementsByTagName('link')[0] : null;
    tag = (tag === null && document.getElementsByTagName('style')[0]) ? (document.getElementsByTagName('style')[0]) : null;

    if(!addLast && tag){
      tag.parentNode.insertBefore(asset, tag);
    }
    else{
      head.appendChild(asset);
    }
  }
  else{
    if (addLast){
      body.appendChild(asset);
    }
    else{
      tag = document.getElementsByTagName('script')[0];
      tag.parentNode.insertBefore(asset, tag);
    }
  }
}


/* **************************************************
  Launch script if class exists
************************************************** */
// Load the scripts/styles only if you need them
document.addEventListener("DOMContentLoaded",
  function() {
    if(document.querySelector('.carousel')) testAddingAssets();
  }
);