import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { SafeArea } from "antd-mobile";
import BottomNavigation from "./components/organisms/BottomNavigation";
import Navbar from "./components/organisms/Navbar";
import OnboardingFlow from "./components/organisms/onboarding";
import { EditProfile } from "./components/pages/EditProfile";
import FlavourFlowPage from "./components/pages/FlavourFlowPage";
import FlavourFlowResultPage from "./components/pages/FlavourFlowResultPage";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import MealMap from "./components/pages/MealMap";
import Minigames from "./components/pages/Minigames";
import NotFoundPage from "./components/pages/NotFoundPage";
import ProfilePage from "./components/pages/ProfilePage";
import QuestIntro from "./components/pages/QuestIntro";
import QuestOutro from "./components/pages/QuestOutro";
import QuestPlay from "./components/pages/QuestPlay";
import QuestSelection from "./components/pages/QuestSelection";
import ShoppingCart from "./components/pages/ShoppingCart";
import { AppContextProvider } from "./context/AppContext";
import { ThemeProvider } from "./context/ThemeContext";
import GamePlayerPage from './components/pages/GamePlayerPage';
import AuthenticatedRoute from "./routeGuards/AuthenticetedRoute";

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
              <Route path="/home/quests/:id/intro" element={<QuestIntro />} />
              <Route path="/home/quests/:id/play" element={<QuestPlay />} />
              <Route path="/home/quests/:id/outro" element={<QuestOutro />} />
              {/* TODO figuring out quest navigation */}
              <Route path="/meal-map" element={<MealMap />} />
              <Route path="/shopping-cart" element={<ShoppingCart />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/flavour-flow" element={<FlavourFlowPage />} />
              <Route
                path="/flavour-flow/results"
                element={<FlavourFlowResultPage />}
              />
              <Route path="/flavour-flow" element={
                <AuthenticatedRoute>
                  <FlavourFlowPage />
                </AuthenticatedRoute>
              } />
              <Route path="/flavour-flow/results" element={
                <AuthenticatedRoute>
                  <FlavourFlowResultPage />
                </AuthenticatedRoute>
              } />
              <Route path="/onboarding" element={<OnboardingFlow />} />
              <Route path="/minigames/play/:gameId" element={<GamePlayerPage />} />
              <Route path="/minigames" element={<Minigames />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
          <BottomNavigation />
        </Router>
        <SafeArea position="bottom" />
      </ThemeProvider>
    </AppContextProvider >
  );
}

export default App;
