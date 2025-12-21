import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireCmsAuth } from "@/app/api/cms/_auth";
import { listVehicles, upsertVehicle } from "@/lib/cmsVehicleRepo";
import { VehicleUpsertSchema } from "@/lib/cmsVehicleSchema";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const unauthorized = requireCmsAuth(request);
  if (unauthorized) return unauthorized;

  const data = await listVehicles();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const unauthorized = requireCmsAuth(request);
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  const parsed = VehicleUpsertSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "VALIDATION", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const vehicle = await upsertVehicle(parsed.data);
  return NextResponse.json({ vehicle });
}
