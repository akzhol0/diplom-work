"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center py-[200px]">
      <h2>Произошла ошибка в коде, пажалуйста перезагрузите браузер!</h2>
      <span className="mt-2" onClick={() => reset()}>
        <MyDangerButton className="px-8">Перезагрузить</MyDangerButton>
      </span>
    </div>
  );
}
