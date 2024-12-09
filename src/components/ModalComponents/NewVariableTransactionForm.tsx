import { Button, Checkbox, FormControlLabel, MenuItem, Stack, TextField } from "@mui/material";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from "react";
import { getTransactionsCategories } from "../../modules/fetches/VariableTransactionCategories";
import { isFetchError } from "../../modules/TypeGuard";
import { useDispatch } from "react-redux";
import { dispatchBackgroundChange } from "../../modules/dispatches/BackgroundChange";
import { ItransactionCategory } from "../../interfaces/ItransactionCategory";
import dayjs from "dayjs";
import { createVariableTransaction } from "../../modules/fetches/VariableTransactions";
import { IvariableTransaction, IvariableTransactionDTO } from "../../interfaces/Itransaction";
import { hideModal } from "../../redux/action/modal";
import { IfetchError } from "../../interfaces/IfetchError";


const NewVariableTransactionForm = () => {

    const [transactionCategories, setTransactionCategories] = useState<ItransactionCategory[] | null>(null);

    const [name, setName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false)

    const [amount, setAmount] = useState<number>(0);
    const [amountError, setAmountError] = useState<boolean>(false);

    const [transactionDt, setTransactionDt] = useState<dayjs.Dayjs>(dayjs());
    const [transactionDtError, setTransactionDtError] = useState<boolean>(false);

    const [categoryId, setCategoryId] = useState<number>(0);
    const [categoryIdError, setCategoryIdError] = useState<boolean>(false);

    const [isExpense, setIsExpense] = useState<boolean>(true);



    const dispatch = useDispatch();

    const getCategories = async (): Promise<void> => {
        const res = await getTransactionsCategories();

        if (isFetchError(res))
            dispatchBackgroundChange(dispatch, true, res.message);

        setTransactionCategories(res as ItransactionCategory[])
    }

    useEffect(() => {
        getCategories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const checkFormValues = (): void => {

        setCategoryIdError(false);
        setAmountError(false);
        setTransactionDtError(false)

        if (amount === 0)
            dispatchBackgroundChange(dispatch, true, 'Amount can\'t be zero!', setAmountError);

        if (categoryId === 0)
            dispatchBackgroundChange(dispatch, true, 'Select a transaction type!', setCategoryIdError);

        if (transactionDt.isAfter(dayjs()))
            dispatchBackgroundChange(dispatch, true, 'Transaction can\'t be in the future!', setTransactionDtError);

    }

    const checkErrors = (res:IfetchError | IvariableTransaction) =>{
        if (isFetchError(res)) {
            switch (true) {
                case res.message.toLowerCase().includes('name'):
                    dispatchBackgroundChange(dispatch, true, res.message, setNameError)
                    break;
                case res.message.toLowerCase().includes('amount'):
                    dispatchBackgroundChange(dispatch, true, res.message, setAmountError)
                    break;
                case res.message.toLowerCase().includes('date time'):
                    dispatchBackgroundChange(dispatch, true, res.message, setTransactionDtError)
                    break;
                case res.message.toLowerCase().includes('category'):
                    dispatchBackgroundChange(dispatch, true, res.message, setCategoryIdError)
                    break;
            }
        }
    }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        checkFormValues()

        const transactionToSend: IvariableTransactionDTO = {
            name: name,
            amount: Number(isExpense ? "-" + amount : "+" + amount),
            transactionDt: transactionDt.toISOString(),
            transactionCategory_id: categoryId
        }

        const res = await createVariableTransaction(transactionToSend);

        checkErrors(res);

        dispatchBackgroundChange(dispatch, false, 'Transaction added!')

        dispatch(hideModal())

    }

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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker
                    value={transactionDt}
                    onChange={(e) => setTransactionDt(e ? e : dayjs())}
                    label="Transaction date time"
                    slotProps={{
                        textField: {
                            color: 'secondary',
                            focused: true,
                            fullWidth: true,
                            error: transactionDtError
                        },
                    }}

                />
            </LocalizationProvider>

            <TextField
                select
                label="Transaction type"
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                fullWidth
                focused
                variant="outlined"
                required
                error={categoryIdError}
            >
                {
                    transactionCategories ?
                        transactionCategories
                            .filter(tc => tc.isExpense === isExpense)
                            .map(tc => (
                                <MenuItem key={`${tc.id} - ${tc.name}`} value={tc.id}>{tc.name}</MenuItem>
                            ))
                        :
                        <MenuItem />
                }
            </TextField>
            <FormControlLabel
                label="Expense"
                sx={{ justifyContent: 'center' }}
                control={
                    <Checkbox
                        color="secondary"
                        checked={isExpense}
                        onChange={(e) => setIsExpense(e.target.checked)} />
                }
            />

            <Button type="submit" color="secondary" variant="contained">+</Button>
        </Stack>
    );
}

export default NewVariableTransactionForm;