import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    PanResponder,
    Dimensions
} from 'react-native';
import randomColor from 'randomcolor'

const { width, height } = Dimensions.get('screen')

const DrawRandomShapeScreen = () => {
    const dataStyleAll = [1, 2, 3]
    const urls = ['http://www.colourlovers.com/api/colors/random?format=json',
        'http://www.colourlovers.com/api/patterns/random?format=json']
    const [listArt, setListArt] = useState([])
    const [listArtPosition, setListArtPosition] = useState([])
    let isTap = 0

    useEffect(() => {
        console.log("ITEM : " + JSON.stringify(listArtPosition[listArtPosition.length-1]))
    }, [listArtPosition])

    useEffect(() => {
        listArtPosition.forEach((item, index) => {
            listArt.push(
                (listArtPosition[index].styleShape == 1 ?
                    <View key={index} style={{
                        width: item.size,
                        height: item.size,
                        borderRadius: item.size / 2,
                        backgroundColor: `${item.color}`,
                        position: 'absolute',
                        top: item.y - (item.size / 2),
                        left: item.x - (item.size / 2),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} />
                    : listArtPosition[index].styleShape == 2 ?
                        <ImageBackground source={{ uri: item.pattern }} key={index} style={{
                            width: item.size,
                            height: item.size,
                            backgroundColor: `${item.color}`,
                            position: 'absolute',
                            top: item.y - (item.size / 2),
                            left: item.x - (item.size / 2),
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} />
                        : <View key={index} style={{
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
                        }} />))
        })

        setListArt([listArt])
    }, [listArtPosition])

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
            console.log("RANDOM x: " + JSON.stringify(event.nativeEvent.locationX))
            console.log("RANDOM y: " + JSON.stringify(event.nativeEvent.locationY))
            _addArt(event.nativeEvent)
        }
    }), [])

    _addArt = (e) => {
        isTap++
        let type = dataStyleAll[Math.floor(Math.random() * dataStyleAll.length)]
        clearTimeout(this.doubleTap);
        this.doubleTap = setTimeout(() => {
            if (isTap == 1) {
                isTap = 0
                    if (type === 1) {
                        async function getStyleCircle() {
                            let url = 'http://www.colourlovers.com/api/colors/random?format=json';
                            await (fetch(url)
                                .then((res) => res.json())
                                .then((response) => {
                                    console.log("COLOR: ", '#' + response[0].hex)
                                    setListArtPosition([...listArtPosition, {
                                        x: e.locationX,
                                        y: e.locationY,
                                        styleShape: type,
                                        size: _randomSize(),
                                        color: '#' + response[0].hex
                                    }])
                                })
                                .catch((err) => {
                                    console.log(err)
                                    setListArtPosition([...listArtPosition, {
                                        x: e.locationX,
                                        y: e.locationY,
                                        styleShape: type,
                                        size: _randomSize(),
                                        color: `${_randomColor()}`,
                                    }])
                                }))
                        }
                        getStyleCircle()
                    }
                    if(type === 2) {
                        async function getStyleSquare() {
                            let url = 'http://www.colourlovers.com/api/patterns/random?format=json';
                            await (fetch(url)
                                .then((res) => res.json())
                                .then((response) => {
                                    console.log("PATTERN: ", response[0].imageUrl)
                                    setListArtPosition([...listArtPosition, {
                                        x: e.locationX,
                                        y: e.locationY,
                                        styleShape: type,
                                        pattern: response[0].imageUrl,
                                        size: _randomSize(),
                                        color: "transparent",
                                    }])
                                })
                                .catch((err) => {
                                    console.log(err)
                                    setListArtPosition([...listArtPosition, {
                                        x: e.locationX,
                                        y: e.locationY,
                                        styleShape: type,
                                        pattern: 'transparent',
                                        size: _randomSize(),
                                        color: `${_randomColor()}`,
                                    }])
                                }))
                        }
                        getStyleSquare()
                    }
                if (type == 3) {
                    async function getStyleTriangle() {
                        let url = 'http://www.colourlovers.com/api/colors/random?format=json';
                        await (fetch(url)
                            .then((res) => res.json())
                            .then((response) => {
                                console.log("PATTERN: ", response[0].imageUrl)
                                setListArtPosition([...listArtPosition, {
                                    x: e.locationX,
                                    y: e.locationY,
                                    styleShape: type,
                                    size: _randomSize(),
                                    color: '#' + response[0].hex,
                                }])
                            })
                            .catch((err) => {
                                console.log(err)
                                setListArtPosition([...listArtPosition, {
                                    x: e.locationX,
                                    y: e.locationY,
                                    styleShape: type,
                                    size: _randomSize(),
                                    color: `${_randomColor()}`,
                                }])
                            }))
                    }
                    getStyleTriangle()
                }
        
            
            } else {
                isTap = 0
                //double tap
                console.log("TAP")
                _changeStyleWithArt(e)
            }
        }, 300);

    }

    _changeStyleWithArt = (e) => {
        var indexChange = -1
        listArtPosition.forEach((item, index) => {
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
        let list = [...listArtPosition]

        if (indexChange != -1) {
            let item = listArtPosition[indexChange]
            // item.color = _randomColor()
            if(item.styleShape === 1){
                async function getChangeCircle() {
                    let url = 'http://www.colourlovers.com/api/colors/random?format=json';
                    await (fetch(url)
                        .then((res) => res.json())
                        .then((response) => {
                            console.log("NEW COLOR: ", '#' + response[0].hex)
                            item.color = '#' + response[0].hex
                            list[indexChange] = item
                            setListArtPosition(list)
                        })
                        .catch((err) => {
                            console.log(err)
                            item.color = _randomColor()
                            list[indexChange] = item
                            setListArtPosition(list)
                        }))
                }
                getChangeCircle()
            }
            if (item.styleShape === 2) {
                async function getChangeSquare() {
                    let url = 'http://www.colourlovers.com/api/patterns/random?format=json';
                    await (fetch(url)
                        .then((res) => res.json())
                        .then((response) => {
                            console.log("PATTERN: ", response[0].imageUrl)
                            item.color = '#D9D9D9'
                            item.pattern = response[0].imageUrl
                            list[indexChange] = item
                            setListArtPosition(list)
                        })
                        .catch((err) => {
                            console.log(err)
                            item.color = `${_randomColor()}`
                            item.pattern = 'transparent'
                            list[indexChange] = item
                            setListArtPosition(list)
                        }))
                }
                getChangeSquare()
            }
            if (item.styleShape === 3) {
                async function getChangeTriangle() {
                    let url = 'http://www.colourlovers.com/api/colors/random?format=json';
                    await (fetch(url)
                        .then((res) => res.json())
                        .then((response) => {
                            console.log("NEW COLOR: ", '#' + response[0].hex)
                            item.color = '#' + response[0].hex
                            list[indexChange] = item
                            setListArtPosition(list)
                        })
                        .catch((err) => {
                            console.log(err)
                            item.color = _randomColor()
                            list[indexChange] = item
                            setListArtPosition(list)
                        }))
                }
                getChangeTriangle()
            }
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
            {listArt}

            <View
                {...panResponder.panHandlers}
                style={{ height: height, backgroundColor: 'transparent', width: width, position: 'absolute', top: 0, left: 0 }}>
            </View>
        </View>
    );
};

export default DrawRandomShapeScreen;
