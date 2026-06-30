import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface AdventureCardProps {
  slug: string;
  title: string;
  destination: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  duration: string;
  difficulty: string;
  image: string;
}

export function AdventureCard({
  slug,
  title,
  destination,
  category,
  price,
  rating,
  reviewCount,
  duration,
  difficulty,
  image,
}: AdventureCardProps) {
  return (
    <Link
      href={`/adventures/${slug}`}
      className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium backdrop-blur">
          {category}
        </span>
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {destination}
        </p>
        <h3 className="mt-1 line-clamp-2 font-semibold leading-snug group-hover:text-primary">
          {title}
        </h3>
        <div className="mt-2 flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="font-medium">{rating}</span>
          <span className="text-muted-foreground">({reviewCount})</span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-lg font-bold">{formatPrice(price)}</p>
            <p className="text-xs text-muted-foreground">per person</p>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            <p>{duration}</p>
            <p>{difficulty}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
