"use server"

import { db } from "./db"
import { revalidatePath } from "next/cache"

// Student actions
export async function createStudent(data: any) {
  try {
    await db.query(
      `INSERT INTO Students (StudentID, Name, Email, Phone, Department, Year, Role, Address)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [data.id, data.name, data.email, data.phone, data.department, data.year, data.role, data.address],
    )
    revalidatePath("/students")
    return { success: true }
  } catch (error) {
    console.error("Failed to create student:", error)
    return { success: false, error }
  }
}

export async function updateStudent(id: number, data: any) {
  try {
    await db.query(
      `UPDATE Students 
       SET Name = ?, Email = ?, Phone = ?, Department = ?, Year = ?, Role = ?, Address = ?
       WHERE StudentID = ?`,
      [data.name, data.email, data.phone, data.department, data.year, data.role, data.address, id],
    )
    revalidatePath("/students")
    return { success: true }
  } catch (error) {
    console.error("Failed to update student:", error)
    return { success: false, error }
  }
}

export async function deleteStudent(id: number) {
  try {
    await db.query("DELETE FROM Students WHERE StudentID = ?", [id])
    revalidatePath("/students")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete student:", error)
    return { success: false, error }
  }
}

// Club actions
export async function createClub(data: any) {
  try {
    await db.query(
      `INSERT INTO Clubs (ClubID, ClubName, Domain, FoundedYear, Description, President, VicePresident, ClubEmail)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.id,
        data.name,
        data.domain,
        data.foundedYear,
        data.description,
        data.presidentId,
        data.vicePresidentId,
        data.email,
      ],
    )
    revalidatePath("/clubs")
    return { success: true }
  } catch (error) {
    console.error("Failed to create club:", error)
    return { success: false, error }
  }
}

export async function updateClub(id: number, data: any) {
  try {
    await db.query(
      `UPDATE Clubs 
       SET ClubName = ?, Domain = ?, FoundedYear = ?, Description = ?, 
           President = ?, VicePresident = ?, ClubEmail = ?
       WHERE ClubID = ?`,
      [
        data.name,
        data.domain,
        data.foundedYear,
        data.description,
        data.presidentId,
        data.vicePresidentId,
        data.email,
        id,
      ],
    )
    revalidatePath("/clubs")
    return { success: true }
  } catch (error) {
    console.error("Failed to update club:", error)
    return { success: false, error }
  }
}

export async function deleteClub(id: number) {
  try {
    await db.query("DELETE FROM Clubs WHERE ClubID = ?", [id])
    revalidatePath("/clubs")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete club:", error)
    return { success: false, error }
  }
}

// Event actions
export async function createEvent(data: any) {
  try {
    await db.query(
      `INSERT INTO Events (EventID, Name, Description, Time, Budget, EventType, ExpectedFootfall, Date, Location, ClubID)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.id,
        data.name,
        data.description,
        data.time,
        data.budget,
        data.type,
        data.footfall,
        data.date,
        data.location,
        data.clubId,
      ],
    )
    revalidatePath("/events")
    return { success: true }
  } catch (error) {
    console.error("Failed to create event:", error)
    return { success: false, error }
  }
}

export async function updateEvent(id: number, data: any) {
  try {
    await db.query(
      `UPDATE Events 
       SET Name = ?, Description = ?, Time = ?, Budget = ?, EventType = ?, 
           ExpectedFootfall = ?, Date = ?, Location = ?, ClubID = ?
       WHERE EventID = ?`,
      [
        data.name,
        data.description,
        data.time,
        data.budget,
        data.type,
        data.footfall,
        data.date,
        data.location,
        data.clubId,
        id,
      ],
    )
    revalidatePath("/events")
    return { success: true }
  } catch (error) {
    console.error("Failed to update event:", error)
    return { success: false, error }
  }
}

export async function deleteEvent(id: number) {
  try {
    await db.query("DELETE FROM Events WHERE EventID = ?", [id])
    revalidatePath("/events")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete event:", error)
    return { success: false, error }
  }
}

// Session actions
export async function createSession(data: any) {
  try {
    await db.query(
      `INSERT INTO Session (SessionID, Name, ClubID, Speaker, Date, Time, Mode, Duration, SessionType)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [data.id, data.name, data.clubId, data.speaker, data.date, data.time, data.mode, data.duration, data.type],
    )
    revalidatePath("/sessions")
    return { success: true }
  } catch (error) {
    console.error("Failed to create session:", error)
    return { success: false, error }
  }
}

export async function updateSession(id: number, data: any) {
  try {
    await db.query(
      `UPDATE Session 
       SET Name = ?, ClubID = ?, Speaker = ?, Date = ?, Time = ?, Mode = ?, Duration = ?, SessionType = ?
       WHERE SessionID = ?`,
      [data.name, data.clubId, data.speaker, data.date, data.time, data.mode, data.duration, data.type, id],
    )
    revalidatePath("/sessions")
    return { success: true }
  } catch (error) {
    console.error("Failed to update session:", error)
    return { success: false, error }
  }
}

