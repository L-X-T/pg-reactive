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
  isLoadingFlights: boolean;
  loadingFlightsError: string;
}

export const initialState: State = {
  flights: [],
  negativeList: [3],
  isLoadingFlights: false,
  loadingFlightsError: ''
};

export const reducer = createReducer(
  initialState,

  on(FlightBookingActions.loadFlights, (state, action): State => {
    return { ...state, flights: [], isLoadingFlights: true, loadingFlightsError: '' };
  }),

  on(FlightBookingActions.loadFlightsError, (state, action): State => {
    return { ...state, isLoadingFlights: false, loadingFlightsError: action.err.message };
  }),

  on(FlightBookingActions.loadFlightsSuccess, (state, action): State => {
    const flights = action.flights;
    const isLoadingFlights = false;
    return { ...state, flights, isLoadingFlights };
  }),

  on(FlightBookingActions.updateFlight, (state, action): State => {
    const flight = action.flight;
    const flights = state.flights.map((f) => (f.id === flight.id ? flight : f));
    return { ...state, flights };
  })
);
