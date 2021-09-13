import { createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';
import { Flight } from '@flight-workspace/flight-lib';

export const flightBookingFeatureKey = 'flightBooking';

export interface FlightBookingAppState {
  [flightBookingFeatureKey]: State;
}

export interface State {
  flights: Flight[];
  negativeList: number[];
}

export const initialState: State = {
  flights: [],
  negativeList: [3]
};

export const reducer = createReducer(
  initialState,

  on(FlightBookingActions.flightsLoaded, (state, action): State => {
    const flights = action.flights;
    return { ...state, flights };
  }),

  on(FlightBookingActions.updateFlight, (state, action): State => {
    const flight = action.flight;
    const flights = state.flights.map((f) => (f.id === flight.id ? flight : f));
    return { ...state, flights };
  })
);