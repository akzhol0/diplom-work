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
      const nav: any = navigator;
      const scr: any = window.screen;

      // Canvas fingerprint
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d") as any;
      let canvasFP = "";
      if (ctx) {
        ctx.textBaseline = "top";
        ctx.font = "14px Arial";
        ctx.fillText("FP test", 2, 2);
        canvasFP = canvas.toDataURL();
      }

      // WebGL info
      const glCanvas = document.createElement("canvas");
      const gl: any = glCanvas.getContext("webgl");
      const webgl = {
        vendor: gl?.getParameter(gl.VENDOR) || null,
        renderer: gl?.getParameter(gl.RENDERER) || null,
      };

      // Plugins & MIME types
      const plugins = Array.from(nav.plugins || []).map((p: any) => p.name);
      const mimeTypes = Array.from(nav.mimeTypes || []).map((m: any) => m.type);

      // Media devices
      let mediaDevices: any[] = [];
      try {
        mediaDevices = await nav.mediaDevices.enumerateDevices();
      } catch {
        mediaDevices = [];
      }

      // Network
      const conn: any = nav.connection || {};
      const network = {
        effectiveType: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt,
      };

      // Battery
      let battery: any = null;
      try {
        battery = await nav.getBattery();
      } catch {}

      // Geolocation
      const location = await new Promise<any>((resolve) => {
        if (!nav.geolocation) return resolve(null);
        nav.geolocation.getCurrentPosition(
          (pos: any) => resolve(pos.coords),
          () => resolve(null),
          { enableHighAccuracy: true, timeout: 5000 },
        );
      });

      // Performance & Visibility
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
        battery,
        location,
        performanceEntries,
        visibility,
      });
    };

    collect();
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  return !finalStage ? (
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
        Данные браузера
      </h1>
      {loaded ? (
        <>
          <pre className="bg-gray-100 p-6 rounded-md overflow-y-scroll overflow-x-hidden text-sm max-h-[600px] ">
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
        </>
      ) : (
        <>
          <p className="text-center">Загрузка данных браузера...</p>
          <LoadingUI />
        </>
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
