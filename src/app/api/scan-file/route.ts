import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.NEXT_PUBLIC_VIRUSTOTAL_API;

  if (!apiKey) {
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as Blob;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const virusFormData = new FormData();
  virusFormData.append("file", file, "upload.file");

  const response = await fetch("https://www.virustotal.com/api/v3/files", {
    method: "POST",
    headers: {
      "x-apikey": apiKey,
    },
    body: virusFormData,
  });

  const data = await response.json();

  return NextResponse.json(data);
}
