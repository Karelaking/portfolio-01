import GalleryList from "@/components/gallery-list";
import { getGalleryTiles } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A curated collection of mobile photography documenting cityscapes, tech workspaces, and abstract architecture.",
};

const ALL_TAG = "All";

export default async function GalleryBlock() {
  const tiles = await getGalleryTiles();
  const tags = [ALL_TAG, ...Array.from(new Set(tiles.map((t) => t.tag)))];

  return (
    <section className="flex min-h-svh w-full items-center justify-center bg-background py-20 text-foreground">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Gallery
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl capitalize">
            Captured moments in a second
          </h1>
          <p className="mt-3 text-base text-muted-foreground px-4 sm:px-24">
            A curated collection of photographs showcasing the beauty and diversity of our world, captured by my mobile device camera.
          </p>
        </div>

        <GalleryList tiles={tiles} tags={tags} />
      </div>
    </section>
  );
}
