import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { url } = body;

  const apiKey = process.env.NEXT_PUBLIC_VIRUSTOTAL_API;

  try {
    const postRes = await fetch("https://www.virustotal.com/api/v3/urls", {
      method: "POST",
      headers: {
        "x-apikey": apiKey!,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ url }),
    });

    const postData = await postRes.json();
    const analysisId = postData.data.id;

    const getRes = await fetch(
      `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
      {
        headers: { "x-apikey": apiKey! },
      },
    );

    const analysisData = await getRes.json();
    return NextResponse.json(analysisData);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to analyze URL" },
      { status: 500 },
    );
  }
}
