'use client';

import * as React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/** Internal default campaigns (edit freely). */
const DEFAULT_CAMPAIGNS = [
  {
    id: 'fest-offer',
    title: 'Festival Property Bonanza • Up to ₹50,000 Cashback',
    subtitle: 'Buy, Rent, Lease & Mortgage on verified listings',
    ctaText: 'Explore Offers',
    href: '/offers/fest',
    image: '/ads/adthree/1.jpeg',
    badge: 'Hot',
  },
  {
    id: 'home-loan',
    title: 'Home Loan Fast-Track',
    subtitle: 'Get pre-approved in 48 hrs with partner banks',
    ctaText: 'Check Eligibility',
    href: '/offers/loans',
    image: '/ads/adtwo/1.jpeg',
  },
  {
    id: 'become-owner',
    title: 'Lease to Own • Smart Plans',
    subtitle: 'Flexible lease options on premium projects',
    ctaText: 'See Plans',
    href: '/lease-to-own',
    image: '/ads/adone/1.jpeg',
    badge: 'New',
  },
] satisfies Array<{
  id: string;
  title: string;
  subtitle?: string;
  ctaText: string;
  href: string;
  image?: string;
  badge?: string;
  gradient?: string;
  paused?: boolean;
}>;

type Props = {
  campaigns?: typeof DEFAULT_CAMPAIGNS;
  rotateInterval?: number;
  showMinimizedDot?: boolean;
  bottom?: number;
  left?: number;
  zIndex?: number;
  storageKey?: string;
};

export default function FloatingPromo({
  campaigns = DEFAULT_CAMPAIGNS,
  rotateInterval = 6000,
  showMinimizedDot = true,
  bottom = 24,
  left = 24,
  zIndex = 50,
  storageKey = 'tr_floating_promo',
}: Props) {
  const [idx, setIdx] = React.useState(0);
  const [hiddenIds, setHiddenIds] = React.useState<string[]>([]);
  const [collapsed, setCollapsed] = React.useState(false);

  // Hydrate dismissed ids (SSR-safe)
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(`${storageKey}:dismissed`);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setHiddenIds(parsed);
    } catch {}
  }, [storageKey]);

  // Filter visible list
  const visible = React.useMemo(() => {
    const active = campaigns.filter((c) => !hiddenIds.includes(c.id) && !c.paused);
    if (active.length) return active;
    return campaigns.filter((c) => !hiddenIds.includes(c.id));
  }, [campaigns, hiddenIds]);

  // Nothing left → show tiny dot (if enabled)
  if (!visible.length) {
    if (!showMinimizedDot) return null;
    return (
      <button
        aria-label="Show promos"
        onClick={() => {
          setHiddenIds([]);
          if (typeof window !== 'undefined') {
            localStorage.removeItem(`${storageKey}:dismissed`);
          }
        }}
        style={{ position: 'fixed', bottom, left, zIndex }}
        className="h-12 w-12 rounded-2xl shadow-xl transition grid place-items-center
                   text-white bg-gradient-to-br from-emerald-600 to-lime-500 hover:brightness-110"
      >
        %
      </button>
    );
  }

  const current = visible[idx % visible.length];

  // Auto-rotate (SSR-safe)
  React.useEffect(() => {
    if (!rotateInterval || collapsed || visible.length <= 1) return;
    const t = window.setInterval(
      () => setIdx((i) => (i + 1) % visible.length),
      rotateInterval
    );
    return () => window.clearInterval(t);
  }, [rotateInterval, collapsed, visible.length]);

  const dismiss = (id: string) => {
    const next = Array.from(new Set([...hiddenIds, id]));
    setHiddenIds(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${storageKey}:dismissed`, JSON.stringify(next));
    }
  };

  return (
    <div style={{ position: 'fixed', bottom, left, zIndex }}>
      {collapsed ? (
        <button
          onClick={() => setCollapsed(false)}
          className="rounded-full px-4 py-2.5 text-sm font-medium shadow-xl
                     bg-foreground text-background hover:opacity-90 transition"
        >
          View Offers
        </button>
      ) : (
        <div className="relative w-[270px] rounded-2xl bg-card shadow-2xl border overflow-hidden">
          {/* Close → MINIMIZE (Alt/Option + Click to Dismiss) */}
          <button
            className="absolute right-2 top-2 h-8 w-8 grid place-items-center rounded-full
                       bg-black/40 text-white hover:bg-black/55"
            onClick={(e) => {
              if (e.altKey) {
                // Alt/Option + click = real dismiss (power user)
                dismiss(current.id);
              } else {
                // Normal click = minimize
                setCollapsed(true);
              }
            }}
            aria-label="Close"
            title="Click to minimize • Alt+Click to dismiss"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Media */}
          <div className="h-[180px] relative">
            {current.image ? (
              <img
                src={current.image}
                alt={current.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div
                className={
                  current.gradient ||
                  'h-full w-full bg-gradient-to-br from-emerald-600 to-lime-500'
                }
              />
            )}
            {current.badge && (
              <div className="absolute left-3 top-3 text-[11px] px-2 py-1 rounded-full bg-white/90 text-foreground font-semibold shadow">
                {current.badge}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-3 space-y-2">
            <div className="text-base font-semibold leading-tight">
              {current.title}
            </div>
            {current.subtitle && (
              <p className="text-xs text-muted-foreground">{current.subtitle}</p>
            )}

            <div className="flex items-center justify-between pt-2">
              <Button
                asChild
                size="sm"
                className="rounded-full bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-700 hover:to-lime-600 text-white"
              >
                <a href={current.href}>{current.ctaText}</a>
              </Button>

              {visible.length > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    className="h-8 w-8 grid place-items-center rounded-full hover:bg-muted"
                    onClick={() => setIdx((i) => (i - 1 + visible.length) % visible.length)}
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    className="h-8 w-8 grid place-items-center rounded-full hover:bg-muted"
                    onClick={() => setIdx((i) => (i + 1) % visible.length)}
                    aria-label="Next"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bigger Minimize button */}
          <div className="px-3 pb-3">
            <button
              className="text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full
                         bg-muted hover:bg-muted/80 transition"
              onClick={() => setCollapsed(true)}
            >
              Minimize
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
