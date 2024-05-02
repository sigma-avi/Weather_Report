import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import { geoDbOptions,GEODB_API_URL } from '../../api';
  

export const fetchLocations = createAsyncThunk("locations",async(value)=>{
    const res= await fetch(`${GEODB_API_URL}/cities?minPopulation=10&namePrefix=${value}`,
    geoDbOptions);
    const data= await res.json();
    console.log(data)
    return data.data;

})



export const STATUSES= Object.freeze({
    IDLE:'idle',
    ERROR:'error',
    LOADING:"loading",
});

const initialState={
    data:[],
    status:STATUSES.IDLE,
    locationDetail:[],

}

const locationSlice=createSlice({
    name:"locationSlice",
    initialState,
    reducers:{
        getLocationDetail(state,action){
            state.locationDetail.splice(0,0,action.payload)
        }
    },

    extraReducers:(builder)=>{
        builder
        .addCase(fetchLocations.pending,(state)=>{
            state.status=STATUSES.LOADING
        })
        .addCase(fetchLocations.fulfilled,(state,action)=>{
            state.data=action.payload;
            state.status=STATUSES.IDLE
        })
        .addCase(fetchLocations.rejected,(state)=>{
            state.status=STATUSES.ERROR
        })
    }
})


export default locationSlice.reducer;;
export const {getLocationDetail} = locationSlice.actions