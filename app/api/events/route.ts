import { db } from "@/database";
import { events } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_URL } from '@/config/env';

// Inisialisasi Cloudinary menggunakan URL dari env
cloudinary.config({
    cloudinary_url: CLOUDINARY_URL
});

export async function GET() {
    try {
        const allEvents = await db.select().from(events).orderBy(desc(events.created_at));
        return NextResponse.json({ message: 'Get all data events', data: allEvents }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to fetch events" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        // Konversi FormData ke objek plain untuk Drizzle
        const eventData = Object.fromEntries(formData.entries());

        const title = eventData.title;

        // validasi
        if(!title || typeof title !== 'string') {
            return NextResponse.json({message: "Title is required and must be string"}, {status: 400});
        }

        // Validasi ivent title duplicat
        const existingTitleEvent = await db.select().from(events).where(eq(events.title, title)).limit(1);
        if(existingTitleEvent.length > 0) {
            return NextResponse.json({message: "Event with this title already exists"}, {status: 409});
        }

        const file = formData.get('image') as File | null;

        if (!file || file.size === 0) return NextResponse.json({ message: 'Image file is required' }, { status: 400 });

        // confert file ke buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Proses upload stream ke Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { 
                    folder: "DevIvent",
                    resource_type: "auto"
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        // Masukkan URL hasil upload ke data event
        eventData.image = (uploadResult).secure_url;

        // Simpan ke database menggunakan Drizzle
        const [insertedEvent] = await db.insert(events).values(eventData as typeof events.$inferInsert).returning();

        return NextResponse.json({
            message: 'Event created successfully',
            event: insertedEvent
        }, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Created data failed', error: e instanceof Error ? e.message : 'Unknown' }, { status: 500 });
    }
}