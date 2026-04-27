import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      validate: {
        validator: (v: string) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(v);
        },
        message: 'Invalid email format',
      },
    },
  },
  { timestamps: true }
);

// Verify referenced event exists before saving booking
bookingSchema.pre<IBooking>('save', async function () {
  const Event = mongoose.model('Event');

  try {
    const eventExists = await Event.findById(this.eventId);

    if (!eventExists) {
      throw new Error('Referenced event does not exist');
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error validating event');
  };
});

// Index on eventId for efficient queries
bookingSchema.index({ eventId: 1 });

const Booking: Model<IBooking> =
  mongoose.models.Booking ||
  mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
