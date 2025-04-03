import { useEffect } from "react";

export default function useFacebook() {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.src =
      "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0";
    script.onload = () => {
      if (window.FB) {
        window.FB.XFBML.parse();
      }
    };

    document.body.appendChild(script);
  }, []);
}
