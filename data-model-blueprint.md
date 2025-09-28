# Scheduling Platform Data Model & Logic Blueprint (Refined)

## Alignment With PRD
- Optimized for a **single-company MVP** with multiple facilities and events, matching PRD scope while preserving a path to future multi-tenant support.
- Covers MVP pillars: employee management, facility/event setup, schedule builder, compliance engine, conflict resolution, and publishing.
- Explicitly models **hard compliance rules** (rest windows, hour caps, required days off, role qualifications) and **soft fairness preferences**.
- Supports workflow features such as copying previous weeks, facility-first scheduling, coverage indicators, and auto-scheduling.

## Foundational Entities
- `organizations`
  - `id` (PK), `name`, `primary_timezone`, `created_at`.
  - Retained for forward compatibility; MVP assumes one organization per deployment.
- `license_keys`
  - `id` (PK), `organization_id` (FK), `key`, `status` (`active`, `revoked`), `issued_at`, `expires_at`.
  - Enables Supabase Auth gating via license verification (PRD requirement).
- `members`
  - `id` (PK), `organization_id` (FK), `user_id` (FK > auth.users), `role` (`admin`, `scheduler`, `viewer`), `created_at`.
  - Backing structure for dashboard access control and RLS policies.

## Workforce & Qualifications
- `employees`
  - `id` (PK), `organization_id` (FK), `first_name`, `last_name`, `email`, `status` (`active`, `inactive`), `contract_type` (`forty_hour`, `forty_eight_hour`), `default_facility_id` (optional FK), `hired_on`, `terminated_on`.
  - `contract_type` drives required days off and hour caps.
- `employee_roles`
  - `id` (PK), `employee_id` (FK), `role_code` (FK > `roles.code`), `is_primary`, `assigned_at`.
- `roles`
  - `code` (PK), `organization_id` (FK), `name`, `description`, `is_specialized`.
  - Standardizes references in requirements and assignments.
- `employee_skills`
  - `id` (PK), `employee_id` (FK), `skill_code` (FK > `skills.code`), `level`, `validated_on`, `expires_on`.
- `skills`
  - `code` (PK), `organization_id` (FK), `name`, `description`.
  - Distinguishes certifications (forklift, night audit) from general skills.
- `employee_preferences`
  - `id` (PK), `employee_id` (FK), `preference_type` (`shift_time`, `facility`, `days_off`, `role`), `value`, `weight` (0–1), `notes`.
  - Input for fairness and soft-rule scoring.
- `employee_availability`
  - `id` (PK), `employee_id` (FK), `day_of_week`, `start_time`, `end_time`, `is_available`, `effective_from`, `effective_to`.
  - Supports recurring availability and temporary overrides.
- `employee_unavailability`
  - `id` (PK), `employee_id` (FK), `date`, `reason`, `source` (`manager`, `employee`), optional `note`.
  - Captures vacations/blackout dates aligned with compliance engine.

## Facilities, Capacity, and Events
- `facilities`
  - `id` (PK), `organization_id` (FK), `name`, `location_label`, `timezone_override`, `is_active`.
- `facility_operating_hours`
  - `id` (PK), `facility_id` (FK), `day_of_week`, `open_time`, `close_time`, `is_closed`.
  - Informs schedule template generation and coverage targets.
- `shift_patterns`
  - `id` (PK), `facility_id` (FK), `label`, `start_time`, `end_time`, `duration_minutes`, `applies_on` (int array for days of week), `is_overnight`.
  - Represents the reusable shift skeletons referenced during seeding.
- `shift_pattern_requirements`
  - `id` (PK), `shift_pattern_id` (FK), `role_code`, `min_headcount`, `max_headcount`, `required_skills` (JSONB).
  - Captures per-role staffing levels for pattern-based generation.
- `events`
  - `id` (PK), `organization_id` (FK), `name`, `starts_at`, `ends_at`, `primary_facility_id` (nullable FK), `description`, `status` (`planned`, `confirmed`).
- `event_shift_overrides`
  - `id` (PK), `event_id` (FK), `facility_id` (FK), `override_type` (`add_shift`, `adjust_requirement`, `suspend_pattern`), `payload` (JSONB).
  - Handles one-off staffing demands without mutating base patterns.

