import { db } from "@/database";
import { events } from "@/database/schema";
import { generateSlug } from "@/lib/slug";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
    params: Promise<{ slug: string }>
}

// GET api/events/[slug]
export async function GET(_req: NextRequest, { params }: RouteParams) {
    try {
        const { slug } = await params;

        if (!slug || typeof slug !== "string" || slug.trim() === "") {
            return NextResponse.json({ message: "Invalid slug or parameter" }, { status: 400 });
        };

        const sanitizedSlug = generateSlug(slug);

        const allEvents = await db.select().from(events);
        const event = allEvents.find((item) => generateSlug(item.title) === sanitizedSlug);

        if (!event) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Get event detail",
            event: {
                ...event,
                slug: generateSlug(event.title),
            },
        }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: "Failed to fetch event detail" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
    try {
        const { slug } = await params;

        if (!slug || slug.trim() === "") {
            return NextResponse.json(
                { message: "Invalid slug" },
                { status: 400 }
            );
        }

        const sanitizedSlug = generateSlug(slug);

        const allEvents = await db.select().from(events);

        const existingEvent = allEvents.find(
            (event) => generateSlug(event.title) === sanitizedSlug
        );

        if (!existingEvent) return NextResponse.json({ message: "Event not devine" }, { status: 400 });

        const body = await req.json();

        const updateData = {
            title: body.title,
            overview: body.overview,
            venue: body.venue,
            location: body.location,
            date: body.date,
            time: body.time,
            mode: body.mode,
            audience: body.audience,
            agenda: body.agenda,
            organizer: body.organizer,
            tags: body.tags,
            updated_at: new Date(),
        };

        const [updatedEvent] = await db.update(events).set(updateData).where(eq(events.id, existingEvent.id)).returning();

        return NextResponse.json({}, {});
    } catch (e) {

    }
}