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

  return (
    <div
      ref={adRef}
      style={{ margin: "10px", width: "100%", height: "fit-content" }}
    />
  );
}

export default Adbanner;

export const HoriAd = () => {
  const ismobile = window.innerWidth < 768;
  const adRef = useRef(null);

  useEffect(() => {
    const container = adRef.current;
    if (!container) return;

    // 1. config script
    const config = document.createElement("script");
    config.innerHTML = ismobile
      ? `
  atOptions = {
    'key' : 'a9544c30b76ddf7144c9a35350b655ec',
    'format' : 'iframe',
    'height' : 50,
    'width' : 320,
    'params' : {}
  };`
      : `
      atOptions = {
    'key' : '634106fe8b195074a8fdd4465fee4aeb',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728 ,
    'params' : {}
      };
    `;

    // 2. loader script
    const adScript = document.createElement("script");
    adScript.src = ismobile
      ? "https://www.highrevenueformat.com/a9544c30b76ddf7144c9a35350b655ec/invoke.js"
      : "https://www.highrevenueformat.com/634106fe8b195074a8fdd4465fee4aeb/invoke.js";
    adScript.async = true;

    container.appendChild(config);
    container.appendChild(adScript);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return <div ref={adRef} style={{ margin: "10px" }} />;
};

export const SocialAd = () => {
  const adRef = useRef(null);

  useEffect(() => {
    const container = adRef.current;
    if (!container) return;

    const adScript = document.createElement("script");
    adScript.async = true;
    adScript.src =
      "https://pl31584452.profitableratecpmnetwork.com/e1/85/cc/e185cccab8231d03573c76629f860fbb.js";

    container.appendChild(adScript);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return <div ref={adRef} style={{ margin: "10px" }} />;
};
