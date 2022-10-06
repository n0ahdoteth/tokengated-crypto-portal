import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const cryptoNewsHeaders = {
    'X-BingApis-SDK': process.env.REACT_APP_BING_KEY,
    'X-RapidAPI-Key': process.env.REACT_APP_NEWS_KEY_1,
    'X-RapidAPI-Host': process.env.REACT_APP_NEWS_KEY_2,
}

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (url) => ({url, headers: cryptoNewsHeaders});

export const cryptoNewsApi = createApi({
    reducerPath: "cryptoNewsApi",
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        }),
    }),
});

export const {useGetCryptoNewsQuery} = cryptoNewsApi;