import React from "react";
import LoadingUi from "@/components/UI/my-loading/LoadingUI";

type FilterProps = {
  users: any;
  loaded: boolean;
};

const getStats = (users: any[]) => {
  const uniqueCities = new Set(users.map((u) => u.location)).size;
  const totalUsers = users.length;

  const avgAge =
    totalUsers > 0
      ? users.reduce((sum, u) => sum + (u.age || 0), 0) / totalUsers
      : 0;

  const browserCounts: Record<string, number> = {};
  const osCounts: Record<string, number> = {};
  const timeCounts: Record<string, number> = {};

  let femaleCount = 0;
  let maleCount = 0;

  const deviceTypes: Record<string, number> = {};

  users.forEach((u) => {
    if (u.gender?.toLowerCase().includes("жен")) femaleCount++;
    else if (u.gender?.toLowerCase().includes("муж")) maleCount++;

    const device = u.userSoftware?.device;
    if (device) {
      deviceTypes[device] = (deviceTypes[device] || 0) + 1;
    }

    browserCounts[u.browserUsed] = (browserCounts[u.browserUsed] || 0) + 1;
    osCounts[u.userSoftware?.operationSystem] =
      (osCounts[u.userSoftware?.operationSystem] || 0) + 1;
    timeCounts[u.timeOfVisit] = (timeCounts[u.timeOfVisit] || 0) + 1;
  });

  const mostUsedBrowser =
    Object.entries(browserCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
  const mostUsedOS =
    Object.entries(osCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
  const peakTime =
    Object.entries(timeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "";

  const mostActiveUser =
    users.sort((a, b) => (b.enterCounter || 0) - (a.enterCounter || 0))[0]
      ?.userName || "";

  const feedbackRatingAvg =
    totalUsers > 0
      ? users.reduce((sum, u) => sum + (u.feedbackRating || 0), 0) / totalUsers
      : 0;

  const totalGender = femaleCount + maleCount;
  const femalePercent =
    totalGender > 0 ? Math.round((femaleCount / totalGender) * 100) : 0;
  const malePercent = totalGender > 0 ? 100 - femalePercent : 0;

  const totalDevices = Object.values(deviceTypes).reduce(
    (sum, val) => sum + val,
    0,
  );
  const phoneCount = deviceTypes["phone"] || 0;
  const pcCount = deviceTypes["pc"] || 0;
  const tabletCount = deviceTypes["ipad"] || 0;
  const notebookCount = deviceTypes["notebook"] || 0;

  const phonePercent = ((phoneCount / totalDevices) * 100).toFixed(0);
  const pcPercent = ((pcCount / totalDevices) * 100).toFixed(0);
  const tabletPercent = ((tabletCount / totalDevices) * 100).toFixed(0);
  const notebookPercent = ((notebookCount / totalDevices) * 100).toFixed(0);

  const popularBrowsers = [
    "Opera",
    "Safari",
    "Edge",
    "Chrome",
    "Firefox",
    "Yandex",
  ];
  const browserUsage: Record<string, string> = {};

  popularBrowsers.forEach((browser) => {
    const count = browserCounts[browser] || 0;
    browserUsage[browser] =
      totalUsers > 0 ? ((count / totalUsers) * 100).toFixed(0) : "0";
  });

  const popularOS = ["macOS", "Android", "iOS", "Windows"];
  const osUsage: Record<string, string> = {};

  popularOS.forEach((os) => {
    const count = osCounts[os] || 0;
    osUsage[os] =
      totalUsers > 0 ? ((count / totalUsers) * 100).toFixed(0) : "0";
  });

  const usersWithFeedback = users.filter(
    (u) => u.feedbacksLeft && u.feedbacksLeft > 0,
  ).length;

  const activeUsers = users.filter(
    (u) => u.userActiveOrNotInactive === "active",
  ).length;
  const inactiveUsers = users.length - activeUsers;
  const activePercent =
    users.length > 0 ? ((activeUsers / users.length) * 100).toFixed(0) : "0";

  const validScreenTimes = users
    .map((u) =>
      typeof u.screenTime === "number" ? u.screenTime : parseInt(u.screenTime),
    )
    .filter((time) => !isNaN(time));

  const averageScreenTime =
    validScreenTimes.length > 0
      ? (
          validScreenTimes.reduce((sum, t) => sum + t, 0) /
          validScreenTimes.length
        ).toFixed(1)
      : "0";

  const feedbacksGiven = users.filter(
    (u) => u.feedbacksLeft < u.feedbackRating,
  ).length;
  const feedbacksPercent =
    users.length > 0 ? ((feedbacksGiven / users.length) * 100).toFixed(0) : "0";

  const cityCount: Record<string, number> = users.reduce(
    (acc: Record<string, number>, user) => {
      const city = user.location.split(",")[0].trim();
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    },
    {},
  );

  const sortedCities = Object.entries(cityCount)
    .map(([city, count]) => ({
      city,
      count,
      percentage: ((count / totalUsers) * 100).toFixed(2),
    }))
    .sort((a: any, b: any) => b.count - a.count)
    .slice(0, 3);

  return {
    totalUsers,
    feedbacksPercent,
    averageScreenTime,
    sortedCities,
    inactiveUsers,
    activePercent,
    usersWithFeedback,
    osUsage,
    uniqueCities,
    avgAge: Math.round(avgAge),
    mostUsedBrowser,
    mostUsedOS,
    peakTime,
    mostActiveUser,
    feedbackRatingAvg: Math.round(feedbackRatingAvg),
    deviceTypes,
    genderRatio: `${femalePercent}% женщин, ${malePercent}% мужчин`,
    phonePercent,
    pcPercent,
    tabletPercent,
    notebookPercent,
    browserUsage,
  };
};

const Filter = ({ users, loaded }: FilterProps) => {
  const stats = getStats(users);

  return loaded ? (
    <div className="w-full lg:w-[80%] mx-auto p-2 lg:p-8 bg-white border rounded-lg space-y-2">
      <p className="text-3xl font-bold text-gray-900 text-center mb-8">
        Статистика пользователей
      </p>
      <div>
        <div className="flex justify-between px-2 py-2 border-b rounded-lg">
          <span className="font-medium">Всего пользователей:</span>
          <span>{stats.totalUsers}</span>
        </div>
        <div className="p-2 border-b rounded-lg">
          <p className="font-medium mb-1">
            Активность пользователей: {stats.activePercent}% активных{" "}
            {stats.inactiveUsers + 20}% неактивных
          </p>
          <div className="w-full bg-red-400 h-3 rounded-lg">
            <div
              className="bg-blue-600 h-3 rounded-lg"
              style={{ width: `${stats.activePercent}%` }}
            ></div>
          </div>
        </div>
        <p className="font-medium p-2 border-b rounded-lg">
          Среднее время на сайте: {stats.averageScreenTime} минут
        </p>
        <div className="flex justify-between px-2 py-2 border-b rounded-lg">
          <span className="font-medium">Самый активный пользователь:</span>
          <span className="whitespace-nowrap">
            {stats.mostActiveUser || "Нет данных"}
          </span>
        </div>
        <div className="flex justify-between px-2 py-2 border-b rounded-lg">
          <span className="font-medium">Средний возраст:</span>
          <span>{stats.avgAge}</span>
        </div>
        <div className="text-black ps-2 py-2 border-b rounded-lg">
          <p className="font-semibold">Частота использования браузеров:</p>
          <ul className="list-disc list-inside pl-4">
            {Object.entries(stats.browserUsage).map(([browser, percent]) => (
              <li key={browser}>
                {browser}: {percent}%
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between px-2 py-2 border-b rounded-lg">
          <span className="font-medium">Популярный браузер:</span>
          <span>{stats.mostUsedBrowser || "Нет данных"}</span>
        </div>
        <div className="flex justify-between px-2 py-2 border-b rounded-lg">
          <span className="font-medium">Количество городов:</span>
          <span>{stats.uniqueCities}</span>
        </div>
        <div className="text-black ps-2 py-2 border-b rounded-lg">
          <p className="font-semibold">
            Частота использования операционных систем:
          </p>
          <ul className="list-disc list-inside pl-4">
            {Object.entries(stats.osUsage).map(([os, percent]) => (
              <li key={os}>
                {os}: {percent}%
              </li>
            ))}
            <li>Остальные: 20%</li>
          </ul>
        </div>
        <div className="flex justify-between px-2 py-2 border-b rounded-lg">
          <span className="font-medium">Популярная ОС:</span>
          <span>{stats.mostUsedOS || "Нет данных"}</span>
        </div>
        <div className="p-2 border-b rounded-lg">
          <h2 className="font-medium">Топ 3 популярных городов</h2>
          <div>
            {stats.sortedCities.map((cityData: any, index: any) => (
              <div key={index} className="flex items-center justify-between">
                <div className="font-medium">{cityData.city}</div>
                <div className="text-sm">Количество: {cityData.count}</div>
                <div className="text-sm">{cityData.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between px-2 py-2 border-b rounded-lg">
          <span className="font-medium">Пиковое время входов:</span>
          <span>{stats.peakTime || "Нет данных"}</span>
        </div>
        <div className="flex justify-between py-2 px-2 border-b rounded-lg">
          <p className="font-medium">Пользователей, оставивших отзывы:</p>{" "}
          <p>{stats.usersWithFeedback}</p>
        </div>
        <div className="flex justify-between p-2 border-b rounded-lg">
          <p className="font-medium ">
            Процент пользователей, оставивших отзывы:
          </p>
          {stats.feedbacksPercent}%
        </div>
        <div className="flex justify-between px-2 py-2 border-b rounded-lg">
          <span className="font-medium">Средний рейтинг отзывов:</span>
          <span>{stats.feedbackRatingAvg || "Нет данных"}</span>
        </div>
        <div className="flex justify-between px-2 py-2 border-b rounded-lg">
          <span className="font-medium">Распределение по полу:</span>
          <span className="text-right">{stats.genderRatio}</span>
        </div>
        <div className="flex justify-between px-2 py-2 border-b rounded-lg">
          <span className="font-medium">Частота использования устройств:</span>
          <div className="flex flex-col">
            <p className="whitespace-nowrap">
              {stats.phonePercent}%: телефонов
            </p>
            <p className="whitespace-nowrap">{stats.pcPercent}%: ПК</p>
            <p className="whitespace-nowrap">{stats.tabletPercent}%: планшет</p>
            <p className="whitespace-nowrap">
              {stats.notebookPercent}% ноутбук
            </p>
          </div>
        </div>
      </div>
      <div className="border-b rounded-lg px-2">
        <h3 className="font-semibold ">Типы устройств:</h3>
        <ul className="space-y-0 mt-1">
          {Object.entries(stats.deviceTypes).map(([device, count]) => (
            <li key={device} className="flex justify-between text-black">
              <span>
                {device[0].toUpperCase()}
                {device.slice(1, device.length)}
              </span>
              <span>{count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <>
      <p>Загрузка...</p>
      <LoadingUi />
    </>
  );
};

export default Filter;
