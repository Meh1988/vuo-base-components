import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const STACK_KEY = "navigationStack";

const useStackNavigator = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getStack = useCallback((): string[] => {
    const stack = sessionStorage.getItem(STACK_KEY);
    return stack ? JSON.parse(stack) : [location.pathname];
  }, [location.pathname]);

  const saveStack = useCallback((stack: string[]) => {
    sessionStorage.setItem(STACK_KEY, JSON.stringify(stack));
  }, []);

  const navigateWithState = useCallback(
    (to: string) => {
      const stack = getStack();

      if (stack[stack.length - 1] !== to) {
        stack.push(to);
        saveStack(stack);
        navigate(to);
      }
    },
    [getStack, saveStack, navigate],
  );

  const goBack = useCallback(() => {
    const stack = getStack();

    if (stack.length > 1) {
      stack.pop();
      const previousRoute = stack[stack.length - 1];
      saveStack(stack);
      navigate(previousRoute);
    } else {
      navigate("/");
    }
  }, [getStack, saveStack, navigate]);

  return { navigateWithState, goBack };
};

export default useStackNavigator;
