# Shift Scheduling Application - PRD

## Overview
A web-based workforce scheduling platform for mid-sized organizations that streamlines completing weekly and monthly rosters for a single company. Scheduling managers work in a modern dashboard to automate or semi-automate schedule generation while enforcing hard compliance rules like minimum 11-hour rest periods and balancing soft preferences such as fair distribution of shifts.

## Target Users
- **Primary**: Workforce managers, operations leads, and schedulers responsible for completing weekly or monthly rosters
- **Secondary**: HR or labor-compliance administrators who ensure shifts comply with regulations and contracts
- **Collaborators**: Department supervisors who supply coverage requirements and approve final rosters
- **End Goal**: Complete accurate, compliant schedules quickly while keeping stakeholders aligned

## Core Value Proposition
Eliminate multi-hour manual scheduling by fully automating weekly and monthly roster generation, delivering compliant coverage plans in minutes while honoring both hard constraints and fairness preferences.

## MVP Features

### 1. Single Dashboard Interface
**Schedule Builder Core**
- **Multi-view modes**: By facility, by employee, or combined facility-employee grid
- **Facility-first scheduling**: Start with facility coverage needs, then assign employees
- **Drag-drop assignment**: Move employees between shifts and facilities
- **Coverage indicators**: Visual display showing staffed vs. required positions per facility
- **Auto-schedule generator**: One-click compliant schedule creation based on facility requirements
- **Real-time compliance validation**: Visual warnings for understaffed or rule violations
- **Quick actions**: Copy previous week, save facility templates, bulk assign shifts

### 2. Employee Management
- Add/import employees with roles, skills, and availability
- Set max hours per employee (40-48 hrs/week)
- Track basic preferences (morning/evening/weekend shifts)
- Assign certifications and role qualifications
- Bulk availability updates

### 3. Facility & Event Management
**Facility Setup**
- Import/create facilities (e.g., "Main Store", "Warehouse A", "Downtown Location")
- Define facility-specific requirements and operating hours
- Set default shift patterns per facility (e.g., 3 shifts/day: 6am-2pm, 2pm-10pm, 10pm-6am)
- Configure role requirements per facility (e.g., must have 1 manager, 2 cashiers per shift)

**Event Management**
- Create special events (e.g., "Holiday Sale", "Conference 2025", "Black Friday")
- Define event-specific staffing needs and duration
- Set special skill/certification requirements for events
- Override normal facility patterns during events

**Shift Specifications**
- Define number of employees needed per shift per facility
- Set role-based requirements (e.g., 2 servers + 1 cook + 1 manager)
- Create shift templates for recurring patterns
- Multi-facility overview to manage all locations simultaneously

### 4. Compliance Engine (Hard Rules)
**Employee-Level Rules**`r`n- Maximum one shift per employee per day`r`n- Enforce contracted weekly hour caps (40- or 48-hour limits)`r`n- Minimum 11 hours rest between shifts`r`n- Required days off: 40-hour employees receive 2 days off weekly; 48-hour employees must and may only take 1 day off weekly`r`n- Availability/eligibility enforcement`r`n- Cross-facility restrictions (e.g., can't work at 2 locations the same day)`r`n`r`n**Facility-Level Rules**
- Minimum staffing requirements per shift (e.g., must have 2 employees minimum)
- Role-based requirements (e.g., must have 1 supervisor per shift)
- Skill/certification requirements (e.g., forklift certified for warehouse shifts)
- Event-specific compliance (e.g., special training required for conference events)

**Soft Rules (Preferences)**`r`n- Distribute premium or undesirable shifts evenly across qualified employees`r`n- Prefer continuous days off when satisfying required rest periods and coverage needs`r`n`r`n**System Features**
- Real-time violation warnings with visual indicators
- Auto-suggestions for valid alternatives when conflicts occur
- Bulk compliance checking across all facilities
- Coverage gap alerts (e.g., "Warehouse B evening shift understaffed")

### 5. Schedule Publishing
- One-click publish to shareable web link
- PDF/Excel export capabilities
- Email/SMS notifications to employees
- Employee view-only access to see their schedules

### 6. Conflict Resolution
- Visual warnings for rule violations (red highlighting)
- Auto-suggest valid alternatives when conflicts occur
- Undo/redo functionality with change history

## Technical Architecture

### Stack
- **Frontend**: Next.js with React and shadcn/ui components
- **Backend**: Next.js API routes
- **Database**: Supabase (PostgreSQL with real-time features)
- **Authentication**: Supabase Auth with license key system
- **Hosting**: Vercel (seamless Next.js + Supabase integration)

### Key Benefits of Supabase
- Real-time updates for collaborative scheduling
- Built-in authentication and user management
- Automatic API generation
- Row-level security for multi-tenant data isolation
- Built-in email/SMS capabilities for notifications

## Success Metrics
1. **Efficiency**: Schedule creation time reduced from 30-60 min to <5 min
2. **Coverage**: 100% facility coverage - no understaffed shifts
3. **Compliance**: Zero labor law violations in generated schedules
4. **Quality**: Optimal employee distribution across facilities and roles
5. **Adoption**: Non-technical managers can use immediately without training
6. **Reliability**: 99.9% uptime with real-time sync across all facilities

## Development Phases
**Phase 1 (6-8 weeks)**: Core scheduling with compliance engine
**Phase 2 (2-3 weeks)**: Employee notifications and view-only access
**Phase 3 (2-3 weeks)**: Analytics dashboard and reporting features
## Use Case Examples

### Hotel Macedonia Pallas
- 24/7 luxury hotel with three daily shifts: 06:00-14:00, 14:00-22:00, 22:00-06:00
- Requires exactly two qualified employees on every shift across front desk, concierge, and night audit roles
- Goal: Remove manual spreadsheet updates and guarantee compliant rest windows for staff rotating between day and night duty

### Hospital Saint Loukas
- High-acuity hospital operating 24/7 with three shifts: 07:00-15:00, 15:00-23:00, 23:00-07:00
- Morning and afternoon shifts demand three clinicians each; overnight coverage can drop to two
- Compliance engine must handle different staffing minima per shift type while honoring certification and rest rules

### Match Day Event Staffing
- One-off sports match needing 50 event staff on a single 17:00-23:00 shift
- Event treated as an additional facility so employees can be scheduled alongside their Hotel Macedonia Pallas or Saint Loukas assignments
- Scheduling engine verifies that event shifts do not violate weekly hour caps, required days off, or continuous-rest preferences
## Business Model
- License-based pricing per business location
- Business owner purchases, assigns access to scheduling manager
- No per-employee pricing to encourage adoption

## Non-Goals (Out of Scope for MVP)
- Mobile applications
- Offline functionality
- Employee self-service (shift swapping, time-off requests)
- Complex reporting and analytics
- Multi-location management
- Advanced optimization algorithms
- Integration with payroll systems








