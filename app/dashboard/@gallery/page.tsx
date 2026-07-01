import React from "react";
import { getGalleryTiles } from "@/lib/data";
import GalleryManager from "./gallery-manager";

export default async function Page() {
  const initialTiles = await getGalleryTiles();
  return <GalleryManager initialTiles={initialTiles} />;
}
