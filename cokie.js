  	/* Cookies consent banner */
      function getCookie(c_name)
      {
          var i,x,y,ARRcookies=document.cookie.split(";");
          for (i=0;i<ARRcookies.length;i++)
          {
              x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
              y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
              x=x.replace(/^\s+|\s+$/g,"");
              if (x==c_name)
              {
                  return unescape(y);
              }
          }
      }
  
      function setCookie( c_name, value, exdays ) {
          var exdate = new Date();
          exdate.setDate(exdate.getDate() + exdays);
          var c_value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
          document.cookie = c_name + "=" + c_value + ";Domain=.ecfr.eu;Path=/";
      }
  
      function cookiesAccepted(value) {
          if ( value ) {
              setCookie('ecfr_cookies_accepted', value, 10000);
          }
          $('.cookie-banner').hide();
      }
  
      function eraseCookie(c_name) {
          document.cookie = c_name + '=; Expires=Thu, 01 Jan 1970 00:00:00 GMT;Domain=.ecfr.eu;Path=/';
      }
  
      function isCookiesEnabled() {
          var r = false;
          setCookie("ecfr_test", "Hello", 1);
          if (getCookie("ecfr_test") != null) {
              r = true;
              eraseCookie("ecfr_test");
          }
          return r;
      }
  
    document.addEventListener("DOMContentLoaded", function(event) {
          if ( getCookie('ecfr_cookies_accepted') != 'yes' && getCookie('ecfr_cookies_accepted') != 'no' && isCookiesEnabled() ) {
            document.getElementById('cookie-banner').style.display = 'block';
          }
          document.getElementById('accept_cookie').addEventListener('click', function(){
            cookiesAccepted('yes');
            console.log("Consent given");
          } );
          document.getElementById('decline_cookie').addEventListener('click', function(){
            cookiesAccepted('no');
            console.log("Consent declined");
          } );
      });