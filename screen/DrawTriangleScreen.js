import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
    PanResponder,
    Dimensions,
    Image
} from 'react-native';
import randomColor from 'randomcolor'

const { width, height } = Dimensions.get('screen')

const DrawTriangleScreen = () => {

    const urls = ['http://www.colourlovers.com/api/colors/random?format=json',
        'http://www.colourlovers.com/api/patterns/random?format=json']
    const [listTriangle, setListTriangle] = useState([])
    const [listTrianglePosition, setListTrianglePosition] = useState([])
    let isTap = 0

    useEffect(() => {
        listTrianglePosition.forEach((item, index) => {
            listTriangle.push(
                <View key={index} style={{
                    width: 0,
                    height: 0,
                    backgroundColor: 'transparent',
                    borderStyle: 'solid',
                    borderLeftWidth: item.size / 2,
                    borderRightWidth: item.size / 2,
                    borderBottomWidth: item.size,
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderBottomColor: `${item.color}`,
                    position: 'absolute',
                    top: item.y - (item.size / 2),
                    left: item.x - (item.size / 2),
                    justifyContent: 'center',
                    alignItems: 'center'
                }}/>
                
                /*<ImageBackground source={{ uri: item.pattern }} key={index} style={{
                width: item.size,
                height: item.size,
                backgroundColor: `${item.color}`,
                top: item.y - (item.size / 2),
                left: item.x - (item.size / 2),
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        width: 0,
                        height: 0,
                        backgroundColor: 'transparent',
                        borderStyle: 'solid',
                        borderRightWidth: item.size / 2,
                        borderTopWidth: item.size,
                        borderRightColor: 'transparent',
                        borderTopColor: '#fff'
                    }} />
                    <View style={{
                        width: 0,
                        height: 0,
                        backgroundColor: 'transparent',
                        borderStyle: 'solid',
                        borderLeftWidth: item.size / 2,
                        borderTopWidth: item.size,
                        borderLeftColor: 'transparent',
                        borderTopColor: '#fff'
                    }} />
                </View>
            </ImageBackground>*/
            )
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
                async function getStyle() {
                    // let url = urls[Math.floor(Math.random() * urls.length)]
                    let url ='http://www.colourlovers.com/api/colors/random?format=json'
                    await (fetch(url)
                        .then((res) => res.json())
                        .then((response) => {
                            if (url === 'http://www.colourlovers.com/api/colors/random?format=json') {
                                console.log("COLOR: ", "#" + response[0].hex)
                                setListTrianglePosition([...listTrianglePosition, {
                                    x: e.locationX,
                                    y: e.locationY,
                                    pattern: 'transparent',
                                    size: _randomSize(),
                                    color: "#" + response[0].hex,
                                }])
                            } else {
                                console.log("PATTERN: ", response[0].imageUrl)
                                setListTrianglePosition([...listTrianglePosition, {
                                    x: e.locationX,
                                    y: e.locationY,
                                    pattern: response[0].imageUrl,
                                    size: _randomSize(),
                                    color: 'transparent',
                                }])
                            }

                        })
                        .catch((err) => {
                            console.log(err)
                            setListTrianglePosition([...listTrianglePosition, {
                                x: e.locationX,
                                y: e.locationY,
                                pattern: 'transparent',
                                size: _randomSize(),
                                color: `${_randomColor()}`,
                            }])
                        }))
                }
                getStyle()
            } else {
                isTap = 0
                //double tap
                console.log("TAP")
                async function getNewStyle() {
                    let url = urls[Math.floor(Math.random() * urls.length)]
                    await (fetch(url)
                        .then((res) => res.json())
                        .then((response) => {
                            if (url === 'http://www.colourlovers.com/api/colors/random?format=json') {
                                console.log("COLOR: ", '#' + response[0].hex)
                                _changeStyleOfTriangle(e, 'transparent', '#' + response[0].hex)
                            } else {
                                console.log("PATTERN: ", response[0].imageUrl)
                                _changeStyleOfTriangle(e, response[0].imageUrl, '#D9D9D9')
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            _changeStyleOfTriangle(e, "transparent", `${_randomColor()}`)
                        }))
                }
                getNewStyle()
            }
        }, 300);
    }

    _changeStyleOfTriangle = (e) => {
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
            {listTriangle}
            <View
                {...panResponder.panHandlers}
                style={{ height: height, backgroundColor: 'transparent', width: width, position: 'absolute', top: 0, left: 0 }}>
            </View>
        </View>
    );
};

export default DrawTriangleScreen;