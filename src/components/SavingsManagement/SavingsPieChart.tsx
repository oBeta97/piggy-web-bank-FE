import { PieChart } from '@mui/x-charts';
import { useEffect, useRef, useState } from 'react';
import { IsavingsManagementComponentProps } from '../../interfaces/IsavingsManagementComponentProps';
import { SECONDARY_COLOR, TEXT_COLOR, WARNING_COLOR } from '../../modules/Colors';

interface IchartData {
    id: number,
    value: number,
    label: string,
    color: string
}


const SavingsPieChart = (props: IsavingsManagementComponentProps) => {
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState(
        {
            width: 0,
            height: 0,
            innerRadius: 0,
            outerRadius: 0,
            cx: 0
        }
    );
    const [chartData, setChartData] = useState<IchartData[]>([]);

    const pieParams = {
        slotProps: { legend: { hidden: true } },
    };

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setDimensions({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                    innerRadius: Math.max(entry.contentRect.width / 5, 50),
                    outerRadius: Math.min(
                        entry.contentRect.width / 2,
                        entry.contentRect.height / 2,
                        Math.max(entry.contentRect.width / 3, 75)
                    ),
                    cx: entry.contentRect.width / 2,
                });
            }
        });
    
        const containerElement = containerRef.current; // Salva il valore corrente di containerRef.current
    
        if (containerElement) {
            observer.observe(containerElement);
        }
    
        chartInit();
    
        return () => {
            if (containerElement) { // Usa il valore salvato
                observer.unobserve(containerElement);
            }
            observer.disconnect();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);


    const chartInit = (): void => {

        const dailyAvailable = (props.summedFixedIncomes + props.summedFixedExpenses).toFixed(2);
        const dailyUsable = Number(dailyAvailable) - props.minimumSavings;



        setChartData([
            {
                id: 0,
                label: 'Usable',
                value: dailyUsable, 
                color: TEXT_COLOR,
            },

            {
                id: 1,
                label: 'Minimum savings',
                value: props.minimumSavings,
                color: SECONDARY_COLOR
            },

            {
                id: 2,
                label: 'Fixed expenses',
                value: Math.abs(props.summedFixedExpenses),
                color: WARNING_COLOR
            },
        ]);
    }


    return (
        <div
            ref={containerRef}
            style={{ width: '100%', boxSizing: 'border-box', aspectRatio:'1' }}
        >
            <PieChart
                series={[
                    {
                        data: chartData,
                        innerRadius: dimensions.innerRadius,
                        outerRadius: dimensions.outerRadius,
                        cx: dimensions.cx,
                        paddingAngle: 1,
                        cornerRadius: 3,
                        startAngle: 0,
                        endAngle: 360,
                    },
                ]}
                {...pieParams}
                width={dimensions.width}
                height={dimensions.height}
            />
        </div>
    );
};

export default SavingsPieChart;
