import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    PanResponder,
    Dimensions
} from 'react-native';
import randomColor from 'randomcolor'

const { width, height } = Dimensions.get('screen')

const DrawSquareScreen = () => {

    const [listSquare, setListSquare] = useState([])
    const [listSquarePosition, setListSquarePosition] = useState([])
    let isTap = 0

    useEffect(() => {
        listSquarePosition.forEach((item, index) => {
            listSquare.push(<View key={index} style={{
                width: item.size,
                height: item.size,
                backgroundColor: `${item.color}`,
                position: 'absolute',
                top: item.y - (item.size / 2),
                left: item.x - (item.size / 2),
                justifyContent: 'center',
                alignItems: 'center'
            }} />)
        })

        setListSquare([listSquare])
    }, [listSquarePosition])

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
            console.log("SQUARE x: " + JSON.stringify(event.nativeEvent.locationX))
            console.log("SQUARE y: " + JSON.stringify(event.nativeEvent.locationY))
            _addSquare(event.nativeEvent)
        }
    }), [])

    _addSquare = (e) => {
        isTap++
        clearTimeout(this.doubleTap);
        this.doubleTap = setTimeout(() => {
            if (isTap == 1) {
                isTap = 0
                setListSquarePosition([...listSquarePosition, {
                    x: e.locationX,
                    y: e.locationY,
                    size: _randomSize(),
                    color: `${_randomColor()}`
                }])
            } else {
                isTap = 0
                //double tap
                console.log("TAP")
                _randomColorWithSquare(e)
            }
        }, 200);

        // setListSquarePosition([...listSquarePosition, {
        // x: e.locationX,
        // y: e.locationY,
        // size: _randomSize(),
        // color: `${_randomColor()}`
        // }])
    }

    _randomColorWithSquare = (e) => {
        var indexChange = -1
        listSquarePosition.forEach((item, index) => {
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
            let item = listSquarePosition[indexChange]
            item.color = _randomColor()
            let list = [...listSquarePosition]
            list[indexChange] = item
            setListSquarePosition(list)
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
            {listSquare}

            <View
                {...panResponder.panHandlers}
                style={{ height: height, backgroundColor: 'transparent', width: width, position: 'absolute', top: 0, left: 0 }}>
            </View>
        </View>
    );
};

export default DrawSquareScreen;