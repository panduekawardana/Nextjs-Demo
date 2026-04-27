import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();

        let event;

        try {
            event = Object.fromEntries(formData.entries());
        } catch (error) {
            console.error(error);
            return NextResponse.json({
                message: 'Invalid JSON data format'
            }, { status: 400 })
        }

        const createIvent = await Event.create(event);

        return NextResponse.json({ message: 'Event created successfuly', event: createIvent, status: 201 });

    } catch (e) {
        console.error(e)
        return NextResponse.json({ message: 'Event creation Failed', error: e instanceof Error ? e.message : 'Unknown' }, { status: 400 })
    }
}