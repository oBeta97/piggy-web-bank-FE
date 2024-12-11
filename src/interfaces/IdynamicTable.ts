export interface IdynamicTableRow<R extends string[]> {
    columns: R,
    elementId?: string | number
}

export interface IdynamicTable<R extends string[]> {
    tableTitles?: IdynamicTableRow<R>,
    tableRows?: IdynamicTableRow<R>[],
    onContentTableClick?:JSX.Element
}
