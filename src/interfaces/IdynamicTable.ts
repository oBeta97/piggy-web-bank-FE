export interface IdynamicTableRow<R extends string[]> {
    columns: R,
}

export interface IdynamicTable<R extends string[]> {
    tableTitles?: IdynamicTableRow<R>,
    tableRows?: IdynamicTableRow<R>[]
}
