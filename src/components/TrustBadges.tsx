"use client";

import { Shield, FileCheck, Wrench, Clock, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TrustBadge {
  icon: React.ElementType;
  label: string;
  variant?: "default" | "secondary" | "outline";
}

const badges: TrustBadge[] = [
  { icon: Shield, label: "Jamstvo 12 mj.", variant: "default" },
  { icon: FileCheck, label: "Provjereno", variant: "secondary" },
];

interface TrustBadgesProps {
  size?: "sm" | "md";
}

export default function TrustBadges({ size = "sm" }: TrustBadgesProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {badges.map((badge) => {
        const Icon = badge.icon;
        return (
          <Badge
            key={badge.label}
            variant={badge.variant}
            className={`gap-1 ${
              size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"
            }`}
          >
            <Icon className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
            {badge.label}
          </Badge>
        );
      })}
    </div>
  );
}

// Detailed trust section for homepage or about page
export function TrustSection() {
  const trustPoints = [
    {
      icon: Shield,
      title: "Jamstvo kvalitete",
      description:
        "Svako vozilo prolazi detaljnu inspekciju od 150+ točaka provjere.",
    },
    {
      icon: FileCheck,
      title: "Transparentna povijest",
      description: "Potpuna dokumentacija i servisna knjižica dostupni odmah.",
    },
    {
      icon: Wrench,
      title: "Servisirana vozila",
      description:
        "Sva vozila su servisirana i pripremljena za sigurnu vožnju.",
    },
    {
      icon: Clock,
      title: "30 dana zamjene",
      description: "Niste zadovoljni? Zamijenite vozilo unutar 30 dana.",
    },
    {
      icon: Award,
      title: "10+ godina iskustva",
      description: "Više od 500 zadovoljnih kupaca i rastući broj preporuka.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trustPoints.map((point) => {
        const Icon = point.icon;
        return (
          <div
            key={point.title}
            className="flex gap-4 p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-shadow"
          >
            <div className="shrink-0 w-12 h-12 rounded-lg bg-accent/10 dark:bg-accent/20 flex items-center justify-center">
              <Icon className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                {point.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {point.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
