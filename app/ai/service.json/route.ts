import { getProductServiceGraph } from "@/lib/product-discovery";

export const revalidate = 86400;

export function GET() {
  return Response.json(getProductServiceGraph(), {
    headers: { "Cache-Control": "public, max-age=86400, s-maxage=86400" },
  });
}
