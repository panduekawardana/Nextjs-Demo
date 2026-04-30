import BookEvent from "@/components/BookEvent";
import { NEXT_PUBLIC_BASE_URL } from "@/config/env";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const unstable_instant = { prefetch: "static" };

type EventDetailData = {
  id: string;
  title: string;
  slug: string;
  overview: string;
  description?: string | null;
  image: string;
  venue: string;
  location: string;
  date: string | null;
  time: string | null;
  mode: string | null;
  audience: string;
  agenda: string | null;
  organizer: string | null;
  tags: string | null;
  created_at: string;
  updated_at: string | null;
};

type DetailItemProps = {
  icon: string;
  alt: string;
  label: string;
  value: string | null | undefined;
};

const formatValue = (value: string | null | undefined) => value || "-";

const formatDate = (value: string | null | undefined) => {
  if (!value) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
};

const booking: number = 10;

const formatTime = (value: string | null | undefined) => {
  if (!value) return "-";

  return value.slice(0, 5);
};

const DetailItem = ({ icon, alt, label, value }: DetailItemProps) => (
  <div className="flex flex-row items-start gap-3 rounded-md border border-dark-200 bg-dark-100/70 px-4 py-3">
    <Image src={icon} alt={alt} width={18} height={18} className="mt-1" />
    <div className="flex flex-col gap-1">
      <span className="text-light-200 text-sm">{label}</span>
      <p className="text-base font-semibold">{formatValue(value)}</p>
    </div>
  </div>
);

const EventDetailFallback = () => (
  <main id="event">
    <div className="mb-8 h-5 w-24 rounded-md bg-dark-200" />

    <section className="header">
      <div className="flex flex-row flex-wrap gap-3">
        <span className="pill">Loading</span>
        <span className="pill">Event</span>
      </div>
      <div className="h-14 w-full max-w-3xl rounded-md bg-dark-200" />
      <div className="h-6 w-full max-w-2xl rounded-md bg-dark-200" />
    </section>

    <section className="details">
      <div className="content">
        <div className="banner min-h-[320px] bg-dark-200" />
        <div className="flex-col-gap-2">
          <div className="h-8 w-40 rounded-md bg-dark-200" />
          <div className="h-6 w-full rounded-md bg-dark-200" />
          <div className="h-6 w-4/5 rounded-md bg-dark-200" />
        </div>
      </div>

      <aside className="booking space-y-4">
        <div className="signup-card">
          <div className="h-8 w-44 rounded-md bg-dark-200" />
          <div className="h-5 w-full rounded-md bg-dark-200" />
          <div className="h-10 w-full rounded-md bg-dark-200" />
        </div>
      </aside>
    </section>
  </main>
);

const EventDetailContent = async ({ slug }: { slug: string }) => {
  const baseUrl = NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/events/${slug}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch event detail");
  }

  const { event }: { event: EventDetailData } = await response.json();
  const description = event.description || event.overview;

  return (
    <main id="event">
      <Link href="/" className="text-light-200 mb-8 w-fit text-sm hover:text-primary">
        Back to events
      </Link>

      <section className="header">
        <div className="flex flex-row flex-wrap gap-3">
          <span className="pill">{formatValue(event.tags)}</span>
          <span className="pill">{formatValue(event.mode)}</span>
          <span className="pill">{formatValue(event.agenda)}</span>
        </div>
        <h1>{event.title}</h1>
        <p>{description}</p>
      </section>

      <section className="details">
        <div className="content">
          <Image
            src={event.image}
            alt={event.title}
            width={1200}
            height={675}
            className="banner"
            priority
          />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{event.overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <DetailItem icon="/icons/calendar.svg" alt="calendar" label="Date" value={formatDate(event.date)} />
              <DetailItem icon="/icons/clock.svg" alt="clock" label="Time" value={formatTime(event.time)} />
              <DetailItem icon="/icons/pin.svg" alt="location" label="Location" value={event.location} />
              <DetailItem icon="/icons/mode.svg" alt="mode" label="Mode" value={event.mode} />
              <DetailItem icon="/icons/audience.svg" alt="audience" label="Audience" value={event.audience} />
              <DetailItem icon="/icons/pin.svg" alt="venue" label="Venue" value={event.venue} />
            </div>
          </section>
        </div>

        <aside className="booking space-y-4">
          <div className="signup-card">
            <div className="flex-col-gap-2">
              <h2>Book Your Spot</h2>
              <p>{event.title}</p>
            </div>

            <div className="flex-col-gap-2">
              <p>Organizer: {formatValue(event.organizer)}</p>
              <p>Slug: {event.slug}</p>
              <p>Created: {formatDate(event.created_at)}</p>
            </div>
            <div>
              {
                booking > 0 ? (
                  <p className="text-sm text-yellow-500">Join {booking} people who have already booked their spot!</p>
                ) : (<p className="text-sm">Be the first to book your spot</p>)
              }

              <BookEvent/>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
};

const EventDetailPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  return (
    <Suspense fallback={<EventDetailFallback />}>
      {params.then(({ slug }) => (
        <EventDetailContent slug={slug} />
      ))}
    </Suspense>
  );
};

export default EventDetailPage;