## Scheduling Periods & Shifts
- `schedule_periods`
  - `id` (PK), `organization_id` (FK), `label`, `start_date`, `end_date`, `status` (`draft`, `published`, `archived`), `copied_from_period_id` (self-FK), `auto_generated_at`, `published_at`.
  - `copied_from_period_id` supports "copy previous week" quick action.
- `shifts`
  - `id` (PK), `schedule_period_id` (FK), `facility_id` (FK), `event_id` (nullable FK), `shift_pattern_id` (nullable FK), `start_time`, `end_time`, `duration_minutes`, `source` (`pattern`, `event`, `manual`), `notes`.
  - `shift_pattern_id` ties the generated instance to its origin for updates.
- `shift_requirements`
  - `id` (PK), `shift_id` (FK), `role_code`, `required_headcount`, `priority` (`core`, `optional`), `required_skills` (JSONB), `minimum_experience_years` (nullable).
  - Normalized alternative to a JSON blob, enabling coverage indicators per role.
- `shift_assignments`
  - `id` (PK), `shift_id` (FK), `employee_id` (FK), `role_code`, `assignment_type` (`auto`, `manual`), `created_by_member_id` (FK > members.id), `created_at`.
  - Unique constraint on (`shift_id`, `employee_id`).
- `assignment_audit`
  - `id` (PK), `shift_assignment_id` (nullable FK), `schedule_period_id` (FK), `action_type` (`created`, `updated`, `removed`, `auto_generate`, `manual_override`), `payload` (JSONB), `actor_member_id`, `acted_at`.
  - Logs generator runs and manual changes for undo/redo.

## Compliance & Validation
- `compliance_rules`
  - `id` (PK), `organization_id` (FK), `slug` (`max_one_shift_per_day`, `rest_11_hours`, etc.), `rule_type` (`hard`, `soft`), `config` (JSONB), `is_active`.
  - Pre-seed baseline rules aligned with PRD requirements.
- `compliance_evaluations`
  - `id` (PK), `schedule_period_id` (FK), `evaluated_at`, `trigger` (`auto`, `manual`), `summary` (JSONB).
- `compliance_results`
  - `id` (PK), `evaluation_id` (FK), `rule_id` (FK), `shift_id` (nullable FK), `employee_id` (nullable FK), `severity` (`error`, `warning`), `message`, `details`, `resolved_at`.
  - Allows multiple results per evaluation run without duplication.
- `soft_rule_scores`
  - `id` (PK), `schedule_period_id` (FK), `employee_id` (FK), `score_type` (`fair_distribution`, `preference_alignment`), `score_value`, `max_score`.
  - Facilitates fairness metrics surfaced in dashboards.

## Coverage & Insights
- `coverage_snapshots`
  - `id` (PK), `shift_id` (FK), `role_code`, `required_headcount`, `assigned_headcount`, `captured_at`, `data_source` (`computed`, `manual`).
  - Supports visual indicators (staffed vs required).
- `schedule_metrics`
  - `id` (PK), `schedule_period_id` (FK), `metric_type` (`total_hours`, `overtime_hours`, `compliance_errors`), `value`, `calculated_at`.
- Materialized view idea: `shift_conflicts_view` summarizing overlapping assignments, rest violations, and unfilled requirements for immediate UI access.

## Publishing & Notifications (MVP Touchpoints)
- `schedule_publications`
  - `id` (PK), `schedule_period_id` (FK), `published_by_member_id`, `published_at`, `channel` (`web`, `pdf`, `excel`), `public_link_token`.
- `notification_queue`
  - `id` (PK), `schedule_period_id` (FK), `employee_id` (FK), `notification_type` (`email`, `sms`), `payload` (JSONB), `status` (`pending`, `sent`, `failed`), `scheduled_for`.
  - Leverages Supabase functions for actual delivery in Phase 2.

## Relationship Summary
- One organization owns many facilities, employees, shift patterns, and schedule periods.
- Facilities define baseline coverage via `shift_patterns` and `shift_pattern_requirements`; events layer overrides on top.
- Schedule periods create concrete `shifts` that inherit requirements, then `shift_assignments` link employees to shifts.
- Compliance evaluations reference both shifts and employees, feeding conflict displays; results feed `coverage_snapshots` and fairness scoring.

