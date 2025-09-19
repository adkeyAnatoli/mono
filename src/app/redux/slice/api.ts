import { IRoot, IGame, IPayment, IProvider } from "@/app/utils/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dataAPI = createApi({
  reducerPath: "dataAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.adkey-seo.com/api/website/",
  }),
  endpoints: (builder) => ({
    getRootData: builder.query<IRoot, string>({
      query: () => `get-website/334`,
    }),
    getGamesData: builder.query<IGame[], string>({
      query: () => `get-games/gambling`,
    }),
    getPaymentsData: builder.query<IPayment[], string>({
      query: () => `get-payments/334`,
    }),
    getProvidersData: builder.query<IProvider[], string>({
      query: () => `get-providers/`,
    }),
  }),
});

export const {
  useGetRootDataQuery,
  useGetGamesDataQuery,
  useGetPaymentsDataQuery,
  useGetProvidersDataQuery,
} = dataAPI;
