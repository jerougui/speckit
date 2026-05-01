<!--
Sync Impact Report
- Version change: placeholder template → 1.0.0
- Modified principles: added Library-First, Test-First, Functional Design, Composable Independence, Pragmatic Simplicity
- Added sections: Additional Constraints, Development Workflow
- Removed sections: none
- Templates checked: ✅ .specify/templates/plan-template.md, ✅ .specify/templates/spec-template.md, ✅ .specify/templates/tasks-template.md
- Deferred items: none
-->

# Speckit Constitution

## Core Principles

### I. Library-First
Every feature MUST begin as a standalone library. Libraries MUST be independently usable, have a well-defined public contract, and expose behavior through composable APIs rather than application-specific side effects.

### II. Test-First
Test-driven development is mandatory. Every library MUST start with a failing test that defines its expected behavior, then move through red-green-refactor with no implementation before the test exists.

### III. Functional Design
Library implementations MUST favor pure functions, explicit inputs, and immutable values. Side effects are restricted to small, isolated adapters that are separately tested and composed.

### IV. Independent, Composable Design
Every library MUST support independent validation and reuse. Shared behavior is composed from smaller libraries rather than duplicated, and dependencies are chosen to keep the smallest practical contract.

### V. Pragmatic Simplicity
Designs MUST be simple enough to understand, test, and evolve. Complexity is only justified when it is the simplest correct solution for a real requirement.

## Additional Constraints
The project MUST maintain a library-first architecture even when delivering higher-level tools. Application-level artifacts are assembled from libraries; no feature may be implemented solely as an internal monolith.

## Development Workflow
Workflows MUST enforce strict TDD and functional style. Every pull request MUST include tests for new behavior, a clear library contract, and review evidence that the change remains independently testable.

## Governance
This constitution is the primary source of development rules for the repository. All feature definitions, plans, and implementation work MUST be measured against these principles.

- Amendments MUST be captured in a revised constitution document and approved by the team before the next development cycle.
- Changes that affect the library-first architecture or TDD requirement MUST include a migration plan and explicit review notes.
- Compliance reviews MUST verify that new libraries are independently testable, that tests were written first, and that implementations remain functionally decomposed.
- If a principle conflict arises, the team MUST resolve it by preserving the stronger requirement for independent library quality and test-first behavior.

**Version**: 1.0.0 | **Ratified**: 2026-05-01 | **Last Amended**: 2026-05-01
