import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

import {
  hapticFeedback,
  init,
  initData,
  invoice,
  mainButton,
  themeParams,
  viewport,
} from "@telegram-apps/sdk";
import request from "../api/requests";

init();

viewport.mount();
themeParams.mount();
mainButton.mount();

initData.restore();
viewport.expand();
themeParams.bindCssVars();

mainButton.setParams({
  hasShineEffect: true,
  isEnabled: true,
  isVisible: false,
  isLoaderVisible: false,
  text: "Schedy",
  textColor: "#ffffff",
});

function App() {
  const [stars, setStars] = useState<number>(0);

  useEffect(() => {
    const handleClick = async () => {
      if (hapticFeedback.isSupported()) {
        hapticFeedback.impactOccurred("soft");
      }

      const response = await request("donate", "post", { amount: stars });
      invoice.open(response.invoice_link.replace("https://t.me/$", ""));
    };

    mainButton.onClick(handleClick);
    return () => {
      mainButton.offClick(handleClick);
    };
  }, [stars]);

  function calcStars(e: any) {
    const userValue = e.target.value.trim();
    const starCost = userValue / (0.625 / 50);
    const prevParams = mainButton.state();

    if (userValue && !isNaN(userValue) && userValue > 0) {
      mainButton.setParams({ ...prevParams, isVisible: true });
      setStars(starCost);
    } else {
      mainButton.setParams({ ...prevParams, isVisible: false });
      setStars(0);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="text-4xl mb-5 text-white font-semibold">
        <CountUp end={stars} />{" "}
        <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
      </h1>

      <input
        type="number"
        className="giest-mono p-3 text-2xl text-center w-[90%]"
        placeholder="$$$"
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={calcStars}
        style={{
          background: "none",
          border: "2px solid var(--tg-theme-accent-text-color)",
          borderRadius: "10px",
          color: "white",
          outline: "none",
        }}
      />

      <p className="text-center text-gray-600 mt-2 w-[90%]">
      </p>
    </div>
  );
}

export default App;
