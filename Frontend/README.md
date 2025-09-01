## User Experience by Role:
## Admin Workflow:
1.	Login as admin (admin@example.com / admin123)
2.	See "Add Resource" link in navbar
3.	Navigate to AddResource page
4.	Create new resources for the system
5.	Manage all bookings and resources

## Regular User Workflow:
1.	Login as regular user (user@example.com / password)
2.	No "Add Resource" link visible
3.	Can browse and book existing resources
4.	Can view their own bookings
5.	Cannot modify system resources

## Technical Implementation:
•	Conditional Rendering - Admin-only navigation elements
•	Route Protection - useEffect hooks for access control
•	Automatic Redirects - Seamless user experience
•	State Management - Redux selectors for role verification
