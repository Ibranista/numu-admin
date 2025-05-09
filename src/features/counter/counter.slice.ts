import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface counterState {
    value: number;
};

export const initialState: counterState = {
    value: 0,
}

const reducers = {
    // increment
    incremented(state: counterState) {
        state.value++;
    },

    amountAdded(state: counterState, action: PayloadAction<number>) {
        state.value += action.payload
    },

    // decrement

    // reset
}

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers
});

export const { incremented, amountAdded } = counterSlice.actions;
export default counterSlice.reducer; 