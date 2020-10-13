import React from "react";
import { VictoryPie,VictoryBar } from "victory";
import {VictoryLabel} from "victory-core";
import {VictorySharedEvents} from "victory-shared-events";

function GamesPieChart(props) {
    //TODO ver de reutilizar el piechart y que tenga distintos "ejes"
    const [cancelled,finished,newGames,onGoing] = props.data ? [props.data.gamesCanceled + 1, props.data.gamesFinished + 1,props.data.gamesNew + 1,props.data.gamesOnGoing + 1] : [1,1,1,1]
    //TODO sacar esos mas 1 estan hardcodeados porque sino back solo devuelve 0's
    return (
        <div>
            <svg viewBox="0 0 850 350">
                <VictorySharedEvents
                    events={[{
                        childName: ["pie", "bar"],
                        target: "data",
                        eventHandlers: {
                            onMouseOver: () => {
                                return [{
                                    childName: ["pie", "bar"],
                                    mutation: (props) => {
                                        return {
                                            style: Object.assign({}, props.style, {fill: "gold"})
                                        };
                                    }
                                }];
                            },
                            onMouseOut: () => {
                                return [{
                                    childName: ["pie", "bar"],
                                    mutation: () => {
                                        return null;
                                    }
                                }];
                            }
                        }
                    }]}
                >
                    <g transform={"translate(250, 50)"}>
                        <VictoryBar name="bar"
                                    width={300}
                                    standalone={false}
                                    colorScale={"qualitative"}
                                    style={{
                                        data: { width: 20, fill: "navy"},
                                        labels: {fontSize: 10}
                                    }}
                                    data={[
                                        {x: "Cancelled", y: cancelled}, {x: "Finished", y: finished}, {x: "New Games", y: newGames}, {x: "On Going", y: onGoing}
                                    ]}
                                    labels={["Cancelled", "Finished", "New Games", "On Going"]}
                                    labelComponent={<VictoryLabel y={290}/>}
                        />
                    </g>
                    <g transform={"translate(0, -100)"}>
                        <VictoryPie name="pie"
                                    width={250}
                                    colorScale={"qualitative"}
                                    standalone={false}
                                    style={{ labels: {fontSize: 10, padding: 10}}}
                                    data={[
                                        {x: "Cancelled", y: cancelled}, {x: "Finished", y: finished}, {x: "New Games", y: newGames}, {x: "On Going", y: onGoing}
                                    ]}
                        />
                    </g>
                </VictorySharedEvents>
            </svg>
        </div>
        );
};
export default GamesPieChart;