// Show the banner
function showBanner() {
    const banner = document.getElementById('welcome-banner');
    const closeButton = document.querySelector('.close-button');
  
    banner.style.display = 'block';
  
    closeButton.onclick = function () {
      banner.style.display = 'none';
      setVisitedCookie();
    };
  
    window.onclick = function (event) {
      if (event.target === banner) {
        banner.style.display = 'none';
        setVisitedCookie();
      }
    };
  }
  
  function setVisitedCookie() {
    document.cookie = "visited=true; max-age=" + 30*24*60*60 + "; path=/";
  }
  
  window.onload = function () {
    if (document.cookie.indexOf('visited=true') === -1) {
      showBanner();
    }
  };
  