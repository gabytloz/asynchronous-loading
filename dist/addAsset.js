// COPY THE FOLLOWING IN YOUR MAIN JS FILE TO USE addAsset

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

    if( tag === null){
      tag = (document.getElementsByTagName('style')[0]) ? (document.getElementsByTagName('style')[0]) : null;
    }

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