import React, { useEffect, useState } from "react";
import { addDoc } from "@firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "@/components/firebase/config";

interface BatteryManagerFixed {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}

const GetBrowserInfo = () => {
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    const getInfo = async () => {
      interface NavigatorExtended extends Navigator {
        getBattery?: () => Promise<BatteryManagerFixed>;
        deviceMemory?: number;
        connection?: any;
      }

      const nav = navigator as NavigatorExtended;
      const screen = window.screen;

      const battery = await (nav.getBattery?.().catch(() => null) ?? null);
      const mediaDevices = await (nav.mediaDevices
        ?.enumerateDevices?.()
        .catch(() => []) ?? []);

      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") as WebGLRenderingContext | null;
      const webGLInfo = gl
        ? {
            vendor: gl.getParameter(gl.VENDOR),
            renderer: gl.getParameter(gl.RENDERER),
          }
        : null;

      const connection = nav.connection
        ? {
            downlink: nav.connection.downlink ?? "N/A",
            effectiveType: nav.connection.effectiveType ?? "N/A",
            rtt: nav.connection.rtt ?? "N/A",
            saveData: nav.connection.saveData ?? "N/A",
            type: nav.connection.type ?? "N/A",
          }
        : "Unavailable";

      const browserInfo: any = {
        browser: getBrowserName(nav.userAgent),
        platform: nav.platform,
        os: getOperatingSystem(nav.platform),
        language: nav.language,
        languages: nav.languages,
        cookieEnabled: nav.cookieEnabled,
        doNotTrack: nav.doNotTrack,
        online: nav.onLine,
        screenResolution: `${screen.width}x${screen.height}`,
        colorDepth: screen.colorDepth,
        pixelRatio: window.devicePixelRatio,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timeOffset: new Date().getTimezoneOffset(),
        localTime: new Date().toString(),
        memory: nav.deviceMemory ?? "N/A",
        cpuCores: nav.hardwareConcurrency ?? "N/A",
        touchSupport: "ontouchstart" in window,
        maxTouchPoints: nav.maxTouchPoints,
        battery: battery
          ? {
              charging: battery.charging,
              level: battery.level,
              chargingTime: battery.chargingTime,
              dischargingTime: battery.dischargingTime,
            }
          : "Unavailable",
        connection,
        mediaDevices: mediaDevices.map((d) => ({
          kind: d.kind,
          label: d.label,
          deviceId: d.deviceId,
        })),
        webGLInfo,
        storageEstimate: await navigator.storage?.estimate?.(),
        location: "Pending...",
      };

      const saveToFirestore = async (data: any) => {
        const fingerprint = `${data.browser}_${data.os}_${data.screenResolution}_${data.timezone}`;
        const storedKey = localStorage.getItem("browser_fingerprint");

        if (storedKey === fingerprint) return;

        await addDoc(collection(db, "browser_info"), {
          ...data,
          timestamp: new Date(),
        });

        localStorage.setItem("browser_fingerprint", fingerprint);
      };

      if (nav.geolocation) {
        nav.geolocation.getCurrentPosition(
          async (pos) => {
            browserInfo.location = {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              accuracy: pos.coords.accuracy,
            };
            setInfo(browserInfo);
            await saveToFirestore(browserInfo);
          },
          async (err) => {
            browserInfo.location = `Error: ${err.message}`;
            setInfo(browserInfo);
            await saveToFirestore(browserInfo);
          },
        );
      } else {
        browserInfo.location = "Geolocation not supported";
        setInfo(browserInfo);
        await saveToFirestore(browserInfo);
      }

      setTimeout(async () => {
        if (!browserInfo.location || browserInfo.location === "Pending...") {
          browserInfo.location = "Blocked or taking too long";
          setInfo(browserInfo);
          await saveToFirestore(browserInfo);
        }
      }, 5000);
    };

    getInfo();
  }, []);

  const getBrowserName = (userAgent: string) => {
    const browsers = [
      { name: "Chrome", regex: /Chrome|Chromium/ },
      { name: "Firefox", regex: /Firefox/ },
      { name: "Safari", regex: /Safari/ },
      { name: "Edge", regex: /Edge/ },
      { name: "Opera", regex: /Opera/ },
      { name: "IE", regex: /Trident|MSIE/ },
    ];

    for (const browser of browsers) {
      if (browser.regex.test(userAgent)) {
        return browser.name;
      }
    }
    return "Unknown Browser";
  };

  const getOperatingSystem = (platform: string) => {
    const osMap: Record<string, string> = {
      Win32: "Windows",
      Win64: "Windows",
      MacIntel: "macOS",
      Linux: "Linux",
      Android: "Android",
      iPhone: "iOS",
    };
    return osMap[platform] || "Unknown OS";
  };

  const sortAndCategorizeInfo = (info: any) => {
    return {
      Browser: info.browser,
      OS: info.os,
      Device: info.platform,
      Location: info.location,
      Screen: `${info.screenResolution}, ${info.colorDepth}-bit, ${info.pixelRatio}x`,
      Battery: info.battery ? `${info.battery.level * 100}% charge` : "N/A",
      Connection: info.connection
        ? `${info.connection.type} / ${info.connection.effectiveType}`
        : "N/A",
      Memory: `${info.memory} GB`,
      CPU: `${info.cpuCores} cores`,
      Languages: info.languages.join(", "),
      Timezone: info.timezone,
      TimeOffset: `${info.timeOffset} minutes`,
      LocalTime: info.localTime,
      TouchSupport: info.touchSupport ? "Supported" : "Not Supported",
    };
  };

  const categorizedInfo = info ? sortAndCategorizeInfo(info) : null;

  return !info ? (
    <p>Loading browser info...</p>
  ) : (
    <div>
      <h2 className="text-xl font-semibold mb-2">Browser Info</h2>
      <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto max-h-[500px]">
        {info ? JSON.stringify(info, null, 2) : "Collecting info..."}
      </pre>
      <br />
      <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto max-h-[500px]">
        {categorizedInfo
          ? JSON.stringify(categorizedInfo, null, 2)
          : "Collecting info..."}
      </pre>
    </div>
  );
};

export default GetBrowserInfo;
