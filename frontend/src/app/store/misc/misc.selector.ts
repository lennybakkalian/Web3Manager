import {createFeatureSelector, createSelector} from "@ngrx/store";
import {MiscStore} from "./misc.reducer";

const feature = createFeatureSelector<MiscStore>("misc")


export const selector_isLoggedIn = createSelector(feature, state => state.loggedIn)