## Scheduling Workflow Logic (Expanded)
1. **Facility Setup**: Scheduler defines facility operating hours and shift patterns with role requirements.
2. **Employee Setup**: Capture contracts, skills, recurring availability, and preferences.
3. **Period Creation**: New `schedule_period` seeded from patterns/events. Patterns generate shifts; overrides adjust requirements or add/remove shifts.
4. **Auto-Schedule**: Generator reads `shift_requirements`, `employee_availability`, contracts, skills, and soft preferences to populate `shift_assignments` (`assignment_type = 'auto'`).
5. **Manual Adjustments**: Drag-drop and quick actions update assignments; operations recorded in `assignment_audit` for undo history.
6. **Real-Time Validation**: After changes, compliance service evaluates hard rules (rest, single-shift-per-day, hour caps, availability, cross-facility same-day) and soft rules; outputs `compliance_results` and updates coverage snapshots.
7. **Coverage Monitoring**: UI queries `coverage_snapshots`/`shift_requirements` to highlight understaffed roles.
8. **Publishing**: Once no hard-rule errors remain, schedule is published; `schedule_publications` log event and `notification_queue` seeds employee alerts.

## Data Integrity & Governance
- **RLS**: All core tables filter on `organization_id`; `members` role controls create/update privileges.
- **Constraints**:
  - `shift_assignments` unique on (`shift_id`, `employee_id`).
  - `shift_requirements` unique on (`shift_id`, `role_code`).
  - `employee_availability.start_time < end_time`; overnight handled via `effective_to` plus `is_overnight` on patterns.
  - `compliance_results.severity = 'error'` when `rule_type = 'hard'` (enforced via check or trigger).
- **Indexes**:
  - `shift_assignments` on (`employee_id`, `start_time`, `end_time`) via join to `shifts` for conflict detection.
  - `shifts` composite on (`schedule_period_id`, `facility_id`, `start_time`).
  - `compliance_results` on (`schedule_period_id`, `severity`).
  - `schedule_periods` on (`organization_id`, `status`).

## Implementation Roadmap
1. **Schema Layer 1**: organizations, license_keys, members, roles, skills.
2. **Layer 2**: employees, employee_*, facilities, operating hours.
3. **Layer 3**: shift_patterns, shift_pattern_requirements, events, overrides.
4. **Layer 4**: schedule_periods, shifts, shift_requirements, shift_assignments, assignment_audit.
5. **Layer 5**: compliance_rules, evaluations, results, coverage snapshots, soft_rule_scores.
6. **Layer 6**: publications, notification_queue, materialized views (phase as needed).

## Immediate Validation Tasks
- Produce ERD to confirm cardinalities (especially pattern > shift generation and compliance references).
- Draft Supabase migration files aligned to roadmap order; include seed data for two facilities (hotel, hospital) per PRD use cases.
- Prototype compliance evaluation function leveraging `employee_contract_type`, rest calculations, and cross-facility checks.
- Define fairness scoring weights (soft rules) in collaboration with stakeholders before implementing auto-scheduling heuristics.

## UI Interaction Blueprint (Excel-Style Grid)
- **Grid Layout**: Weekly/monthly planner renders as a matrix with facilities (rows) and time slots/days (columns), mirroring spreadsheet familiarity.
- **Employee Sidebar**: Persistent left sidebar lists employees with search/filter (by role, skill, availability). Dragging an employee into a grid cell creates/updates `shift_assignments`.
- **Clipboard Actions**: Copy/paste/delete leverage the combination of `shift_id` and `shift_requirements` to replicate assignments or clear slots while preserving requirement baselines.
- **Drag & Drop**: Moving assignments across cells triggers updates to `shift_assignments` and logs entries in `assignment_audit` for undo support.
- **Bulk Operations**: Selecting multiple cells enables batch actions (copy previous week, bulk clear) using `schedule_periods.copied_from_period_id` and batched assignment mutations.
- **Coverage Feedback**: Each cell displays required vs. assigned headcount derived from `shift_requirements` and `coverage_snapshots`, updating in real time after interactions.
- **Compliance Surfacing**: Cells show inline warnings sourced from `compliance_results` (e.g., rest violation) with tooltips for details.
- **Keyboard Shortcuts**: Optional support for arrow navigation and enter/tab to open assignment dialogs, reinforcing the spreadsheet feel.
