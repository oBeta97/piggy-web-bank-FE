import { Button, MenuItem, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { dispatchBackgroundChange } from "../../modules/dispatches/BackgroundChange";
import { useDispatch, useSelector } from "react-redux";
import { IfixedTransaction, IfixedTransactionDTO } from "../../interfaces/IfixedTransaction";
import { addNewFixedTransactions, getFixedTransaction, updateFixedTransactions } from "../../modules/fetches/FixedTransactions";
import { userCharacteristicsFetch } from "../../modules/dispatches/UserCharacteristics";
import { hideModal } from "../../redux/action/modal";
import { IselectedRow, resetSelectedDynamicTableRow } from "../../redux/action/dynamicTable";
import { IfetchError } from "../../interfaces/IfetchError";
import { isFetchError } from "../../modules/TypeGuard";
import { Istore } from "../../redux/store";

interface IfixedTransactionProps {
    isUpdate?: boolean
}


const FixedTransactionForm = (props: IfixedTransactionProps) => {

    const [name, setName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false)

    const [amount, setAmount] = useState<number>(0);
    const [amountError, setAmountError] = useState<boolean>(false);

    const [period, setPeriod] = useState<number>(0);
    const [periodError, setPeriodError] = useState<boolean>(false);

    const location = useLocation();
    const dispatch = useDispatch();

    const selectedDynamicTableRow: IselectedRow = useSelector((store: Istore) => store.selectedDynamicTableRow)


    useEffect(() => {
        if (props.isUpdate)
            setFormField()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setFormField = async (): Promise<void> => {

        const transaction = await getFixedTransaction(selectedDynamicTableRow.rowElementId as number);

        checkErrors(transaction);

        setName((transaction as IfixedTransaction).name);
        setAmount(Math.abs((transaction as IfixedTransaction).amount));
        setPeriod((transaction as IfixedTransaction).period);
    }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()

        checkFormValues();

        const newFixedTransaction: IfixedTransactionDTO = {
            name: name,
            amount: (location.pathname.includes('income') ? amount : amount * -1),
            period: period
        }

        const res =
            props.isUpdate ?
                await updateFixedTransactions(selectedDynamicTableRow.rowElementId as number, newFixedTransaction) :
                await addNewFixedTransactions(newFixedTransaction);

        checkErrors(res);

        dispatchBackgroundChange(dispatch, false, `Transaction inserted!`)
        userCharacteristicsFetch(dispatch);
        dispatch(hideModal());
        dispatch(resetSelectedDynamicTableRow());

    }

    const checkErrors = (res: IfetchError | IfixedTransactionDTO) => {
        if (isFetchError(res)) {
            switch (true) {
                case res.message.toLowerCase().includes('name'):
                    dispatchBackgroundChange(dispatch, true, res.message, setNameError);
                    break;
                case res.message.toLowerCase().includes('amount'):
                    dispatchBackgroundChange(dispatch, true, res.message, setAmountError);
                    break;
                case res.message.toLowerCase().includes('period'):
                    dispatchBackgroundChange(dispatch, true, res.message, setPeriodError);
                    break;
                default:
                    dispatchBackgroundChange(dispatch, true, res.message);
            }
        }
    }

    const checkFormValues = (): void => {

        setNameError(false);
        setAmountError(false);
        setPeriodError(false);

        if (name === "")
            dispatchBackgroundChange(dispatch, true, 'Transaction Name must be set!', setNameError);

        if (amount <= 0)
            dispatchBackgroundChange(dispatch, true, 'Amount can\'t be zero or negative!', setAmountError);

        if (period === 0)
            dispatchBackgroundChange(dispatch, true, 'Select a transaction type!', setPeriodError);
    }



    interface TransactionOption {
        value: number;
        description: string;
    };

    const fixedTransactionMontlyOption: TransactionOption[] = [
        {
            value: 1,
            description: 'monthly'
        },
        {
            value: 3,
            description: 'quarterly'
        },
        {
            value: 12,
            description: 'annual'
        },
        {
            value: 24,
            description: 'biannual'
        },
    ];


    return (

        <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit}
            sx={{ my: '2em', }}
        >
            <TextField
                id="name"
                label="Name"
                focused
                required
                color="secondary"
                value={name}
                error={nameError}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                id="amount"
                label="Amount"
                focused
                color="secondary"
                type="number"
                slotProps={{
                    htmlInput: {
                        step: 0.5,
                    },
                }}
                required
                value={amount}
                error={amountError}
                onChange={(e) => setAmount(Number(e.target.value))}
            />

            <TextField
                select
                label="Monthly"
                fullWidth
                focused
                variant="outlined"
                required
                value={period}
                onChange={(e) => setPeriod(Number(e.target.value))}
                error={periodError}
            >
                {
                    fixedTransactionMontlyOption.map(option => (
                        <MenuItem key={`${option.value} - ${option.description}`} value={option.value}>
                            {option.description}
                        </MenuItem>
                    ))
                }
            </TextField>

            <Button type="submit" color="secondary" variant="contained">
                +
            </Button>
        </Stack>

    );
}

export default FixedTransactionForm;