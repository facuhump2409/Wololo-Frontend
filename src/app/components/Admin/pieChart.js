import {VictoryPie} from "victory";
import React from "react";

export default function PieChart(props){
    console.log("SELECTED",props.selectedUser)
    const gamesWon = props.selectedUser ? props.selectedUser[0].stats.gamesWon + 1 : 1
    const gamesLost = props.selectedUser ? props.selectedUser[0].stats.gamesLost + 1 : 1
    //TODO ver esos 1 de manejar cuando no tienen valor
    return(
        <VictoryPie name="pie"
                    width={550}
                    height={250}
                    colorScale={"qualitative"}
                    style={{ labels: {fontSize: 10, padding: 10}}}
                    data={[
                        {x: "Won: " + gamesWon, y: gamesWon}, {x: "Lost: " + gamesLost, y: gamesLost}
                    ]}
        />
    )
}