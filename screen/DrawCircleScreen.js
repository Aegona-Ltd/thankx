import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    PanResponder,
    Dimensions
} from 'react-native';
import randomColor from 'randomcolor'

const { width, height } = Dimensions.get('screen')

const DrawCircleScreen = () => {

    const [listCircle, setListCircle] = useState([])
    const [listCirclePosition, setListCirclePosition] = useState([])
    let isTap = 0

    useEffect(() => {
        listCirclePosition.forEach((item, index) => {
            listCircle.push(<View key={index} style={{
                width: item.size,
                height: item.size,
                borderRadius: item.size / 2,
                backgroundColor: `${item.color}`,
                position: 'absolute',
                top: item.y - (item.size / 2),
                left: item.x - (item.size / 2),
                justifyContent: 'center',
                alignItems: 'center'
            }} />)
        })

        setListCircle([listCircle])
    }, [listCirclePosition])

    const panResponder = React.useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: (event, gestureState) => true,
        onStartShouldSetPanResponderCapture: (event, gestureState) => true,
        onMoveShouldSetPanResponder: (event, gestureState) => false,
        onMoveShouldSetPanResponderCapture: (event, gestureState) => false,
        onPanResponderGrant: (event, gestureState) => false,
        onPanResponderMove: (event, gestureState) => false,
        onPanResponderRelease: (event, gestureState) => {
            // setLocationX(event.nativeEvent.locationX.toFixed(2))
            // setLocationY(event.nativeEvent.locationY.toFixed(2))
            console.log("CIRCLE x: " + JSON.stringify(event.nativeEvent.locationX))
            console.log("CIRCLE y: " + JSON.stringify(event.nativeEvent.locationY))
            _addCircle(event.nativeEvent)
        }
    }), [])

    _addCircle = (e) => {
        isTap++
        clearTimeout(this.doubleTap);
        this.doubleTap = setTimeout(() => {
            if (isTap == 1) {
                isTap = 0
                setListCirclePosition([...listCirclePosition, {
                    x: e.locationX,
                    y: e.locationY,
                    size: _randomSize(),
                    color: `${_randomColor()}`
                }])
            } else {
                isTap = 0
                //double tap
                console.log("TAP")
                _randomColorWithCircle(e)
            }
        }, 200);

        // setListCirclePosition([...listCirclePosition, {
        // x: e.locationX,
        // y: e.locationY,
        // size: _randomSize(),
        // color: `${_randomColor()}`
        // }])
    }

    _randomColorWithCircle = (e) => {
        var indexChange = -1
        listCirclePosition.forEach((item, index) => {
            let maxX = item.x + (item.size / 2)
            let minX = item.x - (item.size / 2)

            let maxY = item.y + (item.size / 2)
            let minY = item.y - (item.size / 2)

            if (e.locationX > minX && e.locationX < maxX) {
                if (e.locationY > minY && e.locationY < maxY) {
                    indexChange = index
                }
            }
        })

        if (indexChange != -1) {
            let item = listCirclePosition[indexChange]
            item.color = _randomColor()
            let list = [...listCirclePosition]
            list[indexChange] = item
            setListCirclePosition(list)
        }
    }

    _randomColor = () => {
        return randomColor()
    }

    _randomSize = () => {
        let mW = (width * 40) / 100
        let nW = (width * 10) / 100
        return Math.floor(Math.random() * mW + nW)
    }

    return (
        <View

            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* <Text>Device name : {deviceName}</Text>
 <Text>Device model : {deviceModel}</Text>
 <Text>Device mac address : {deviceMacAddress}</Text> */}
            {listCircle}

            <View
                {...panResponder.panHandlers}
                style={{ height: height, backgroundColor: 'transparent', width: width, position: 'absolute', top: 0, left: 0 }}>
            </View>
        </View>
    );
};

export default DrawCircleScreen;