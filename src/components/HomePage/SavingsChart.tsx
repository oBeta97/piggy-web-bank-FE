import { LineChart, lineElementClasses, markElementClasses } from '@mui/x-charts/LineChart';
import { PRIMARY_COLOR, SECONDARY_COLOR, WHITE_COLOR } from '../../modules/Colors';
import { useEffect, useRef, useState } from 'react';
import { getMontHistory } from '../../modules/fetches/MonthHistory';
import { isFetchError } from '../../modules/TypeGuard';
import { useDispatch } from 'react-redux';
import { dispatchBackgroundChange } from '../../modules/dispatches/BackgroundChange';
import { Ipage } from '../../interfaces/Ipage';
import { ImonthHistory } from '../../interfaces/ImonthHistory';

const SavingsChart = () => {
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState(
        {
            width: 0,
            height: 0,
        }
    );
    const [xLabels, setXLabels] = useState<string[]>([]);
    const [serie, setSerie] = useState<number[]>([]);

    const dispatch = useDispatch();

    const getMonthHistory = async (): Promise<void> => {
        const mh = await getMontHistory(0, 50);

        if (isFetchError(mh))
            dispatchBackgroundChange(dispatch, true, mh.message);

        // sorting mh based on the month
        (mh as Ipage<ImonthHistory>).content = (mh as Ipage<ImonthHistory>).content.sort((a, b) => {
            if (a.year === b.year) {
                return a.month - b.month;
            }
            return a.year - b.year;
        });


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
    
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setDimensions({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        });
    
        const containerElement = containerRef.current; // Salva il valore corrente di containerRef.current
    
        if (containerElement) {
            observer.observe(containerElement);
        }
    
        return () => {
            if (containerElement) { // Usa il valore salvato
                observer.unobserve(containerElement);
            }
            observer.disconnect();
        };
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    return (
        <div
            ref={containerRef}
            style={{width:'100%', aspectRatio:'1', boxSizing: 'border-box',}}
        >
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
                width={dimensions.width}
                height={dimensions.height}
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
        </div>

    );
};

export default SavingsChart;
