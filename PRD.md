# Shift Scheduling Application - PRD

## Overview
A web-based shift scheduling application that helps business scheduling managers create compliant facility-based and event-based schedules efficiently. Sold B2B to business owners who provide access to their scheduling staff.

## Target Users
- **Primary**: Scheduling managers/supervisors who create employee schedules
- **Secondary**: Business owners who purchase licenses
- **End Goal**: Replace manual scheduling with automated, compliant schedule generation

## Core Value Proposition
Transform 30-60 minute manual facility scheduling into <5 minute automated, compliant schedule creation with full coverage guarantees.

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
**Employee-Level Rules**
- ≤1 shift per day per employee
- 40-48 hours per week maximum
- ≥11 hours rest between shifts
- Availability/eligibility enforcement
- Cross-facility restrictions (e.g., can't work at 2 locations same day)

**Facility-Level Rules**
- Minimum staffing requirements per shift (e.g., must have 2 employees minimum)
- Role-based requirements (e.g., must have 1 supervisor per shift)
- Skill/certification requirements (e.g., forklift certified for warehouse shifts)
- Event-specific compliance (e.g., special training required for conference events)

**System Features**
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

### Restaurant Chain
- **Setup**: 3 locations (Downtown, Mall, Airport), each with different shift patterns
- **Requirements**: Each location needs 2 cooks + 3 servers + 1 manager per shift
- **Challenge**: Weekend shifts need extra staff, some employees certified for multiple locations
- **Solution**: Define facility-specific templates, auto-assign based on certifications and availability

### Event Management Company
- **Setup**: Simultaneous conferences requiring specialized staff
- **Requirements**: Conference A needs 5 AV techs + 2 coordinators, Conference B needs 3 security + 4 hosts
- **Challenge**: Staff with multiple certifications, events at different venues
- **Solution**: Event-based scheduling with skill matching and venue assignments

### Retail Chain
- **Setup**: 5 stores with varying sizes and customer traffic
- **Requirements**: Large stores need 4 cashiers + 2 supervisors, small stores need 2 cashiers + 1 supervisor
- **Challenge**: Holiday seasons require 50% more staff, employees prefer certain locations
- **Solution**: Template-based scheduling with seasonal adjustments and preference optimization

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