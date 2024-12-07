import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { IdynamicTable } from "../../interfaces/IdynamicTable";

const DynamicTable = <R extends string[]>(props: IdynamicTable<R>) => {
    return (
        <TableContainer>
            <Table size="small" aria-label="a dense table" sx={{ my: '1em', width:'95%', mx:'auto' }}>
                {
                    props.tableTitles &&
                    <TableHead>
                        <TableRow>
                            {
                                props.tableTitles.columns.map(title => (
                                    <TableCell key={title} align="center">{title}</TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                }
                {
                    props.tableRows &&
                    <TableBody>
                        {
                            props.tableRows.map((row, i) => (
                                <TableRow
                                    key={"r" + i}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {
                                        row.columns.map((col, i) => (
                                            <TableCell key={"c" + i} align="center">{ col }</TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))
                        }
                    </TableBody>
                }
            </Table>
        </TableContainer>
    );
}

export default DynamicTable;