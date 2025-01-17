// @ts-nocheck

import { TabBar } from "antd-mobile";
import { useLocation } from "react-router-dom";
//TODO use Pasi's icon collection
import { HomeOutlined, ShoppingCartOutlined, UserOutlined, CoffeeOutlined, QuestionOutlined } from '@ant-design/icons';
import useStackNavigator from "@vuo/hooks/StackNavigator";
import { useAppContext } from "@vuo/context/AppContext";
import { isAuthenticated } from "@vuo/routeGuards/AuthenticetedRoute";
import { observer } from 'mobx-react-lite';


const BottomNavigation = observer(() => {
    const location = useLocation();
    const { navigateWithState } = useStackNavigator(); 
    const { pathname } = location;

    const hideOnRoutes = ['/'];
    const isVisible = !hideOnRoutes.includes(location.pathname);
  
    const setRouteActive = (value) => {
      navigateWithState(value);
    };

    const handleTabChange = (value) => {
      setRouteActive(value);
    };
    //TODO currently the we need to hide the tabs here and in the router. create a function that does it in one place
    const tabs = () => {
      return [
        {
          key: '/home',
          title: 'Home',
          icon: <HomeOutlined />,
          hidden: false
        },
        {
          key: '/meal-map',
          title: 'MealMap',
          icon: <CoffeeOutlined />,
          hidden: false
        },
        // {
        //   key: '/shopping-cart',
        //   title: 'ShoppingCart',
        //   icon: <ShoppingCartOutlined />,
        //   hidden: false
        // },
        // {
        //   key: '/flavour-flow',
        //   title: 'FlavourFlow',
        //   icon: < QuestionOutlined/>,
        //   hidden: !isAuthenticated()
        // },
        {
          key: '/profile',
          title: 'Profile',
          icon: <UserOutlined />,
          hidden: !isAuthenticated()
        }
      ];
    };
  
    if(isVisible) return (
      <div>
          <TabBar activeKey={pathname} onChange={handleTabChange}>
            {tabs().map(item => !item.hidden && (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
          </TabBar>
      </div>
    );

    return null
  });

  export default BottomNavigation;