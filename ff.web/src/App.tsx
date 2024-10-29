import {
  Route,
  Routes,
  BrowserRouter as Router,
} from 'react-router-dom'

import { SafeArea } from "antd-mobile";
import Login from "./components/pages/Login";
import ShoppingCart from "./components/pages/ShoppingCart";
import ProfilePage from "./components/pages/ProfilePage";
import MealMap from "./components/pages/MealMap";
import Home from "./components/pages/Home";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/organisms/Navbar";
import BottomNavigation from "./components/organisms/BottomNavigation";
import OnboardingFlow from "./components/organisms/Onboarding";
import FlavourFlowPage from "./components/pages/FlavourFlowPage";
import FlavourFlowResultPage from "./components/pages/FlavourFlowResultPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import QuestIntro from "./components/pages/QuestIntro";
import QuestOutro from "./components/pages/QuestOutro";
import QuestPlay from "./components/pages/QuestPlay";
import QuestSelection from "./components/pages/QuestSelection";
import Minigames from './components/pages/Minigames';
import { AppContextProvider } from "./context/AppContext";


function App() {
  return (
    <AppContextProvider>
        <ThemeProvider>
          <SafeArea position="top" />
            <Router>
              <Navbar />
              <Routes>
                <Route>
                  <Route path="/" element={<Login />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/home/quests" element={<QuestSelection />} />
                  <Route
                    path="/home/quests/:id/intro"
                    element={<QuestIntro />}
                  />
                  <Route path="/home/quests/:id/play" element={<QuestPlay />} />
                  <Route
                    path="/home/quests/:id/outro"
                    element={<QuestOutro />}
                  />
                  {/* TODO figuring out quest navigation */}
                  <Route path='/meal-map' element={<MealMap />} />
                  <Route path='/shopping-cart' element={<ShoppingCart />} />
                  <Route path='/profile' element={<ProfilePage />} />
                  <Route path='/flavour-flow' element={<FlavourFlowPage />} />
                  <Route path='/flavour-flow/results' element={<FlavourFlowResultPage />} />
                  <Route path='/onboarding' element={<OnboardingFlow />} />
                  <Route path='/minigames' element={<Minigames />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
                {/* <Route>
                  <Route path='/login' element={<Login />} />
                  </Route> */}
              </Routes>
              <BottomNavigation />
            </Router>
            <SafeArea position="bottom" />
          </ThemeProvider>
      </AppContextProvider>
  );
}

export default App;
