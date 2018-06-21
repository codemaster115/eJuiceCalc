import {FontIcons} from '../../assets/icons';
import * as Screens from '../../screens/index';
import _ from 'lodash';

export const MainRoutes = [
  {
    id: 'Calculator',
    title: 'Weight',
    icon: FontIcons.dashboard,
    screen: Screens.Calculator,
    children: [
      {
        id: 'Recipe1',
        title: 'Recipe1',
        screen: Screens.RecipeCalc,
        children: []
      }
    ]
  },
  {
    id: 'CalculatorTwo',
    title: 'Volume',
    icon: FontIcons.dashboard,
    screen: Screens.CalculatorTwo,
    children: [
      {
        id: 'Recipe1',
        title: 'Recipe1',
        screen: Screens.RecipeCalc,
        children: []
      }
    ]
  },  
  {
    id: 'MyRecipes',
    title: 'My Recipes',
    icon: FontIcons.article,
    screen: Screens.MyRecipes,
    children: [
      {
        id: 'Articles2',
        title: 'Article List V2',
        screen: Screens.Articles2,
        children: []
      },
      {
        id: 'RecipeDetail',
        title: 'Recipe View',
        screen: Screens.RecipeDetail,
        children: []
      },
      {
        id: 'ProfileV1',
        title: 'User Profile V1',
        screen: Screens.ProfileV1,
        children: []
      }
    ]
  },
  {
    id: 'PublicRecipes',
    title: 'Recipes',
    icon: FontIcons.navigation,
    screen: Screens.Recipes,
    children: [
      {
        id: 'RecipeDetail',
        title: 'Recipe View',
        screen: Screens.RecipeDetail,
        children: []
      },
      {
        id: 'ProfileV1',
        title: 'User Profile V1',
        screen: Screens.ProfileV1,
        children: []
      }
    ]
  },
  {
    id: 'Profile',
    title: 'Profile',
    icon: FontIcons.profile,
    screen: Screens.ProfileSettings,
    children: []
  },
  {
    id: 'Settings',
    title: 'Settings',
    icon: FontIcons.other,
    screen: Screens.Settings,
    children: [
      {
        id: 'Login2',
        title: 'Login V2',
        screen: Screens.LoginV2,
        children: []
      },
      {
        id: 'SignUp',
        title: 'Sign Up',
        screen: Screens.SignUp,
        children: []
      },
      {
        id: 'password',
        title: 'Password Recovery',
        screen: Screens.PasswordRecovery,
        children: []
      },
      {
        id: 'GridV1',
        title: 'Grid Menu V1',
        screen: Screens.GridV1,
        children: []
      },      
    ]
  },
];

let menuRoutes = _.cloneDeep(MainRoutes);
menuRoutes.unshift({
  id: 'Login2',
  title: 'Start',
  screen: Screens.LoginV2,
  children: []
},);

export const MenuRoutes = menuRoutes;