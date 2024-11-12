import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import LoginViewModel from '../../viewModels/LoginViewModel';
import Button from "@vuo/atoms/Button";

const Login = observer(() => {
  const [viewModel] = useState(() => new LoginViewModel());
  console.log(JSON.stringify(viewModel.sessionDataStore.user) );

  if(viewModel.sessionDataStore.user && !viewModel.sessionDataStore.shadowAccount) {
    return <h2>Welcome {viewModel.sessionDataStore.user.username}</h2>;
  }

  return (
    <div className="login-container">
      <div className="auth-buttons">
        <Button
          color="secondary"
          onClick={() => viewModel.signInWithGoogle()}
          disabled={viewModel.loading}
        >
          Sign in with Google
        </Button>
{/* 
        <Button
          color="secondary"
          onClick={() => viewModel.signInWithFacebook()}
          disabled={viewModel.loading}
        >
          Sign in with Facebook
        </Button> */}

        {viewModel.errors && (
          <div className="error-message">
            {viewModel.errors.message}
          </div>
        )}
      </div>
    </div>
  );
});

export default Login;