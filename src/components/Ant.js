import React from 'react'
import {Table, Label} from 'semantic-ui-react'

function Ant(props) {
    let status;
    if (!props.ant.oddsStarted) {
        status = 'Not yet run'
    } else if (props.ant.oddsResult === null) {
        status = 'In progress'
    } else {
        status = `${Math.round(props.ant.oddsResult * 10000) / 100}%`
    }

    const colorText = props.ant.color.charAt(0).toUpperCase() + props.ant.color.slice(1).toLowerCase()
    const labelColor = [
        'red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'
    ].indexOf(props.ant.color.toLowerCase()) !== -1 ? props.ant.color.toLowerCase() : 'grey'

    return (
        <Table.Row>
            <Table.Cell>{props.ant.name}</Table.Cell>
            <Table.Cell>{props.ant.length}</Table.Cell>
            <Table.Cell><Label color={labelColor}>{colorText}</Label></Table.Cell>
            <Table.Cell>{props.ant.weight}</Table.Cell>
            <Table.Cell>{status}</Table.Cell>
        </Table.Row>
    )
}

export default Ant