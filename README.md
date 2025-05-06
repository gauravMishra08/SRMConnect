# SRMConnect - Club Management Dashboard

## Overview
SRMConnect is a Student Club Management System designed to help club administrators manage their clubs, members, events, finances, resources, and more. This responsive dashboard allows club admins to easily view and manage data fetched from a local MySQL database. It supports CRUD operations (Create, Read, Update, Delete) for all club-related data.

## Features
- **Club Overview**: Displays club details such as name, domain, founded year, president/vice president, and description.
- **Members Management**: Lists club members along with their roles and join dates.
- **Event Management**: Shows upcoming and past events, including attendance statistics.
- **Fund Management**: Provides a summary of fund utilization, including expenses and approvals.
- **Resource Management**: Displays details about club resources like availability, quantity, and maintenance schedules.
- **Sessions, Competitions, and Awards**: Information on sessions conducted, ongoing competitions, and awarded members.
- **Announcements**: A section for viewing and posting club-related announcements.
- **Feedback Summary**: Displays feedback and suggestions from members and event participants.
- **Report Overview**: Displays achievements, challenges, and summaries for the club.

## Database Schema
The dashboard pulls data from the following tables:
- **Students**
- **Clubs**
- **Club Memberships**
- **Events**
- **Session**
- **Competition**
- **Funds**
- **Expenses**
- **Resources**
- **Feedback**
- **Announcements**
- **Report**
- **Awards**

## Setup
1. Clone the repository.
2. Set up the MySQL database locally using the provided schema.
3. Install necessary dependencies.
4. Ensure your database is running locally and adjust connection settings in the backend code.

## Future Features
- **Real-time Notifications**: Alert admins about new feedback, upcoming events, or fund changes.
- **User Authentication**: Add login/signup functionality for secure admin access.
