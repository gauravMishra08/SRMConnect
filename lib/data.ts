import { db } from "./db"

export async function getStats() {
  try {
    // Get total students count
    const [studentsResult] = await db.query("SELECT COUNT(*) as count FROM Students")
    const students = studentsResult[0]?.count || 0

    // Get total clubs count
    const [clubsResult] = await db.query("SELECT COUNT(*) as count FROM Clubs")
    const clubs = clubsResult[0]?.count || 0

    // Get upcoming events count
    const [upcomingEventsResult] = await db.query("SELECT COUNT(*) as count FROM Events WHERE Date >= CURDATE()")
    const upcomingEvents = upcomingEventsResult[0]?.count || 0

    // Get total funds
    const [fundsResult] = await db.query("SELECT SUM(BalanceLeft) as total FROM Funds")
    const totalFunds = fundsResult[0]?.total || 0

    // Get recent events
    const [recentEvents] = await db.query(
      `SELECT EventID as id, Name as name, Date as date, Location as location 
       FROM Events 
       ORDER BY Date DESC 
       LIMIT 5`,
    )

    // Get recent announcements
    const [recentAnnouncements] = await db.query(
      `SELECT a.AnnouncementID as id, a.Title as title, a.Date as date, c.ClubName as clubName
       FROM Announcements a
       JOIN Clubs c ON a.ClubID = c.ClubID
       ORDER BY a.Date DESC
       LIMIT 5`,
    )

    return {
      students,
      clubs,
      upcomingEvents,
      totalFunds,
      recentEvents,
      recentAnnouncements,
    }
  } catch (error) {
    console.error("Database error:", error)
    return {
      students: 0,
      clubs: 0,
      upcomingEvents: 0,
      totalFunds: 0,
      recentEvents: [],
      recentAnnouncements: [],
    }
  }
}

export async function getStudents() {
  try {
    const [students] = await db.query(
      `SELECT StudentID as id, Name as name, Email as email, 
       Phone as phone, Department as department, Year as year, Role as role
       FROM Students
       ORDER BY Name`,
    )
    return students
  } catch (error) {
    console.error("Database error:", error)
    return []
  }
}

export async function getStudentById(id: number) {
  try {
    const [students] = await db.query(
      `SELECT StudentID as id, Name as name, Email as email, 
       Phone as phone, Department as department, Year as year, Role as role, Address as address
       FROM Students
       WHERE StudentID = ?`,
      [id],
    )
    return students[0] || null
  } catch (error) {
    console.error("Database error:", error)
    return null
  }
}

export async function getClubs() {
  try {
    const [clubs] = await db.query(
      `SELECT c.ClubID as id, c.ClubName as name, c.Domain as domain, 
       c.FoundedYear as foundedYear, c.Description as description,
       s1.Name as presidentName, s2.Name as vicePresidentName
       FROM Clubs c
       LEFT JOIN Students s1 ON c.President = s1.StudentID
       LEFT JOIN Students s2 ON c.VicePresident = s2.StudentID
       ORDER BY c.ClubName`,
    )
    return clubs
  } catch (error) {
    console.error("Database error:", error)
    return []
  }
}

export async function getClubById(id: number) {
  try {
    const [clubs] = await db.query(
      `SELECT c.ClubID as id, c.ClubName as name, c.Domain as domain, 
       c.FoundedYear as foundedYear, c.Description as description,
       c.President as presidentId, c.VicePresident as vicePresidentId, c.ClubEmail as email,
       s1.Name as presidentName, s2.Name as vicePresidentName
       FROM Clubs c
       LEFT JOIN Students s1 ON c.President = s1.StudentID
       LEFT JOIN Students s2 ON c.VicePresident = s2.StudentID
       WHERE c.ClubID = ?`,
      [id],
    )
    return clubs[0] || null
  } catch (error) {
    console.error("Database error:", error)
    return null
  }
}

export async function getEvents() {
  try {
    const [events] = await db.query(
      `SELECT e.EventID as id, e.Name as name, e.Description as description,
       e.Date as date, e.Time as time, e.Location as location, 
       e.Budget as budget, e.EventType as type, e.ExpectedFootfall as footfall,
       c.ClubName as clubName, e.ClubID as clubId
       FROM Events e
       LEFT JOIN Clubs c ON e.ClubID = c.ClubID
       ORDER BY e.Date DESC`,
    )
    return events
  } catch (error) {
    console.error("Database error:", error)
    return []
  }
}

