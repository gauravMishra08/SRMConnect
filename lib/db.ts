import mysql from "mysql2/promise"

// Create a connection pool with the provided credentials
const pool = mysql.createPool({
  host: "localhost",
  user: "root", // Default MySQL username
  password: "gaurav1A@", // Your provided password
  database: "SRMConnect", // Your provided database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export const db = {
  query: async (sql: string, params?: any[]) => {
    try {
      return await pool.query(sql, params)
    } catch (error) {
      console.error("Database query error:", error)
      throw error
    }
  },
}
