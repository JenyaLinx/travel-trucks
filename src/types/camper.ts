export type CamperAmenity = string;

export type CamperListItem = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  amenities: CamperAmenity[];
  coverImage: string;
  totalReviews: number;
};

export type CamperImage = {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
};

export type CamperDetails = CamperListItem & {
  description: string;
  gallery: CamperImage[];
  createdAt: string;
  updatedAt: string;
};

export type CamperReview = {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
};

export type CampersResponse = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: CamperListItem[];
};

export type CamperFilters = {
  forms: string[];
  transmissions: string[];
  engines: string[];
};

export type CampersQueryParams = {
  page?: number;
  perPage?: number;
  location?: string;
  form?: string;
  engine?: string;
  transmission?: string;
};

export type BookingRequest = {
  name: string;
  email: string;
};

export type BookingResponse = {
  message: string;
};