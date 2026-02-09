import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Event {
    event_date_id: number;
    event_id: number;
    event_title: string;
    event_date: string; // e.g., "2022-02-24" logic might differ based on API
    event_start_time: string;
    event_end_time: string;
    event_price_from: number;
    event_price_to: number;
    readable_from_date: string; // "24.02.2022"
    readable_to_date: string; // "26.02.2022"
    city_name: string;
    country_name: string;
    keywords: string[]; // e.g. ["Workshop", "Bachata"]
    event_profile_img: string;
    isFavorite?: boolean; // locally managed UI state helper but mainly store IDs
}

interface FavoritesState {
    items: Event[];
}

const initialState: FavoritesState = {
    items: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<Event>) => {
            const existingIndex = state.items.findIndex(
                (item) => item.event_date_id === action.payload.event_date_id
            );
            if (existingIndex >= 0) {
                state.items.splice(existingIndex, 1);
            } else {
                state.items.push(action.payload);
            }
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
