import axios from 'axios';
import FormData from 'form-data';
import { createReadStream } from 'fs';

const { post, get } = axios;
const AIML_SERVICE_URL = process.env.AIML_SERVICE_URL;

export async function processWithAIML(imagePath) {
  try {
    const formData = new FormData();
    formData.append('image', createReadStream(imagePath));
    
    const response = await post(AIML_SERVICE_URL, formData, {
      headers: {
        ...formData.getHeaders()
      },
      timeout: 15000
    });

    return response.data;
  } catch (error) {
    console.error('AIML Service Error:', error.message);
    throw new Error('Failed to process image with AIML service');
  }
}

export async function checkAIMLHealth() {
  try {
    await get(`${AIML_SERVICE_URL}/health`, { timeout: 5000 });
    return 'healthy';
  } catch (error) {
    return 'unhealthy';
  }
}
