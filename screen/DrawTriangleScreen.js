import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    PanResponder,
    Dimensions
} from 'react-native';
import randomColor from 'randomcolor'

const { width, height } = Dimensions.get('screen')

const DrawTriangleScreen = () => {

    const [listTriangle, setListTriangle] = useState([])
    const [listTrianglePosition, setListTrianglePosition] = useState([])
    const [locationX, setLocationX] = useState()
    const [locationY, setLocationY] = useState()
    let isTap = 0

    useEffect(() => {
        listTrianglePosition.forEach((item, index) => {
            listTriangle.push(<View key={index} style={{
                width: 0,
                height: 0,
                borderStyle: 'solid',
                backgroundColor: 'transparent',
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: `${item.color}`,
                position: 'absolute',
                borderLeftWidth: item.size / 2,
                borderRightWidth: item.size / 2,
                borderBottomWidth: item.size,
                top: item.y - (item.size / 2),
                left: item.x - (item.size / 2),
                justifyContent: 'center',
                alignItems: 'center'
            }} />)
        })

        setListTriangle([listTriangle])
    }, [listTrianglePosition])

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
            console.log("TRIANGLE x: " + JSON.stringify(event.nativeEvent.locationX))
            console.log("TRIANGLE y: " + JSON.stringify(event.nativeEvent.locationY))
            _addTriangle(event.nativeEvent)
        }
    }), [])

    _addTriangle = (e) => {
        isTap++
        clearTimeout(this.doubleTap);
        this.doubleTap = setTimeout(() => {
            if (isTap == 1) {
                isTap = 0
                setListTrianglePosition([...listTrianglePosition, {
                    x: e.locationX,
                    y: e.locationY,
                    size: _randomSize(),
                    color: `${_randomColor()}`
                }])
            } else {
                isTap = 0
                //double tap
                console.log("TAP")
                _randomColorWithTriangle(e)
            }
        }, 200);

        // setListTrianglePosition([...listTrianglePosition, {
        // x: e.locationX,
        // y: e.locationY,
        // size: _randomSize(),
        // color: `${_randomColor()}`
        // }])
    }

    _randomColorWithTriangle = (e) => {
        var indexChange = -1
        listTrianglePosition.forEach((item, index) => {
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
            let item = listTrianglePosition[indexChange]
            item.color = _randomColor()
            let list = [...listTrianglePosition]
            list[indexChange] = item
            setListTrianglePosition(list)
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
            {listTriangle}

            <View
                {...panResponder.panHandlers}
                style={{ height: height, backgroundColor: 'transparent', width: width, position: 'absolute', top: 0, left: 0 }}>
            </View>
        </View>
    );
};

export default DrawTriangleScreen;