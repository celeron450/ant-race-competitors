import React, {Component} from 'react'
import {QueryRenderer, graphql} from 'react-relay'
import environment from '../Environment'

import AntList from './AntList'

const AntListDataQuery = graphql`
    query AntListDataQuery {
        ants {
            name
            length
            color
            weight
        }
    }
`

class AntListData extends Component {
    render() {
        return (
            <QueryRenderer
                environment={environment}
                query={AntListDataQuery}
                render={({error, props}) => {
                    if (error) {
                        return <div>{error.message}</div>
                    } else if (props) {
                        return <AntList ants={props.ants}/>
                    }
                    return <div>Loading</div>
                }}
            />
        )
    }
}

export default AntListData
