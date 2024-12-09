import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { IdynamicTable } from "../../interfaces/IdynamicTable";
import { useSelector } from "react-redux";
import { Istore } from "../../redux/store";

const DynamicTable = <R extends string[]>(props: IdynamicTable<R>) => {

    const userCurrency = useSelector((store: Istore) => store.userCharacteristc.currency);

    const isAmount = (val: string): boolean => {

        return (
            !isNaN(Number(val.substring(0, val.length - 1).trim())) &&
            val.substring(val.length - 1) === userCurrency
        );
    }

    const getAmountStyle = (amountString: string) => {

        const amountNumber = Number(amountString.substring(amountString.length - 1));

        return (
            <Typography color={amountNumber >= 0 ? "green" : "red"}>
                {amountString}
            </Typography>
        )

    }


    return (
        <TableContainer>
            <Table size="small" aria-label="a dense table" sx={{ my: '1em', width: '95%', mx: 'auto' }}>
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
                                            <TableCell key={"c" + i} align="center">{
                                                isAmount(col) ?
                                                    getAmountStyle(col) :
                                                    col
                                            }</TableCell>
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