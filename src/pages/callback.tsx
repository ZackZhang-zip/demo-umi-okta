import {
  OktaAuth
} from '@okta/okta-auth-js'

var config = {
  issuer: 'https://dev-70463385.okta.com/oauth2/default',
  clientId: '0oa1m6rr11Xa9vuKM5d7',
  redirectUri: 'http://localhost:8000',
  // Parse authorization code from hash fragment instead of search query
  responseMode: 'fragment',
  // Configure TokenManager to use sessionStorage instead of localStorage
  tokenManager: {
    storage: 'sessionStorage'
  },
  pkce: true,
};

const authClient: OktaAuth = new OktaAuth(config);

export default function CallbackPage() {
  authClient.token.parseFromUrl()
    .then(function (res) {
      const state = res.state;
      const tokens = res.tokens;
      // console.log(tokens);
      authClient.tokenManager.setTokens(tokens);
      const url = sessionStorage.getItem('url') || config.redirectUri;
      sessionStorage.removeItem('url');
      window.location.assign(url);
    })
    .catch(function (err) {

    });

  return (
    <div>
      <h1>authenticating...</h1>
    </div>
  );
}
