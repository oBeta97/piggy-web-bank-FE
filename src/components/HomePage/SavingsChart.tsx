import { LineChart, lineElementClasses, markElementClasses } from '@mui/x-charts/LineChart';
import { PRIMARY_COLOR, SECONDARY_COLOR, WHITE_COLOR } from '../../modules/Colors';
import { useEffect, useState } from 'react';
import { getMontHistory } from '../../modules/fetches/MonthHistory';
import { isFetchError } from '../../modules/TypeGuard';
import { useDispatch } from 'react-redux';
import { dispatchBackgroundChange } from '../../modules/dispatches/BackgroundChange';
import { Ipage } from '../../interfaces/Ipage';
import { ImonthHistory } from '../../interfaces/ImonthHistory';

const SavingsChart = () => {
    const [xLabels, setXLabels] = useState<string[]>([]); 
    const [serie, setSerie] = useState<number[]>([]); 

    const dispatch = useDispatch();

    const getMonthHistory = async (): Promise<void> => {
        const mh = await getMontHistory(0, 50);

        if (isFetchError(mh))
            dispatchBackgroundChange(dispatch, true, mh.message);

        const xAxisLabels = (mh as Ipage<ImonthHistory>).content.map(
            (month) => `${month.month}-${month.year}`
        );
        const graphSerie = (mh as Ipage<ImonthHistory>).content.map((month) =>
            Number(month.totSavings.toFixed(2))
        );

        setXLabels(xAxisLabels);
        setSerie(graphSerie);
    };

    useEffect(() => {
        getMonthHistory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <LineChart
            xAxis={[
                {
                    data: serie.map((_, index) => index), 
                    valueFormatter: (value) => xLabels[value] || '', 
                },
            ]}
            series={[
                {
                    data: serie,
                },
            ]}
            width={425}
            height={350}
            sx={{
                [`& .${lineElementClasses.root}`]: {
                    stroke: SECONDARY_COLOR,
                    strokeWidth: 2,
                },
                [`& .${markElementClasses.root}`]: {
                    stroke: PRIMARY_COLOR,
                    scale: '0.8',
                    fill: WHITE_COLOR,
                    strokeWidth: 3,
                },
            }}
        />
    );
};

export default SavingsChart;
