import one from '../assets/profile/1.jpg'
import two from '../assets/profile/2.jpg'
import three from '../assets/profile/3.jpg'
import four from '../assets/profile/4.jpg'
import five from '../assets/profile/5.jpg'
import six from '../assets/profile/6.jpg'
import seven from '../assets/profile/7.jpg'
import eight from '../assets/profile/8.jpg'
import nine from '../assets/profile/9.jpg'
import ten from '../assets/profile/10.jpg'


export const setCardPicture = (picNumber) => {
    switch(picNumber){
        case 1:
            return one
        case 2:
            return two
        case 3:
            return three
        case 4:
            return four
        case 5:
            return five
        case 6:
            return six
        case 7:
            return seven
        case 8:
            return eight
        case 9:
            return nine
        case 10:
            return ten
    }
}