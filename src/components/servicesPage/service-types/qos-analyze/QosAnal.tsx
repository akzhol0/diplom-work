"use client";

import React, { useEffect, useState } from "react";
import LoadingUI from "@/components/UI/my-loading/LoadingUI";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import QOSResult from "@/components/servicesPage/service-types/qos-analyze/QOSResult";

const QOSAnal = () => {
  const [info, setInfo] = useState<any>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  const [finalStage, setFinalStage] = useState<boolean>(false);
  const [finalLoaded, setFinalLoaded] = useState<boolean>(false);

  useEffect(() => {
    const collect = async () => {
      const nav = navigator as any;
      const scr = window.screen as any;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D | null;
      let canvasFP = "";
      if (ctx) {
        ctx.textBaseline = "top";
        ctx.font = "14px Arial";
        ctx.fillText("FP test", 2, 2);
        try {
          canvasFP = canvas.toDataURL();
        } catch {
          canvasFP = "";
        }
      }

      const glCanvas = document.createElement("canvas");
      const gl =
        (glCanvas.getContext("webgl") as WebGLRenderingContext) ||
        (glCanvas.getContext("experimental-webgl") as WebGLRenderingContext) ||
        null;
      const webgl = {
        vendor: gl ? gl.getParameter(gl.VENDOR) : null,
        renderer: gl ? gl.getParameter(gl.RENDERER) : null,
      };

      const plugins = Array.from(nav.plugins || []).map((p: any) => p.name);
      const mimeTypes = Array.from(nav.mimeTypes || []).map((m: any) => m.type);

      let mediaDevices: any[] = [];
      try {
        mediaDevices = nav.mediaDevices
          ? await nav.mediaDevices.enumerateDevices()
          : [];
      } catch {
        mediaDevices = [];
      }

      const conn = nav.connection || {};
      const network = {
        effectiveType: conn.effectiveType ?? null,
        downlink: conn.downlink ?? null,
        rtt: conn.rtt ?? null,
      };

      let battery: any = null;
      try {
        battery = await nav.getBattery();
      } catch {
        battery = null;
      }

      let location: any = null;
      if (nav.geolocation) {
        location = await new Promise((resolve) =>
          nav.geolocation.getCurrentPosition(
            (pos: any) => resolve(pos.coords),
            () => resolve(null),
            { enableHighAccuracy: true, timeout: 5000 },
          ),
        );
      }

      const performanceEntries = performance.getEntries();
      const visibility = document.visibilityState;

      setInfo({
        userAgent: nav.userAgent,
        platform: nav.platform,
        languages: nav.languages,
        language: nav.language,
        locale: Intl.DateTimeFormat().resolvedOptions().locale,
        hardwareConcurrency: nav.hardwareConcurrency,
        deviceMemory: nav.deviceMemory,
        maxTouchPoints: nav.maxTouchPoints,
        doNotTrack: nav.doNotTrack,
        cookieEnabled: nav.cookieEnabled,
        online: nav.onLine,
        screen: {
          width: scr.width,
          height: scr.height,
          availWidth: scr.availWidth,
          availHeight: scr.availHeight,
          colorDepth: scr.colorDepth,
          pixelDepth: scr.pixelDepth,
        },
        windowSize: {
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
        },
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        plugins,
        mimeTypes,
        mediaDevices,
        canvasFP,
        webgl,
        network,
        battery: battery
          ? {
              charging: battery.charging,
              chargingTime: battery.chargingTime,
              dischargingTime: battery.dischargingTime,
              level: battery.level,
            }
          : null,
        location,
        performanceEntries,
        visibility,
      });
    };

    collect();
    setTimeout(() => setLoaded(true), 3000);
  }, []);

  return !finalStage ? (
    <div className="animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
        Данные браузера
      </h1>
      {loaded ? (
        <div>
          <pre className="bg-gray-100 p-6 rounded-md overflow-y-scroll overflow-x-hidden text-sm max-h-[400px] md:max-h-[600px]">
            {JSON.stringify(info, null, 2)}
          </pre>
          <div
            className="flex justify-center"
            onClick={() => setFinalStage(true)}
          >
            <MyPrimaryButton className="text-center px-[150px] mt-4">
              Анализ
            </MyPrimaryButton>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-center">Загрузка данных браузера...</p>
          <LoadingUI />
        </div>
      )}
    </div>
  ) : (
    <div>
      <QOSResult
        data={info}
        setFinalLoaded={setFinalLoaded}
        finalLoaded={finalLoaded}
      />
    </div>
  );
};

export default QOSAnal;
