import { createSelector } from "../../store/store.hooks";
import type { DataTableState } from "../dataTableStore.types";

export const createDataTableSelector = createSelector<DataTableState>();
