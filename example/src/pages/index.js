import React from 'react'
import { Collapse } from '../../../src/index.js'

export default class extends React.Component {
    render() {
        const { Panel } = Collapse
        return (
            <div>
                折叠面板
                <Collapse>
                    <Panel header="This is panel header 1"> A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
    as a welcome guest in many households across the world.</Panel>
                    <Panel header="This is panel header 1"> A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
    as a welcome guest in many households across the world.</Panel>
                    <Panel header="This is panel header 1" disabled={true}> A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
    as a welcome guest in many households across the world.</Panel>
                </Collapse>
            </div>
        )
    }
}