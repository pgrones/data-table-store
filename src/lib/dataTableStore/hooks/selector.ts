import { createSelector } from "../../store/store.hooks";
import type { DataTableEntity, DataTableState } from "../dataTableStore.types";

export const createDataTableSelector =
  createSelector<DataTableState<DataTableEntity>>();
