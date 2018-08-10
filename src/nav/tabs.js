import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? "md-map" : "ios-map", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-share-alt" : "ios-share", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30)
    ]).then(sources => {


        Navigation.startSingleScreenApp( {
            screen: {
                title:'Início',
                screen: 'ListTicket', // unique ID registered with Navigation.registerScreen,
                navigatorButtons: {
                    leftButtons: [
                        {
                            icon: sources[2],
                            title: "Menu",
                            id: "sideMenu"
                        }
                    ]
                }
            },
            drawer: {
                left: {
                    screen: "SideDrawer",
                    id: 'sideMenu'
                }
            },

          });


      
    });
};

export default startTabs;