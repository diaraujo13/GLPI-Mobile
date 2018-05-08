import {Navigation} from 'react-native-navigation';

const startTab = () => (
    Navigation.startTabBasedApp({
        tabs: [
            {
                label: 'About', 
                screen: 'about',
                icon: null
            }   
        ]
    })
);

export default startTab;