import React, { useEffect, useState } from "react";
import LoadingUI from "@/components/UI/my-loading/LoadingUI";
import axios from "axios";

type QOSResultProps = {
  finalLoaded: boolean;
  setFinalLoaded: (arg0: boolean) => void;
  data: any;
};

const QosResult = ({ data, finalLoaded, setFinalLoaded }: QOSResultProps) => {
  const [location, setLocation] = useState<any>();

  const canvasHash = data.canvasFP
    ? btoa(data.canvasFP).slice(0, 16)
    : "Нет данных";

  useEffect(() => {
    setTimeout(() => {
      setFinalLoaded(true);
    }, 3000);
    data.location !== null && getLocation();
  }, []);

  const getBatteryStatus = () => {
    if (!data.battery) return "Unknown";
    return `${Math.round(data.battery.level * 100)}%, ${data.battery.charging ? "charging" : "not charging"}`;
  };

  const apiSupport = {
    WebRTC: !!navigator.mediaDevices,
    WebBluetooth: !!(navigator as any).bluetooth,
    WebUSB: !!(navigator as any).usb,
    WebShare: !!(navigator as any).share,
    ServiceWorker: "serviceWorker" in navigator,
    IndexedDB: "indexedDB" in window,
  };

  const getLocation = async () => {
    const apiKey = "54b65ef3f34345fea1af29eb67501efb";
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${data.location.latitude}&lon=${data.location.longitude}&apiKey=${apiKey}`;

    try {
      const response = await axios.get(url);
      setLocation(response.data.features[0].properties);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <p className="text-2xl md:text-3xl font-semibold mb-4 text-center">
        Анализ данных браузера:
      </p>
      {finalLoaded ? (
        <div className="rounded-xl mt-4 lg:mt-10 max-w-full lg:max-w-[80%] border p-2 md:p-8 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 text-sm">
            <div>
              <span className="font-semibold">ОС:</span> {data.platform}
            </div>
            <div>
              <span className="font-semibold">User Agent:</span>{" "}
              {data.userAgent}
            </div>

            <div>
              <span className="font-semibold">Язык интерфейса:</span>{" "}
              {data.language}
            </div>
            <div>
              <span className="font-semibold">Доступные языки:</span>{" "}
              {data.languages?.join(", ")}
            </div>
            <div>
              <span className="font-semibold">Часовой пояс:</span>{" "}
              {location?.timezone.name}
            </div>

            <div>
              <span className="font-semibold">Оперативная память:</span>{" "}
              {data.deviceMemory ? `${data.deviceMemory} ГБ` : "Неизвестно"}
            </div>
            <div>
              <span className="font-semibold">Локальный язык:</span>{" "}
              {data.locale}
            </div>
            <div>
              <span className="font-semibold">Ядер CPU:</span>{" "}
              {data.hardwareConcurrency}
            </div>
            <div>
              <span className="font-semibold">Точки касания:</span>{" "}
              {data.maxTouchPoints}
            </div>

            <div>
              <span className="font-semibold">Do Not Track:</span>{" "}
              {data.doNotTrack}
            </div>
            <div>
              <span className="font-semibold">Cookie включены:</span>{" "}
              {data.cookieEnabled ? "Да" : "Нет"}
            </div>
            <div>
              <span className="font-semibold">Онлайн:</span>{" "}
              {data.online ? "Да" : "Нет"}
            </div>

            <div>
              <span className="font-semibold">Размер экрана:</span>{" "}
              {data.screen?.width} × {data.screen?.height}
            </div>
            <div>
              <span className="font-semibold">Цветовая глубина:</span>{" "}
              {data.screen?.colorDepth}
            </div>
            <div>
              <span className="font-semibold">Размер окна:</span>{" "}
              {data.windowSize?.innerWidth} × {data.windowSize?.innerHeight}
            </div>

            <div>
              <span className="font-semibold">Заряд батареи:</span>{" "}
              {getBatteryStatus()}
            </div>
            <div>
              <span className="font-semibold">Геолокация:</span>{" "}
              {data.location
                ? `${data.location.latitude.toFixed(10)}, ${data.location.longitude.toFixed(10)}`
                : "Нет данных"}
            </div>
            {location && (
              <div>
                <span className="font-semibold">Страна, город:</span>{" "}
                {location?.country}, {location?.city}
              </div>
            )}
            {location && (
              <div>
                <span className="font-semibold">Postcode:</span>{" "}
                {location?.postcode}
              </div>
            )}
            <div>
              <span className="font-semibold">Текущее время:</span>{" "}
              {new Date().toLocaleString()}
            </div>

            <div>
              <span className="font-semibold">Canvas отпечаток (хеш):</span>{" "}
              {canvasHash}
            </div>
            {location && (
              <div>
                <span className="font-semibold">Часовой пояс:</span>{" "}
                {location.timezone.offset_DST}
              </div>
            )}
            <div>
              <span className="font-semibold">WebGL vendor:</span>{" "}
              {data.webgl?.vendor}
            </div>
            <div>
              <span className="font-semibold">WebGL renderer:</span>{" "}
              {data.webgl?.renderer}
            </div>

            <div>
              <span className="font-semibold">Тип сети:</span>{" "}
              {data.network?.effectiveType}
            </div>
            <div>
              <span className="font-semibold">Скорость сети:</span>{" "}
              {data.network?.downlink} Мбит/с
            </div>
            <div>
              <span className="font-semibold">RTT:</span> {data.network?.rtt} мс
            </div>

            <div>
              <span className="font-semibold">Медиа-устройства:</span>{" "}
              {data.mediaDevices?.length}
            </div>
            <div>
              <span className="font-semibold">Плагинов:</span>{" "}
              {data.plugins?.length}
            </div>
            <div>
              <span className="font-semibold">Типов MIME:</span>{" "}
              {data.mimeTypes?.length}
            </div>

            <div>
              <span className="font-semibold">Плагины:</span>{" "}
              {data.plugins?.slice(0, 3).join(", ")}
              {data.plugins?.length > 3 ? " и др." : ""}
            </div>
            <div>
              <span className="font-semibold">MIME-типы:</span>{" "}
              {data.mimeTypes?.slice(0, 3).join(", ")}
              {data.mimeTypes?.length > 3 ? " и др." : ""}
            </div>
            <div>
              <span className="font-semibold">Состояние документа:</span>{" "}
              {data.visibility}
            </div>

            <div>
              <span className="font-semibold">Поддержка WebRTC:</span>{" "}
              {apiSupport.WebRTC ? "Да" : "Нет"}
            </div>
            <div>
              <span className="font-semibold">Поддержка Bluetooth:</span>{" "}
              {apiSupport.WebBluetooth ? "Да" : "Нет"}
            </div>
            <div>
              <span className="font-semibold">Поддержка USB:</span>{" "}
              {apiSupport.WebUSB ? "Да" : "Нет"}
            </div>

            <div>
              <span className="font-semibold">IndexedDB:</span>{" "}
              {apiSupport.IndexedDB ? "Да" : "Нет"}
            </div>
            <div>
              <span className="font-semibold">Service Worker:</span>{" "}
              {apiSupport.ServiceWorker ? "Да" : "Нет"}
            </div>
            <div>
              <span className="font-semibold">Web Share API:</span>{" "}
              {apiSupport.WebShare ? "Да" : "Нет"}
            </div>
          </div>
        </div>
      ) : (
        <LoadingUI />
      )}
    </div>
  );
};

export default QosResult;
