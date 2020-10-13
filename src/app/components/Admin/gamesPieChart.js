import React from "react";
import { VictoryPie,VictoryBar } from "victory";
import {VictoryLabel} from "victory-core";
import {VictorySharedEvents} from "victory-shared-events";

function GamesPieChart(props) {
    console.log("data dentro de pie",props.data)
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
                    <g transform={"translate(150, 50)"}>
                        <VictoryBar name="bar"
                                    width={300}
                                    standalone={false}
                                    colorScale={"qualitative"}
                                    style={{
                                        data: { width: 20, fill: "navy"},
                                        labels: {fontSize: 10}
                                    }}
                                    data={[
                                        {x: "Cancelled", y: 2}, {x: "Finished", y: 3}, {x: "New Games", y: 5}, {x: "On Going", y: 4}
                                    ]}
                                    labels={["Cancelled", "Finished", "New Games", "On Going"]}
                                    labelComponent={<VictoryLabel y={290}/>}
                        />
                    </g>
                    <g transform={"translate(0, -75)"}>
                        <VictoryPie name="pie"
                                    width={250}
                                    colorScale={"qualitative"}
                                    standalone={false}
                                    style={{ labels: {fontSize: 10, padding: 10}}}
                                    data={[
                                        {x: "Cancelled", y: 1}, {x: "Finished", y: 4}, {x: "New Games", y: 5}, {x: "On Going", y: 7}
                                    ]}
                        />
                    </g>
                </VictorySharedEvents>
            </svg>
        </div>
        );
};
export default GamesPieChart;