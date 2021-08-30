import { Redirect } from 'umi'
import {
  OktaAuth,
  Tokens,
  TokenParams
} from '@okta/okta-auth-js'

var config = {
  issuer: 'https://dev-70463385.okta.com/oauth2/default',
  clientId: '0oa1m6rr11Xa9vuKM5d7',
  redirectUri: 'http://localhost:8000/implicit/callback',
  // Parse authorization code from hash fragment instead of search query
  responseMode: 'fragment',
  // Configure TokenManager to use sessionStorage instead of localStorage
  tokenManager: {
    storage: 'sessionStorage'
  },
  pkce: true,
};

const authClient: OktaAuth = new OktaAuth(config);

export default (props: any) => {
  const { isLogin } = doAuth();
  if (isLogin) {
    return <div>{ props.children }</div>;
  } else {
    return <Redirect to="/login" />;
  }
}

//https://dev-70463385-admin.okta.com/
//https://www.npmjs.com/package/@okta/okta-auth-js
//https://developer.okta.com/docs/concepts/okta-hosted-flows/
function doAuth() {
  const tokens: Tokens = authClient.tokenManager.getTokensSync();
  // console.log(tokens);
  if(!tokens.idToken) {
    sessionStorage.setItem('url', window.location.href);
    const tokenParams: TokenParams = {
      scopes: ['openid', 'email', 'profile'],
    }
    authClient.token.getWithRedirect(tokenParams);
  }
  return { isLogin: true }
}
