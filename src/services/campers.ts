import { api } from "./api";
import type {
  BookingRequest,
  BookingResponse,
  CamperDetails,
  CamperFilters,
  CamperReview,
  CampersQueryParams,
  CampersResponse,
} from "@/types/camper";

export async function getCampers(params: CampersQueryParams = {}) {
  const response = await api.get<CampersResponse>("/campers", {
    params,
  });

  return response.data;
}

export async function getCamperById(camperId: string) {
  const response = await api.get<CamperDetails>(`/campers/${camperId}`);

  return response.data;
}

export async function getCamperReviews(camperId: string) {
  const response = await api.get<CamperReview[]>(
    `/campers/${camperId}/reviews`
  );

  return response.data;
}

export async function getCamperFilters() {
  const response = await api.get<CamperFilters>("/campers/filters");

  return response.data;
}

export async function createBookingRequest(
  camperId: string,
  data: BookingRequest
) {
  const response = await api.post<BookingResponse>(
    `/campers/${camperId}/booking-requests`,
    data
  );

  return response.data;
}