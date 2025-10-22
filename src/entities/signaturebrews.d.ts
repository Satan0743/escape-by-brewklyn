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