export async function deleteSession(id: number) {
  try {
    await db.query("DELETE FROM Session WHERE SessionID = ?", [id])
    revalidatePath("/sessions")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete session:", error)
    return { success: false, error }
  }
}

// Fund actions
export async function createFund(data: any) {
  try {
    await db.query(
      `INSERT INTO Funds (FundID, ClubID, Source, Amount, Date, TransactionType, BalanceLeft, ApprovalStatus)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [data.id, data.clubId, data.source, data.amount, data.date, data.type, data.balance, data.status],
    )
    revalidatePath("/funds")
    return { success: true }
  } catch (error) {
    console.error("Failed to create fund:", error)
    return { success: false, error }
  }
}

export async function updateFund(id: number, data: any) {
  try {
    await db.query(
      `UPDATE Funds 
       SET ClubID = ?, Source = ?, Amount = ?, Date = ?, TransactionType = ?, BalanceLeft = ?, ApprovalStatus = ?
       WHERE FundID = ?`,
      [data.clubId, data.source, data.amount, data.date, data.type, data.balance, data.status, id],
    )
    revalidatePath("/funds")
    return { success: true }
  } catch (error) {
    console.error("Failed to update fund:", error)
    return { success: false, error }
  }
}

export async function deleteFund(id: number) {
  try {
    await db.query("DELETE FROM Funds WHERE FundID = ?", [id])
    revalidatePath("/funds")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete fund:", error)
    return { success: false, error }
  }
}

// Expense actions
export async function createExpense(data: any) {
  try {
    await db.query(
      `INSERT INTO Expenses (ExpenseID, ClubID, EventName, Description, Amount, PaymentMethod, ApprovedBy)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [data.id, data.clubId, data.eventName, data.description, data.amount, data.paymentMethod, data.approvedBy],
    )
    revalidatePath("/expenses")
    return { success: true }
  } catch (error) {
    console.error("Failed to create expense:", error)
    return { success: false, error }
  }
}

export async function updateExpense(id: number, data: any) {
  try {
    await db.query(
      `UPDATE Expenses 
       SET ClubID = ?, EventName = ?, Description = ?, Amount = ?, PaymentMethod = ?, ApprovedBy = ?
       WHERE ExpenseID = ?`,
      [data.clubId, data.eventName, data.description, data.amount, data.paymentMethod, data.approvedBy, id],
    )
    revalidatePath("/expenses")
    return { success: true }
  } catch (error) {
    console.error("Failed to update expense:", error)
    return { success: false, error }
  }
}

export async function deleteExpense(id: number) {
  try {
    await db.query("DELETE FROM Expenses WHERE ExpenseID = ?", [id])
    revalidatePath("/expenses")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete expense:", error)
    return { success: false, error }
  }
}

// Resource actions
export async function createResource(data: any) {
  try {
    await db.query(
      `INSERT INTO Resources (ResourceID, Name, Description, Quantity, Availability, Cost, MaintenanceSchedule, ClubID)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.id,
        data.name,
        data.description,
        data.quantity,
        data.availability,
        data.cost,
        data.maintenanceSchedule,
        data.clubId,
      ],
    )
    revalidatePath("/resources")
    return { success: true }
  } catch (error) {
    console.error("Failed to create resource:", error)
    return { success: false, error }
  }
}

export async function updateResource(id: number, data: any) {
  try {
    await db.query(
      `UPDATE Resources 
       SET Name = ?, Description = ?, Quantity = ?, Availability = ?, Cost = ?, MaintenanceSchedule = ?, ClubID = ?
       WHERE ResourceID = ?`,
      [
        data.name,
        data.description,
        data.quantity,
        data.availability,
        data.cost,
        data.maintenanceSchedule,
        data.clubId,
        id,
      ],
    )
    revalidatePath("/resources")
    return { success: true }
  } catch (error) {
    console.error("Failed to update resource:", error)
    return { success: false, error }
  }
}

export async function deleteResource(id: number) {
  try {
    await db.query("DELETE FROM Resources WHERE ResourceID = ?", [id])
    revalidatePath("/resources")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete resource:", error)
    return { success: false, error }
  }
}

// Announcement actions
export async function createAnnouncement(data: any) {
  try {
    await db.query(
      `INSERT INTO Announcements (AnnouncementID, ClubID, Title, Content, Date, TargetAudience, ExpiryDate, VisibilityStatus)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [data.id, data.clubId, data.title, data.content, data.date, data.audience, data.expiryDate, data.status],
    )
    revalidatePath("/announcements")
    return { success: true }
  } catch (error) {
    console.error("Failed to create announcement:", error)
    return { success: false, error }
  }
}

