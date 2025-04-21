import React, { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/components/firebase/config";

const GetBrowserInfo = () => {
  const [browserData, setBrowserData] = useState<any>(null);

  useEffect(() => {
    const getBrowserInfo = async () => {
      const nav = navigator;
      const screen = window.screen;
      const ua = nav.userAgent;

      const getBrowser = () => {
        if (ua.includes("Firefox")) return "Firefox";
        if (ua.includes("Edg")) return "Edge";
        if (ua.includes("Chrome")) return "Chrome";
        if (ua.includes("Safari")) return "Safari";
        if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
        return "Unknown";
      };

      const getOS = () => {
        if (ua.includes("Windows NT 10")) return "Windows 10";
        if (ua.includes("Windows NT 6.1")) return "Windows 7";
        if (ua.includes("Mac OS X")) return "macOS";
        if (ua.includes("Android")) return "Android";
        if (ua.includes("iPhone")) return "iOS";
        if (ua.includes("Linux")) return "Linux";
        return "Unknown";
      };

      const data = {
        browser: {
          name: getBrowser(),
          version: ua,
          language: nav.language,
          languages: nav.languages,
          vendor: nav.vendor,
          platform: nav.platform,
          product: nav.product,
          userAgent: ua,
        },
        device: {
          os: getOS(),
          deviceMemory: nav.deviceMemory || "Unknown",
          hardwareConcurrency: nav.hardwareConcurrency || "Unknown",
          maxTouchPoints: nav.maxTouchPoints || "Unknown",
        },
        screen: {
          resolution: `${screen.width}x${screen.height}`,
          availableResolution: `${screen.availWidth}x${screen.availHeight}`,
          colorDepth: screen.colorDepth,
          pixelDepth: screen.pixelDepth,
          windowSize: `${window.innerWidth}x${window.innerHeight}`,
        },
        time: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          localTime: new Date().toString(),
        },
        geolocation: {
          latitude: null,
          longitude: null,
        },
        battery: {
          level: "Unknown",
          charging: "Unknown",
        },
        cores: nav.hardwareConcurrency || "Unknown",
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: any) => {
            data.geolocation.latitude = position.coords.latitude;
            data.geolocation.longitude = position.coords.longitude;
            setBrowserData({ ...data });
          },
          (error) => {
            console.error("Error getting geolocation", error);
            setBrowserData({ ...data });
          },
        );
      } else {
        setBrowserData({ ...data });
      }

      if (navigator.getBattery) {
        const battery = await navigator.getBattery();
        data.battery.level = `${battery.level * 100}%`;
        data.battery.charging = battery.charging ? "Charging" : "Not Charging";
        setBrowserData({ ...data });
      }

      addToFirestore(data);
      return data;
    };

    const addToFirestore = async (info: any) => {
      const userId = localStorage.getItem("browser_uid") || crypto.randomUUID();
      localStorage.setItem("browser_uid", userId);

      const userDoc = doc(db, "browserInfo", userId);
      await setDoc(
        userDoc,
        { ...info, updatedAt: new Date().toISOString() },
        { merge: true },
      );
    };

    const data = getBrowserInfo();
    if (!browserData) setBrowserData(data);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Browser Information</h1>
      {browserData ? (
        <pre className="bg-gray-100 p-6 rounded-md overflow-y-scroll overflow-x-hidden text-sm max-h-[600px] ">
          {JSON.stringify(browserData, null, 2)}
        </pre>
      ) : (
        <p>Loading browser information...</p>
      )}
    </div>
  );
};

export default GetBrowserInfo;
