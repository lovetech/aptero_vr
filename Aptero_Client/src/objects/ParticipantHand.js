import React from 'react';
import {View, asset} from 'react-360';
import Entity from 'Entity';

import {NativeModules} from 'react-360';
const {ControllersModule} = NativeModules;
import {browserBridge} from '../BrowserBridge';

export default class ParticipantHand extends React.Component<{ id: string, startVisible: boolean}, {
    visible: boolean,
    position: [],
    quaternion: [],
}> {
    state = {
        visible: this.props.startVisible,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
    };

    handId = -1;

    componentDidMount(): void {
        this.handId = this.props.handId;
        browserBridge.onEvent("setHandTransform",(data) => {
            if(data.handId===this.handId) {
                this.setTransform(data.position, data.rotation);
            }
        });
    }

    setTransform(position, rotation) {
        this.setState({position: position, rotation: rotation});
    }

    setVisible(state: boolean) {
        this.setState({visible: state});
    }

    render() {
        return (
            <View>
                {this.state.visible &&
                <Entity
                    source={{
                        obj: asset('hand.obj'),
                        mtl: asset('hand.mtl')
                    }}
                    lit={true}
                    style={{
                        transform: [
                            {translate: this.state.position},
                            {rotateX: this.state.rotation[0]},
                            {rotateY: this.state.rotation[1]},
                            {rotateZ: this.state.rotation[2]},
                            {scale: 0.01}
                        ]
                    }}
                />
                }
            </View>
        );
    }
}