export async function getEventById(id: number) {
  try {
    const [events] = await db.query(
      `SELECT e.EventID as id, e.Name as name, e.Description as description,
       e.Date as date, e.Time as time, e.Location as location, 
       e.Budget as budget, e.EventType as type, e.ExpectedFootfall as footfall,
       e.ClubID as clubId, c.ClubName as clubName
       FROM Events e
       LEFT JOIN Clubs c ON e.ClubID = c.ClubID
       WHERE e.EventID = ?`,
      [id],
    )
    return events[0] || null
  } catch (error) {
    console.error("Database error:", error)
    return null
  }
}

export async function getSessions() {
  try {
    const [sessions] = await db.query(
      `SELECT s.SessionID as id, s.Name as name, s.Speaker as speaker,
       s.Date as date, s.Time as time, s.Mode as mode, 
       s.Duration as duration, s.SessionType as type,
       c.ClubName as clubName, s.ClubID as clubId
       FROM Session s
       LEFT JOIN Clubs c ON s.ClubID = c.ClubID
       ORDER BY s.Date DESC`,
    )
    return sessions
  } catch (error) {
    console.error("Database error:", error)
    return []
  }
}

export async function getSessionById(id: number) {
  try {
    const [sessions] = await db.query(
      `SELECT s.SessionID as id, s.Name as name, s.Speaker as speaker,
       s.Date as date, s.Time as time, s.Mode as mode, 
       s.Duration as duration, s.SessionType as type,
       s.ClubID as clubId, c.ClubName as clubName
       FROM Session s
       LEFT JOIN Clubs c ON s.ClubID = c.ClubID
       WHERE s.SessionID = ?`,
      [id],
    )
    return sessions[0] || null
  } catch (error) {
    console.error("Database error:", error)
    return null
  }
}

export async function getFunds() {
  try {
    const [funds] = await db.query(
      `SELECT f.FundID as id, f.Source as source, f.Amount as amount,
       f.Date as date, f.TransactionType as type, f.BalanceLeft as balance,
       f.ApprovalStatus as status, c.ClubName as clubName, f.ClubID as clubId
       FROM Funds f
       LEFT JOIN Clubs c ON f.ClubID = c.ClubID
       ORDER BY f.Date DESC`,
    )
    return funds
  } catch (error) {
    console.error("Database error:", error)
    return []
  }
}

export async function getFundById(id: number) {
  try {
    const [funds] = await db.query(
      `SELECT f.FundID as id, f.Source as source, f.Amount as amount,
       f.Date as date, f.TransactionType as type, f.BalanceLeft as balance,
       f.ApprovalStatus as status, f.ClubID as clubId, c.ClubName as clubName
       FROM Funds f
       LEFT JOIN Clubs c ON f.ClubID = c.ClubID
       WHERE f.FundID = ?`,
      [id],
    )
    return funds[0] || null
  } catch (error) {
    console.error("Database error:", error)
    return null
  }
}

export async function getExpenses() {
  try {
    const [expenses] = await db.query(
      `SELECT e.ExpenseID as id, e.EventName as eventName, e.Description as description,
       e.Amount as amount, e.PaymentMethod as paymentMethod, e.ApprovedBy as approvedBy,
       c.ClubName as clubName, e.ClubID as clubId
       FROM Expenses e
       LEFT JOIN Clubs c ON e.ClubID = c.ClubID
       ORDER BY e.ExpenseID DESC`,
    )
    return expenses
  } catch (error) {
    console.error("Database error:", error)
    return []
  }
}

export async function getExpenseById(id: number) {
  try {
    const [expenses] = await db.query(
      `SELECT e.ExpenseID as id, e.EventName as eventName, e.Description as description,
       e.Amount as amount, e.PaymentMethod as paymentMethod, e.ApprovedBy as approvedBy,
       e.ClubID as clubId, c.ClubName as clubName
       FROM Expenses e
       LEFT JOIN Clubs c ON e.ClubID = c.ClubID
       WHERE e.ExpenseID = ?`,
      [id],
    )
    return expenses[0] || null
  } catch (error) {
    console.error("Database error:", error)
    return null
  }
}

export async function getAnnouncements() {
  try {
    const [announcements] = await db.query(
      `SELECT a.AnnouncementID as id, a.Title as title, a.Content as content,
       a.Date as date, a.TargetAudience as audience, a.ExpiryDate as expiryDate,
       a.VisibilityStatus as status, c.ClubName as clubName, a.ClubID as clubId
       FROM Announcements a
       LEFT JOIN Clubs c ON a.ClubID = c.ClubID
       ORDER BY a.Date DESC`,
    )
    return announcements
  } catch (error) {
    console.error("Database error:", error)
    return []
  }
}