export async function updateAnnouncement(id: number, data: any) {
  try {
    await db.query(
      `UPDATE Announcements 
       SET ClubID = ?, Title = ?, Content = ?, Date = ?, TargetAudience = ?, ExpiryDate = ?, VisibilityStatus = ?
       WHERE AnnouncementID = ?`,
      [data.clubId, data.title, data.content, data.date, data.audience, data.expiryDate, data.status, id],
    )
    revalidatePath("/announcements")
    return { success: true }
  } catch (error) {
    console.error("Failed to update announcement:", error)
    return { success: false, error }
  }
}

export async function deleteAnnouncement(id: number) {
  try {
    await db.query("DELETE FROM Announcements WHERE AnnouncementID = ?", [id])
    revalidatePath("/announcements")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete announcement:", error)
    return { success: false, error }
  }
}

// Feedback actions
export async function createFeedback(data: any) {
  try {
    await db.query(
      `INSERT INTO Feedback (FeedbackID, EventID, StudentID, Rating, Comments, Date, Suggestion, AnonymousFeedbackFlag)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [data.id, data.eventId, data.studentId, data.rating, data.comments, data.date, data.suggestion, data.anonymous],
    )
    revalidatePath("/feedback")
    return { success: true }
  } catch (error) {
    console.error("Failed to create feedback:", error)
    return { success: false, error }
  }
}

export async function updateFeedback(id: number, data: any) {
  try {
    await db.query(
      `UPDATE Feedback 
       SET EventID = ?, StudentID = ?, Rating = ?, Comments = ?, Date = ?, Suggestion = ?, AnonymousFeedbackFlag = ?
       WHERE FeedbackID = ?`,
      [data.eventId, data.studentId, data.rating, data.comments, data.date, data.suggestion, data.anonymous, id],
    )
    revalidatePath("/feedback")
    return { success: true }
  } catch (error) {
    console.error("Failed to update feedback:", error)
    return { success: false, error }
  }
}

export async function deleteFeedback(id: number) {
  try {
    await db.query("DELETE FROM Feedback WHERE FeedbackID = ?", [id])
    revalidatePath("/feedback")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete feedback:", error)
    return { success: false, error }
  }
}

// Report actions
export async function createReport(data: any) {
  try {
    await db.query(
      `INSERT INTO Report (ReportID, ClubID, Year, TotalEvents, TotalFundsUsed, Achievements, Challenges, Summary)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.id,
        data.clubId,
        data.year,
        data.totalEvents,
        data.totalFundsUsed,
        data.achievements,
        data.challenges,
        data.summary,
      ],
    )
    revalidatePath("/reports")
    return { success: true }
  } catch (error) {
    console.error("Failed to create report:", error)
    return { success: false, error }
  }
}

export async function updateReport(id: number, data: any) {
  try {
    await db.query(
      `UPDATE Report 
       SET ClubID = ?, Year = ?, TotalEvents = ?, TotalFundsUsed = ?, Achievements = ?, Challenges = ?, Summary = ?
       WHERE ReportID = ?`,
      [
        data.clubId,
        data.year,
        data.totalEvents,
        data.totalFundsUsed,
        data.achievements,
        data.challenges,
        data.summary,
        id,
      ],
    )
    revalidatePath("/reports")
    return { success: true }
  } catch (error) {
    console.error("Failed to update report:", error)
    return { success: false, error }
  }
}

export async function deleteReport(id: number) {
  try {
    await db.query("DELETE FROM Report WHERE ReportID = ?", [id])
    revalidatePath("/reports")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete report:", error)
    return { success: false, error }
  }
}

// Competition actions
export async function createCompetition(data: any) {
  try {
    await db.query(
      `INSERT INTO Competition (CompetitionID, Name, EventID, PrizePool, CompetitionType, Footfall)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [data.id, data.name, data.eventId, data.prizePool, data.type, data.footfall],
    )
    revalidatePath("/competition")
    return { success: true }
  } catch (error) {
    console.error("Failed to create competition:", error)
    return { success: false, error }
  }
}

export async function updateCompetition(id: number, data: any) {
  try {
    await db.query(
      `UPDATE Competition 
       SET Name = ?, EventID = ?, PrizePool = ?, CompetitionType = ?, Footfall = ?
       WHERE CompetitionID = ?`,
      [data.name, data.eventId, data.prizePool, data.type, data.footfall, id],
    )
    revalidatePath("/competition")
    return { success: true }
  } catch (error) {
    console.error("Failed to update competition:", error)
    return { success: false, error }
  }
}

export async function deleteCompetition(id: number) {
  try {
    await db.query("DELETE FROM Competition WHERE CompetitionID = ?", [id])
    revalidatePath("/competition")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete competition:", error)
    return { success: false, error }
  }
}
