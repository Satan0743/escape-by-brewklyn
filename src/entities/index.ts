/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

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


/**
 * Collection ID: signaturebrews
 * Interface for SignatureBrews
 */
export interface SignatureBrews {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType image */
  beerImage?: string;
  /** @wixFieldType text */
  flavorDescription?: string;
  /** @wixFieldType url */
  detailsUrl?: string;
  /** @wixFieldType text */
  beerStyle?: string;
}
