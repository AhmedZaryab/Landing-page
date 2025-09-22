import { neon } from '@netlify/neon';

export const handler = async (event, context) => {
  try {
    // Test database connection
    const sql = neon();
    
    // Simple test query
    const result = await sql`SELECT NOW() as current_time`;
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: 'Database connection successful',
        data: result[0]
      })
    };
  } catch (error) {
    console.error('Database test error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: 'Database connection failed',
        message: error.message
      })
    };
  }
};
