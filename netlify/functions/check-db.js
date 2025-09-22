export const handler = async (event, context) => {
  try {
    // Try to query the waitlist table
    const { neon } = await import('@netlify/neon');
    const sql = neon();
    
    // Check if table exists and get data
    const result = await sql`SELECT * FROM waitlist ORDER BY created_at DESC LIMIT 10`;
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: 'Database query successful',
        tableExists: true,
        data: result,
        count: result.length
      })
    };
  } catch (error) {
    console.error('Database check error:', error);
    
    // If table doesn't exist, try to create it
    if (error.message.includes('relation "waitlist" does not exist')) {
      try {
        const { neon } = await import('@netlify/neon');
        const sql = neon();
        
        await sql`
          CREATE TABLE IF NOT EXISTS waitlist (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            occupation VARCHAR(255) NOT NULL,
            usage TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          )
        `;
        
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            success: true,
            message: 'Table created successfully',
            tableExists: false,
            data: [],
            count: 0
          })
        };
      } catch (createError) {
        return {
          statusCode: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            error: 'Failed to create table',
            message: createError.message
          })
        };
      }
    }
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: 'Database error',
        message: error.message
      })
    };
  }
};
