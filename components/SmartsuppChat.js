// components/SmartsuppChat.js
import { useEffect } from 'react';

export default function SmartsuppChat() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_SMARTSUPP_KEY;
    if (!key) return;
    if (window.smartsupp) return;

    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = key;

    (function (d) {
      let s, c;
      const o = (window.smartsupp = function () {
        o._.push(arguments);
      });
      o._ = [];
      s = d.getElementsByTagName('script')[0];
      c = d.createElement('script');
      c.type = 'text/javascript';
      c.charset = 'utf-8';
      c.async = true;
      c.src = 'https://www.smartsuppchat.com/loader.js?';
      s.parentNode.insertBefore(c, s);
    })(document);
  }, []);

  return null;
}
