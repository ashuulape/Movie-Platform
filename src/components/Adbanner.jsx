import { useEffect, useRef } from "react";

function Adbanner() {
  const adRef = useRef(null);

  useEffect(() => {
    const container = adRef.current;
    if (!container) return;

    // 1. config script
    const config = document.createElement("script");
    config.innerHTML = `
      atOptions = {
        'key' : '37f06d3d456df63ab75baf8f8ff1af17',
        'format' : 'iframe',
        'height' : 300,
        'width' : 160,
        'params' : {}
      };
    `;

    // 2. loader script
    const adScript = document.createElement("script");
    adScript.src =
      "https://www.highrevenueformat.com/37f06d3d456df63ab75baf8f8ff1af17/invoke.js";
    adScript.async = true;

    container.appendChild(config);
    container.appendChild(adScript);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return <div ref={adRef} style={{ width: 160, height: 300 }} />;
}

export default Adbanner;
