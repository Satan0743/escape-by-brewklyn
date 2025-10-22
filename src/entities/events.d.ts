/**
 * Collection ID: events
 * Interface for Events
 */
export interface Events {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  eventName?: string;
  /** @wixFieldType date */
  eventDate?: Date | string;
  /** @wixFieldType time */
  eventTime?: any;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image */
  eventImage?: string;
  /** @wixFieldType boolean */
  isHappyHour?: boolean;
  /** @wixFieldType text */
  ctaText?: string;
  /** @wixFieldType url */
  ctaLink?: string;
}
