import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Key': process.env.REACT_APP_CRYPTO_KEY_1,
    'X-RapidAPI-Host': process.env.REACT_APP_CRYPTO_KEY_2,
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({url, headers: cryptoApiHeaders});

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
            mode: "no-cors",
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
            mode: "no-cors",
        }),
    }),
});

export const {useGetCryptosQuery, useGetCryptoDetailsQuery} = cryptoApi;
