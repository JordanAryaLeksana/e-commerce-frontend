import axiosClient from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


interface Collaborator {
    name: string;
    email: string;
    loading?: boolean;
    role: "ecommerce_expert" | "supplier" | "influencer" | "developer";
}

interface CollaboratorsState {
    collaborators: Collaborator[];
    loading: boolean;
}
const initialState: CollaboratorsState = {
    collaborators: [],
    loading: false,
};
export const addCollaborator = createAsyncThunk(
    "collaborators/addCollaborator",
    async (formData: {name: string, email: string, role: string}) => {
        try {
           const response = await axiosClient.post("/collaborator/addCollaborator", formData)
            console.log("Collaborators fetched:", response.data);
            return response.data.collaborators;
        } catch (error) {
            console.error("Error fetching collaborators:", error);
            throw error;
        }
    })
const collabsSlice = createSlice({
    name: "collaborators",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCollaborator.pending, (state) => {
                console.log("Fetching collaborators...");
                // Optionally, you can set a loading state here
                state.loading = true;   
            })
            .addCase(addCollaborator.fulfilled, (state, action) => {
                console.log("Collaborators fetched successfully:", action.payload);
                state.loading = false;
                state.collaborators = action.payload;
            })
            .addCase(addCollaborator.rejected, (state, action) => {
                state.loading = false;

                console.error("Failed to fetch collaborators:", action.error.message);
              
            });
    }
})

export const { actions, reducer } = collabsSlice;
export default collabsSlice.reducer;