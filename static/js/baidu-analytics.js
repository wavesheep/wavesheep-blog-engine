import BLOGCONFIG from '/blog.config.js'

if (BLOGCONFIG.analytics.google.enable) {
  var _hmt = _hmt || [];
  (function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?" + BLOGCONFIG.analytics.baidu.id;
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
}
