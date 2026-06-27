"use client";

import {
  RiAppleFill,
  RiDiscordFill,
  RiDropboxFill,
  RiFigmaFill,
  RiGithubFill,
  RiGoogleFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiMailFill,
  RiMicrosoftFill,
  RiNotionFill,
  RiPaypalFill,
  RiSlackFill,
  RiSpotifyFill,
  RiTelegramFill,
  RiTrelloFill,
  RiTwitterXFill,
  RiWhatsappFill,
} from "@remixicon/react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toaster } from "@/components/ui/sonner";

const integrations = [
  { name: "Slack", Icon: RiSlackFill, category: "Messaging" },
  { name: "GitHub", Icon: RiGithubFill, category: "Dev" },
  { name: "Google", Icon: RiGoogleFill, category: "Productivity" },
  { name: "Notion", Icon: RiNotionFill, category: "Productivity" },
  { name: "Figma", Icon: RiFigmaFill, category: "Design" },
  { name: "Discord", Icon: RiDiscordFill, category: "Messaging" },
  { name: "Microsoft", Icon: RiMicrosoftFill, category: "Productivity" },
  { name: "PayPal", Icon: RiPaypalFill, category: "Payments" },
  { name: "Dropbox", Icon: RiDropboxFill, category: "Storage" },
  { name: "Trello", Icon: RiTrelloFill, category: "Dev" },
  { name: "Telegram", Icon: RiTelegramFill, category: "Messaging" },
  { name: "WhatsApp", Icon: RiWhatsappFill, category: "Messaging" },
  { name: "Spotify", Icon: RiSpotifyFill, category: "Media" },
  { name: "Apple", Icon: RiAppleFill, category: "Platform" },
  { name: "LinkedIn", Icon: RiLinkedinBoxFill, category: "Social" },
  { name: "Instagram", Icon: RiInstagramFill, category: "Social" },
  { name: "X (Twitter)", Icon: RiTwitterXFill, category: "Social" },
  { name: "Email", Icon: RiMailFill, category: "Messaging" },
];

const ALL = "All";
const categories = [
  ALL,
  ...Array.from(new Set(integrations.map((i) => i.category))),
];

type Integration = (typeof integrations)[number];

const Page = (): React.JSX.Element => {
  const [active, setActive] = useState(ALL);
  const [selected, setSelected] = useState<Integration | null>(null);

  const visible =
    active === ALL
      ? integrations
      : integrations.filter((i) => i.category === active);

  function handleConnect() {
    if (selected) {
      toast.success(`${selected.name} connected`, {
        description: `Added to your ${selected.category} integrations.`,
      });
    }
    setSelected(null);
  }

  const Icon = selected?.Icon;
  return (
    <section className="flex min-h-svh w-full items-center justify-center bg-background py-12 text-foreground">
      <Toaster />
      <div className="w-full max-w-4xl">
        <div className="mx-auto max-w-xl text-center">
          <Badge variant="outline" className="mb-4">
            100+ Integrations
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Plug in to everything your team uses
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Acme connects with the tools already in your workflow, no custom
            code or middleware required.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <ToggleGroup
            variant="outline"
            size="sm"
            value={[active]}
            onValueChange={(value) => {
              const next = value[0];
              if (next) setActive(next);
            }}
            aria-label="Filter integrations by category"
            className="flex-wrap justify-center"
          >
            {categories.map((category) => (
              <ToggleGroupItem
                key={category}
                value={category}
                aria-label={`Show ${category} integrations`}
                className="text-xs font-medium tracking-wide"
              >
                {category}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {visible.map((integration) => (
            <Card
              key={integration.name}
              className="group/tile transition-shadow hover:ring-foreground/20"
            >
              <button
                type="button"
                onClick={() => setSelected(integration)}
                aria-label={`Connect ${integration.name}`}
                className="w-full cursor-pointer text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <CardContent className="flex flex-col items-center gap-2 py-5">
                  <integration.Icon
                    className="size-7 text-foreground/80 transition-colors group-hover/tile:text-foreground"
                    aria-hidden="true"
                  />
                  <span className="w-full truncate text-center text-xs leading-tight font-medium text-muted-foreground transition-colors group-hover/tile:text-foreground">
                    {integration.name}
                  </span>
                </CardContent>
              </button>
            </Card>
          ))}
        </div>
      </div>

      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <span className="flex size-10 items-center justify-center border border-border bg-background">
              {Icon && <Icon className="size-5" aria-hidden="true" />}
            </span>
            <DialogTitle className="mt-3">Connect {selected?.name}</DialogTitle>
            <DialogDescription>
              Authorize Acme to access your {selected?.name} account. This adds
              it to your{" "}
              <span className="text-foreground">{selected?.category}</span>{" "}
              integrations. You can disconnect any time.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Cancel
            </DialogClose>
            <Button onClick={handleConnect}>Connect {selected?.name}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Page;
