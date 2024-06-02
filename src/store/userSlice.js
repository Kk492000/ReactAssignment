import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiConfig } from "../ApiConfig/apiConfig";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios({
      method: "GET",
      url: apiConfig.getUsers,
    });
    if (response?.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch Data");
    }
  } catch (error) {
    throw new Error("Failed to fetch Data");
  }
});

export const editUser = createAsyncThunk("users/editUser", async (user) => {
  const response = await axios.put(`${apiConfig.getUsers}/${user.id}`, user);
  return response.data;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await axios.delete(`${apiConfig.getUsers}/${id}`);
  return id;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
    favourites: [],
  },
  reducers: {
    toggleFavourite(state, action) {
      const userId = action.payload;
      console.log(state.favourites.includes(userId), "userIdd");
      if (state.favourites.includes(userId)) {
        state.favourites = state.favourites.filter((id) => id !== userId);
      } else {
        state.favourites.push(userId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        state.users[index] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export const { toggleFavourite } = userSlice.actions;

export default userSlice.reducer;
