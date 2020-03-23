import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import DrawCircleScreen from '../screen/DrawCircleScreen'
import DrawSquareScreen from '../screen/DrawSquareScreen'
import DrawTriangleScreen from '../screen/DrawTriangleScreen'
import DrawRandomShapeScreen from '../screen/DrawRandomShapeScreen'

const AppNavigator = createBottomTabNavigator({
    Circle: {
        screen: DrawCircleScreen,
    },
    Square: {
        screen: DrawSquareScreen,
    },
    Triangle: {
        screen: DrawTriangleScreen,
    },
    Random: {
        screen: DrawRandomShapeScreen,
    }
},  {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Circle') {
                iconName = 'radio-button-unchecked';
            } else if (routeName === 'Square') {
                iconName = 'crop-square';
            } else if (routeName === 'Triangle') {
                iconName = 'change-history';
            } else if (routeName === 'Random') {
                iconName = 'select-all';
            }
            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons
            return <Icon name={iconName} color={tintColor} type='Material' size= {25} />;
        }
    }),
    tabBarOptions: {
        keyboardHidesTabBar: 'true',
        activeTintColor: '#0E62B7',
        inactiveTintColor: '#DADADA',
        labelStyle: {
            fontSize: 14,
            // fontFamily: 'IBMPlexSans-Regular',
        },
        style: {
            height: 60,
            alignItems: 'center',
            paddingBottom: 5,
            paddingTop: 5
        },
    },
})

// const AppNavigator = createStackNavigator({
//     Home: {
//         screen: MainScreenNavigator,
//         navigationOptions: () => ({
//             headerShown: false
//         })
//     }
// }, {
//         initialRouteName: 'Home'
// })

export default createAppContainer(AppNavigator)