import { getMembers } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  RiLinkedinLine,
  RiTwitterXLine,
  RiGithubLine,
} from "@remixicon/react";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export default async function TeamSection() {
  const members = await getMembers();

  return (
    <div className="mx-auto w-full max-w-5xl mt-24">
      <div className="mx-auto max-w-xl text-center">
        <span className="inline-block border border-border px-3 py-1 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Our Team
        </span>
        <h2 className="mt-5 text-4xl capitalize font-bold tracking-tight">
          The people behind me
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          A small, focused team that cares deeply about craft, reliability,
          and the people who use what we build.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 md:grid-cols-3">
        {members.map(({ name, role, avatar, bio, social }) => (
          <Card
            key={name}
            className="flex flex-col border-0 bg-card p-0 transition-colors duration-150 hover:bg-muted/40"
          >
            <CardContent className="flex flex-1 flex-col gap-5 p-6">
              <div className="flex items-start gap-4">
                <Avatar className="size-16 border border-border">
                  <AvatarImage
                    src={avatar}
                    alt={name}
                    className="grayscale object-cover"
                  />
                  <AvatarFallback className="text-sm font-medium">
                    {getInitials(name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start gap-2">
                  <span className="text-sm leading-none font-semibold text-foreground">
                    {name}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {role}
                  </span>
                  <div className="flex gap-0.5">
                    {social.linkedin && (
                      <Button
                        nativeButton={false}
                        variant="secondary"
                        size="icon-sm"
                        render={
                          <a
                            href={social.linkedin}
                            aria-label={`${name} on LinkedIn`}
                          />
                        }
                      >
                        <RiLinkedinLine className="size-4 text-muted-foreground transition-colors hover:text-foreground" />
                      </Button>
                    )}
                    {social.twitter && (
                      <Button
                        nativeButton={false}
                        variant="secondary"
                        size="icon-sm"
                        render={
                          <a
                            href={social.twitter}
                            aria-label={`${name} on X`}
                          />
                        }
                      >
                        <RiTwitterXLine className="size-4 text-muted-foreground transition-colors hover:text-foreground" />
                      </Button>
                    )}
                    {social.github && (
                      <Button
                        nativeButton={false}
                        variant="secondary"
                        size="icon-sm"
                        render={
                          <a
                            href={social.github}
                            aria-label={`${name} on GitHub`}
                          />
                        }
                      >
                        <RiGithubLine className="size-4 text-muted-foreground transition-colors hover:text-foreground" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {bio}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
