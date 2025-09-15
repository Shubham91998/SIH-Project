import axios from 'axios';
const { post, get } = axios;

const NLP_SERVICE_URL = process.env.NLP_SERVICE_URL;

export async function processWithNLP(text, sessionId) {
  try {
    const response = await post(NLP_SERVICE_URL, {
      text,
      session_id: sessionId
    }, { timeout: 10000 });

    return response.data;
  } catch (error) {
    console.error('NLP Service Error:', error.message);
    throw new Error('Failed to process text with NLP service');
  }
}

export async function checkNLPHealth() {
  try {
    await get(`${NLP_SERVICE_URL}/health`, { timeout: 5000 });
    return 'healthy';
  } catch (error) {
    return 'unhealthy';
  }
}
