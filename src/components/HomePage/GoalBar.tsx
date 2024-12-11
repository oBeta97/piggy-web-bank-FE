import { Grid2, Typography } from "@mui/material";
import { BLACK_COLOR } from "../../modules/Colors";
import { useEffect, useState } from "react";
import { getGoals } from "../../modules/fetches/Goals";
import { Ipage } from "../../interfaces/Ipage";
import { Igoal } from "../../interfaces/Igoal";
import { calculateMonthsBetween } from "../../modules/Dates";
import { isFetchError } from "../../modules/TypeGuard";
import { useDispatch } from "react-redux";
import { dispatchBackgroundChange } from "../../modules/dispatches/BackgroundChange";

const GoalBar = () => {

    interface IgoalPercentage{
        name:string,
        remainingPercentage:number
    }

    const dispatch = useDispatch();
    const [goal, setGoal] = useState<IgoalPercentage|null>(null);

    useEffect(() => {
        getGoalToShow()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const getGoalToShow = async (): Promise<void> => {
        const goals = await getGoals();

        if(isFetchError(goals))
            dispatchBackgroundChange(dispatch,true,goals.message);


        const result = (goals as Ipage<Igoal>).content.reduce(
            (maxGoal, currentGoal) => {
                const totalMonths = calculateMonthsBetween(
                    currentGoal.goalDt,
                    currentGoal.experityDt
                );
                const elapsedMonths = calculateMonthsBetween(
                    currentGoal.goalDt,
                    new Date().toISOString()
                );

                const remainingPercentage = Math.max(
                    0,
                    (elapsedMonths / totalMonths) * 100
                );

                if (remainingPercentage >= maxGoal.remainingPercentage) {
                    return { name: currentGoal.name, remainingPercentage };
                }
                return maxGoal;
            },
            { name: "", remainingPercentage: 0 }
        );

        setGoal(result);
    };

    return (
        <Grid2 container sx={{ width: { xs: '98%', sm: '100%' }, height: '90%' }} justifyContent={"space-evenly"}>
            <Grid2 size={9} alignItems={"center"} justifyContent={"center"}>
                <Typography variant="h5" sx={{ textAlign: "start" }} fontWeight="bold" color={BLACK_COLOR} >
                    {goal?.name}
                </Typography>
            </Grid2>
            <Grid2 size={3} alignItems={"center"} justifyContent={"center"}>
                <Typography variant="h5" sx={{ textAlign: "end" }} fontWeight="bold" color={BLACK_COLOR}>
                    {goal?.remainingPercentage}%
                </Typography>
            </Grid2>
        </Grid2>
    );
}

export default GoalBar;