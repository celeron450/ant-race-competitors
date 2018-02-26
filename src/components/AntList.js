import React, {Component} from 'react'
import {Container, Header, Table, Button, Segment} from 'semantic-ui-react'

import Ant from './Ant'

function generateAntWinLikelihoodCalculator() {
    var delay = 7000 + Math.random() * 7000;
    var likelihoodOfAntWinning = Math.random();

    return function (callback) {
        setTimeout(function () {
            callback(likelihoodOfAntWinning);
        }, delay);
    };
}

class AntList extends Component {
    constructor(props) {
        super(props)

        // Set initial state to data from Relay
        this.state = {
            ants: props.ants.map((ant, index) => {
                return {
                    id: index,
                    name: ant.name,
                    length: ant.length,
                    color: ant.color,
                    weight: ant.weight,
                    oddsStarted: false,
                    oddsResult: null
                }
            })
        }

        this.calculateOdds = this.calculateOdds.bind(this)
    }

    calculateOdds() {
        const self = this

        // Reset odds for all ants
        this.setState({
            ants: this.state.ants.map((ant) => {
                ant.oddsStarted = true
                ant.oddsResult = null
                return ant
            })
        })

        // Calculate win likelihood for each ant
        this.state.ants.forEach(function (ant) {
            generateAntWinLikelihoodCalculator()(function (likelihoodOfAntWinning) {
                const ants = self.state.ants.slice()
                const foundAnt = self.state.ants.find((findAnt) => {
                    return findAnt.id === ant.id
                })
                foundAnt.oddsResult = likelihoodOfAntWinning

                // Sort by descending win likelihood as results are calculated
                ants.sort((a, b) => {
                    return b.oddsResult - a.oddsResult
                })
                self.setState({
                    ants: ants
                })
            })
        })
    }

    calculationNotYetRun() {
        return this.state.ants.reduce((started, ant) => {
            return !started && !ant.oddsStarted
        }, false)
    }

    calculationInProgress() {
        return this.state.ants.reduce((inProgress, ant) => {
            return inProgress || ant.oddsResult === null
        }, false)
    }

    calculationStatus() {
        if (this.calculationNotYetRun()) {
            return 'Not yet run'
        }
        if (this.calculationInProgress()) {
            return 'In progress'
        }
        return 'All calculated'
    }

    render() {
        const button = <Button primary onClick={this.calculateOdds}>Calculate Odds</Button>
        const disabledButton = <Button primary disabled onClick={this.calculateOdds}>Calculation In Progress</Button>
        return (
            <Container>
                <Header as='h1'>Ant Race Competitors</Header>
                {!this.calculationNotYetRun() && this.calculationInProgress() ? disabledButton : button}
                <Segment><strong>Calculation Status:</strong> {this.calculationStatus()}</Segment>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Length</Table.HeaderCell>
                            <Table.HeaderCell>Color</Table.HeaderCell>
                            <Table.HeaderCell>Weight</Table.HeaderCell>
                            <Table.HeaderCell>Odds</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.ants.map((ant) => {
                            return <Ant key={ant.id} ant={ant}/>
                        })}
                    </Table.Body>
                </Table>
            </Container>
        )
    }
}

export default AntList
