import {createFeatureSelector, createSelector} from "@ngrx/store";
import {MiscStore} from "./misc.reducer";

const feature = createFeatureSelector<MiscStore>("misc")


export const selector_config = createSelector(feature, state => state.config)
