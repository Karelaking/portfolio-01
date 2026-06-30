import GalleryList from "@/components/gallery-list";

const tiles = [
  {
    id: 1,
    label: "Mountain sunrise",
    location: "Rocky Mountains, CO",
    contributor: {
      name: "Maya Osei",
      initials: "MO",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    tag: "Landscape",
    featured: true,
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&crop=entropy",
    full: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  },
  {
    id: 2,
    label: "City skyline",
    location: "Chicago, IL",
    contributor: {
      name: "Leo Farris",
      initials: "LF",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    tag: "Urban",
    featured: false,
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&crop=entropy",
    full: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
  },
  {
    id: 3,
    label: "Forest trail",
    location: "Olympic NP, WA",
    contributor: {
      name: "Sara Kim",
      initials: "SK",
      avatar: "https://i.pravatar.cc/40?img=5",
    },
    tag: "Nature",
    featured: false,
    src: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80&crop=entropy",
    full: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&q=80",
  },
  {
    id: 4,
    label: "Ocean waves",
    location: "Big Sur, CA",
    contributor: {
      name: "Dante Ruiz",
      initials: "DR",
      avatar: "https://i.pravatar.cc/40?img=7",
    },
    tag: "Coastal",
    featured: true,
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&crop=edges",
    full: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
  },
  {
    id: 5,
    label: "Desert dunes",
    location: "Sahara, Morocco",
    contributor: {
      name: "Nadia Voss",
      initials: "NV",
      avatar: "https://i.pravatar.cc/40?img=9",
    },
    tag: "Landscape",
    featured: false,
    src: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80&crop=entropy",
    full: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=80",
  },
  {
    id: 6,
    label: "Snowy peaks",
    location: "Lauterbrunnen, CH",
    contributor: {
      name: "Jin Park",
      initials: "JP",
      avatar: "https://i.pravatar.cc/40?img=11",
    },
    tag: "Alpine",
    featured: false,
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&crop=edges",
    full: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
  },
  {
    id: 7,
    label: "Autumn leaves",
    location: "Vermont, USA",
    contributor: {
      name: "Fiona Blake",
      initials: "FB",
      avatar: "https://i.pravatar.cc/40?img=13",
    },
    tag: "Seasonal",
    featured: false,
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80&crop=entropy",
    full: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
  },
  {
    id: 8,
    label: "Wildflower field",
    location: "Tuscany, Italy",
    contributor: {
      name: "Arjun Mehta",
      initials: "AM",
      avatar: "https://i.pravatar.cc/40?img=15",
    },
    tag: "Nature",
    featured: true,
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&crop=edges",
    full: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80",
  },
  {
    id: 9,
    label: "Coastal cliffs",
    location: "Moher, Ireland",
    contributor: {
      name: "Cleo Torres",
      initials: "CT",
      avatar: "https://i.pravatar.cc/40?img=17",
    },
    tag: "Coastal",
    featured: false,
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&crop=edges",
    full: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&crop=edges",
  },
  {
    id: 10,
    label: "River valley",
    location: "Columbia Gorge, OR",
    contributor: {
      name: "Eli Grant",
      initials: "EG",
      avatar: "https://i.pravatar.cc/40?img=19",
    },
    tag: "Landscape",
    featured: false,
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&crop=edges",
    full: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&crop=edges",
  },
  {
    id: 11,
    label: "Jungle canopy",
    location: "Amazon Basin, BR",
    contributor: {
      name: "Amara Diop",
      initials: "AD",
      avatar: "https://i.pravatar.cc/40?img=21",
    },
    tag: "Nature",
    featured: false,
    src: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80&crop=edges",
    full: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&q=80&crop=edges",
  },
  {
    id: 12,
    label: "Lakeside dawn",
    location: "Lake Bled, SI",
    contributor: {
      name: "Theo Hartmann",
      initials: "TH",
      avatar: "https://i.pravatar.cc/40?img=23",
    },
    tag: "Landscape",
    featured: false,
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&crop=entropy",
    full: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&crop=entropy",
  },
];

const ALL_TAG = "All";
const tags = [ALL_TAG, ...Array.from(new Set(tiles.map((t) => t.tag)))];

export default function GalleryBlock() {
  return (
    <section className="flex min-h-svh w-full items-center justify-center bg-background py-20 text-foreground">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Gallery
          </span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl capitalize">
            Captured moments in a second
          </h2>
          <p className="mt-3 text-base text-muted-foreground px-4 sm:px-24">
            A curated collection of photographs showcasing the beauty and diversity of our world, captured by my mobile device camera.
          </p>
        </div>

        <GalleryList tiles={tiles} tags={tags} />
      </div>
    </section>
  );
}
