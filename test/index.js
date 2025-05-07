const fs = require('fs');

// Get input from environment variables
const deploymentError = process.env.INPUT_DEPLOYMENT_ERROR;
const projectPath = process.env.INPUT_PROJECT_PATH;
const vercelToken = process.env.INPUT_VERCEL_TOKEN;

async function run() {
    try {
        console.log('Received deployment error:', deploymentError);
        
        if (deploymentError && deploymentError.includes('User must have access to the project')) {
            console.log('Authorization error detected');
            fs.writeFileSync('deployment_attempted', 'true');
            console.log('Created marker file');
        } else {
            console.log('No authorization error detected');
            console.log('Error message:', deploymentError);
        }
    } catch (error) {
        console.error('Action failed:', error);
        process.exit(1);
    }
}

run();