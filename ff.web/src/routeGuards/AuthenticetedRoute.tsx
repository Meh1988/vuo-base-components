import React from "react";
import { observer } from "mobx-react-lite";
import sessionDataStore from "@vuo/stores/SessionDataStore";
import useStackNavigator from "@vuo/hooks/StackNavigator";

type Props = {
  children: JSX.Element;
};

export const isAuthenticated = () => {
  return sessionDataStore.token && sessionDataStore.user?.id && sessionDataStore.shadowAccount === false;
}

const AuthenticatedRoute: React.FC<Props> = observer((props: Props) => {
  const { children } = props;
  const { navigateWithState } = useStackNavigator();

  if (!sessionDataStore.token) {
    // Using navigateWithState instead of Navigate component
    navigateWithState("/home");
    return null;
  }
  return children;
});

export default AuthenticatedRoute; 

