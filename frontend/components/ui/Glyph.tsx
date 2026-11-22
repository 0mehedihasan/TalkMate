import {
  MessageCircle, Phone, AudioLines, Layers, MessagesSquare, Drama, Crown, Scale, Image as ImageIcon, GalleryVerticalEnd,
  Users, Palette, Home, Sun, Moon, Coffee, Utensils, PawPrint, Hash, Shirt, HeartPulse, CloudSun, MapPin, Bus, Plane, Train,
  Smile, Briefcase, School, ShoppingBag, Hotel, Stethoscope, Music, Leaf, Globe, Laptop, Dumbbell, Car, BookOpen, Clock,
  Calendar, Hand, Gift, Building2, Film, Trophy, Baby, Ticket, Landmark, Scroll, Sword, Feather, Brain, Sparkles, type LucideIcon,
} from "lucide-react";
import type { ModeId } from "@/lib/modes";

// TalkMate shows no emoji in its interface. Content rows still carry an `emoji` field (it is
// data in ContentItem), but the screens draw a line icon picked from the title instead.

export const MODE_ICON: Record<ModeId, LucideIcon> = {
  chat: MessageCircle, call: Phone, sentence: AudioLines, word: Layers, dialogue: MessagesSquare,
  roleplay: Drama, characters: Crown, debate: Scale, photo: ImageIcon, flashcards: GalleryVerticalEnd,
};

// First keyword found in the title wins; order goes from specific to general.
const KEYWORDS: [RegExp, LucideIcon][] = [
  [/greet|hello|introduc|meet/i, Hand], [/famil|parent|child|baby/i, Baby], [/people|friend|social|party/i, Users],
  [/colou?r|art|paint/i, Palette], [/home|house|room|apartment/i, Home], [/day|morning|sun/i, Sun], [/night|sleep/i, Moon],
  [/drink|coffee|tea|caf/i, Coffee], [/food|eat|restaurant|cook|order|meal|menu/i, Utensils], [/animal|pet|dog|cat/i, PawPrint],
  [/number|count|math/i, Hash], [/cloth|wear|fashion/i, Shirt], [/body|health|doctor|pharm|hospital/i, Stethoscope],
  [/feel|emotion|mood/i, Smile], [/weather|season|rain/i, CloudSun], [/place|city|direction|where/i, MapPin],
  [/airport|flight|plane|fly/i, Plane], [/train|station|metro/i, Train], [/bus|taxi|transport/i, Bus], [/car|driv/i, Car],
  [/hotel|check.?in|book a room/i, Hotel], [/travel|trip|holiday|vacation|abroad/i, Globe], [/job|work|office|interview|career|coworker|business|meeting/i, Briefcase],
  [/school|class|study|universit|student|teacher/i, School], [/shop|store|buy|market|price|clothes/i, ShoppingBag],
  [/music|song|sing/i, Music], [/nature|plant|environment|climate|tree/i, Leaf], [/tech|computer|internet|phone|social media|ai\b/i, Laptop],
  [/sport|gym|exercise|fit/i, Dumbbell], [/book|read|story/i, BookOpen], [/time|clock|hour/i, Clock], [/date|calendar|week|month/i, Calendar],
  [/gift|birthday|celebrat/i, Gift], [/bank|money|pay/i, Landmark], [/movie|film|tv|cinema/i, Film], [/game|win|compet/i, Trophy],
  [/ticket|event|concert/i, Ticket], [/heart|love|date/i, HeartPulse], [/city|build/i, Building2], [/histor|ancient|king|queen|empire/i, Scroll],
  [/myth|god|goddess|legend/i, Sparkles], [/war|battle|fight/i, Sword], [/poet|write|author/i, Feather], [/think|mind|idea|philosoph/i, Brain],
];

export function iconFor(text: string | undefined, mode?: ModeId): LucideIcon {
  if (text) for (const [re, icon] of KEYWORDS) if (re.test(text)) return icon;
  return mode ? MODE_ICON[mode] : Sparkles;
}

// Four quiet tints from the brand family, picked by a stable hash of the id so a grid is varied but calm.
const TINTS = [
  "from-brand-800/70 to-surface-2 text-brand-200",
  "from-brand-900 to-surface-2 text-brand-300",
  "from-surface-3 to-surface text-brand-200",
  "from-brand-700/50 to-surface-2 text-brand-100",
];
export function tintFor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return TINTS[h % TINTS.length];
}

/** Fills its parent: a calm tinted surface with a line icon. Used wherever a picture is missing. */
export function CoverFallback({ seed, title, mode, size = 40, className = "" }: {
  seed: string; title?: string; mode?: ModeId; size?: number; className?: string;
}) {
  const Icon = iconFor(title, mode);
  return (
    <div aria-hidden="true" className={`flex items-center justify-center bg-gradient-to-br ${/(^|\s)h-/.test(className) ? "" : "h-full w-full"} ${tintFor(seed)} ${className}`}>
      <Icon size={size} strokeWidth={1.5} />
    </div>
  );
}

/** A small square icon tile (lists, rows, avatars). */
export function IconTile({ seed, title, mode, size = 40, rounded = "rounded-xl" }: {
  seed: string; title?: string; mode?: ModeId; size?: number; rounded?: string;
}) {
  const Icon = iconFor(title, mode);
  return (
    <span aria-hidden="true" style={{ width: size, height: size }}
      className={`flex shrink-0 items-center justify-center bg-gradient-to-br ${tintFor(seed)} ${rounded}`}>
      <Icon size={Math.round(size * 0.48)} strokeWidth={1.75} />
    </span>
  );
}
