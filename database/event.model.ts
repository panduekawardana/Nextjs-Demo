import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: 'online' | 'offline' | 'hybrid';
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, 'Overview is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
    },
    mode: {
      type: String,
      enum: ['online', 'offline', 'hybrid'],
      required: [true, 'Mode is required'],
      lowercase: true,
    },
    audience: {
      type: String,
      required: [true, 'Audience is required'],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, 'Agenda is required'],
      validate: {
        validator: (v: string[]) => v && v.length > 0,
        message: 'Agenda must contain at least one item',
      },
    },
    organizer: {
      type: String,
      required: [true, 'Organizer is required'],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, 'Tags are required'],
      validate: {
        validator: (v: string[]) => v && v.length > 0,
        message: 'Tags must contain at least one item',
      },
    },
  },
  { timestamps: true }
);

// Auto-generate slug from title only if title changes
eventSchema.pre<IEvent>('save', async function () {
  // Only regenerate slug if title is modified
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  // Normalize date to ISO format (YYYY-MM-DD)
  if (this.isModified('date')) {
    const dateObj = new Date(this.date);
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date format');
    }
    this.date = dateObj.toISOString().split('T')[0];
  }

  // Normalize time to HH:mm format
  if (this.isModified('time')) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(this.time)) {
      throw new Error('Time must be in HH:mm format');
    }
  }

  if (!this.title?.trim()) {
    throw new Error('Title cannot be empty');
  }
  if (!this.description?.trim()) {
    throw new Error('Description cannot be empty');
  }
  if (!this.overview?.trim()) {
    throw new Error('Overview cannot be empty');
  }
  if (!this.venue?.trim()) {
    throw new Error('Venue cannot be empty');
  }
  if (!this.location?.trim()) {
    throw new Error('Location cannot be empty');
  }
  if (!this.audience?.trim()) {
    throw new Error('Audience cannot be empty');
  }
  if (!this.organizer?.trim()) {
    throw new Error('Organizer cannot be empty');
  }
});

// Create unique index on slug
eventSchema.index({ slug: 1 }, { unique: true, sparse: true });

const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);

export default Event;
