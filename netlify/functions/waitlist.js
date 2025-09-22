export const handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  try {
    // Parse the request body
    const { name, occupation, usage } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !occupation || !usage) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          error: 'Missing required fields: name, occupation, and usage are required' 
        })
      };
    }

    // For now, let's log the submission and return success
    // The data will be visible in the function logs
    console.log('=== WAITLIST SUBMISSION ===');
    console.log('Name:', name);
    console.log('Occupation:', occupation);
    console.log('Usage:', usage);
    console.log('Timestamp:', new Date().toISOString());
    console.log('========================');

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: 'Successfully joined the waitlist!',
        data: {
          id: Date.now(),
          name,
          occupation,
          usage,
          created_at: new Date().toISOString()
        },
        note: 'Data is logged in function logs. Database storage will be added once table is created.'
      })
    };

  } catch (error) {
    console.error('Form submission error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: 'Failed to join waitlist. Please try again.'
      })
    };
  }
};