export async function getAnnouncementById(id: number) {
  try {
    const [announcements] = await db.query(
      `SELECT a.AnnouncementID as id, a.Title as title, a.Content as content,
       a.Date as date, a.TargetAudience as audience, a.ExpiryDate as expiryDate,
       a.VisibilityStatus as status, a.ClubID as clubId, c.ClubName as clubName
       FROM Announcements a
       LEFT JOIN Clubs c ON a.ClubID = c.ClubID
       WHERE a.AnnouncementID = ?`,
      [id],
    )
    return announcements[0] || null
  } catch (error) {
    console.error("Database error:", error)
    return null
  }
}

export async function getResources() {
  try {
    const [resources] = await db.query(
      `SELECT r.ResourceID as id, r.Name as name, r.Description as description,
       r.Quantity as quantity, r.Availability as availability, r.Cost as cost,
       r.MaintenanceSchedule as maintenanceSchedule, c.ClubName as clubName, r.ClubID as clubId
       FROM Resources r
       LEFT JOIN Clubs c ON r.ClubID = c.ClubID
       ORDER BY r.Name`,
    )
    return resources
  } catch (error) {
    console.error("Database error:", error)
    return []
  }
}

export async function getResourceById(id: number) {
  try {
    const [resources] = await db.query(
      `SELECT r.ResourceID as id, r.Name as name, r.Description as description,
       r.Quantity as quantity, r.Availability as availability, r.Cost as cost,
       r.MaintenanceSchedule as maintenanceSchedule, r.ClubID as clubId, c.ClubName as clubName
       FROM Resources r
       LEFT JOIN Clubs c ON r.ClubID = c.ClubID
       WHERE r.ResourceID = ?`,
      [id],
    )
    return resources[0] || null
  } catch (error) {
    console.error("Database error:", error)
    return null
  }
}

export async function getFeedback() {
  try {
    const [feedback] = await db.query(
      `SELECT f.FeedbackID as id, f.Rating as rating, f.Comments as comments,
       f.Date as date, f.Suggestion as suggestion, f.AnonymousFeedbackFlag as anonymous,
       e.Name as eventName, s.Name as studentName, f.EventID as eventId, f.StudentID as studentId
       FROM Feedback f
       LEFT JOIN Events e ON f.EventID = e.EventID
       LEFT JOIN Students s ON f.StudentID = s.StudentID
       ORDER BY f.Date DESC`,
    )
    return feedback
  } catch (error) {
    console.error("Database error:", error)
    return []
  }
}

export async function getFeedbackById(id: number) {
  try {
    const [feedback] = await db.query(
      `SELECT f.FeedbackID as id, f.Rating as rating, f.Comments as comments,
       f.Date as date, f.Suggestion as suggestion, f.AnonymousFeedbackFlag as anonymous,
       f.EventID as eventId, f.StudentID as studentId, e.Name as eventName, s.Name as studentName
       FROM Feedback f
       LEFT JOIN Events e ON f.EventID = e.EventID
       LEFT JOIN Students s ON f.StudentID = s.StudentID
       WHERE f.FeedbackID = ?`,
      [id],
    )
    return feedback[0] || null
  } catch (error) {
    console.error("Database error:", error)
    return null
  }
}

export async function getReports() {
  try {
    const [reports] = await db.query(
      `SELECT r.ReportID as id, r.Year as year, r.TotalEvents as totalEvents,
       r.TotalFundsUsed as totalFundsUsed, r.Achievements as achievements,
       r.Challenges as challenges, r.Summary as summary, c.ClubName as clubName, r.ClubID as clubId
       FROM Report r
       LEFT JOIN Clubs c ON r.ClubID = c.ClubID
       ORDER BY r.Year DESC, c.ClubName`,
    )
    return reports
  } catch (error) {
    console.error("Database error:", error)
    return []
  }
}

export async function getReportById(id: number) {
  try {
    const [reports] = await db.query(
      `SELECT r.ReportID as id, r.Year as year, r.TotalEvents as totalEvents,
       r.TotalFundsUsed as totalFundsUsed, r.Achievements as achievements,
       r.Challenges as challenges, r.Summary as summary, r.ClubID as clubId, c.ClubName as clubName
       FROM Report r
       LEFT JOIN Clubs c ON r.ClubID = c.ClubID
       WHERE r.ReportID = ?`,
      [id],
    )
    return reports[0] || null
  } catch (error) {
    console.error("Database error:", error)
    return null
  }
}

export async function getCompetitions() {
  try {
    const [competitions] = await db.query(
      `SELECT c.CompetitionID as id, c.Name as name, c.EventID as eventId, 
       c.PrizePool as prizePool, c.CompetitionType as type, c.Footfall as footfall,
       e.Name as eventName
       FROM Competition c
       LEFT JOIN Events e ON c.EventID = e.EventID
       ORDER BY c.EventID ASC`,
    )
    return competitions
  } catch (error) {
    console.error("Database error:", error)
    return []
  }
}
