import { observer } from 'mobx-react-lite';
import { authStore } from '../../stores/AuthStore';

const LoginComponent = observer(() => {
  return (
    <div>
      {authStore.loading ? (
        <div>Loading...</div>
      ) : authStore.user ? (
        <div>
          <p>Welcome, {authStore.user.email}</p>
          <button 
            onClick={authStore.signOut}
            disabled={authStore.loading}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button 
          onClick={authStore.signIn}
          disabled={authStore.loading}
        >
          Sign in with Google
        </button>
      )}
      {authStore.error && (
        <div style={{ color: 'red' }}>{authStore.error}</div>
      )}
    </div>
  );
});

export default LoginComponent; 