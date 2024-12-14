export interface IdynamicTableRow<R extends string[]> {
    columns: R,
    elementId?: string | number
    customStyle?: IcustomTableRowStyle
}

export interface IdynamicTable<R extends string[]> {
    tableTitles?: IdynamicTableRow<R>,
    tableRows?: IdynamicTableRow<R>[],
    onContentTableClick?:JSX.Element
}


export interface IcustomTableRowStyle{
    isNotAmount?:boolean
    textColor?: string
}