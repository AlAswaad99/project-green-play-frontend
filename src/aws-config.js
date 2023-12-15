// aws-config.js
import { CognitoUserPool } from 'amazon-cognito-identity-js'; // Import CognitoUserPool from the correct module

// AWS.config.region = 'us-east-1'; 

const poolData = {
    UserPoolId: 'us-east-1_7FerlAZUL',
    ClientId: '3ivpkf65mqbasqlk91af6ist0m'
};

const userPool = new CognitoUserPool(poolData);

export { userPool };
