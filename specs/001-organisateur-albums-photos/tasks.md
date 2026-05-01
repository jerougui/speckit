# Tasks: Organisateur d'Albums Photos

**Input**: Design documents from `/specs/001-organisateur-albums-photos/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-contract.md

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Initialize Vite project structure with `package.json`, `vite.config.js`, `src/`, and `tests/`
- [ ] T002 Add base frontend scaffolding in `src/index.html`, `src/styles.css`, and `src/main.js`
- [ ] T003 Install Vite, sql.js, and Vitest dependencies in `package.json`
- [ ] T004 [P] Configure Vitest test runner in `vitest.config.js` and add basic test script in `package.json`
- [ ] T005 [P] Create initial SQLite adapter file in `src/lib/sqlite-adapter.js`

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T006 Create album store module in `src/lib/album-store.js` with CRUD signatures for albums
- [ ] T007 Create photo model module in `src/lib/photo-model.js` with metadata parsing and validation
- [ ] T008 Create UI component stub for album list in `src/ui/album-list.js`
- [ ] T009 Create UI component stub for photo tile view in `src/ui/photo-tile-view.js`
- [ ] T010 Create drag-and-drop controller module in `src/ui/drag-drop.js`
- [ ] T011 [P] Implement SQLite schema initialization in `src/lib/sqlite-adapter.js` for Album and Photo tables
- [ ] T012 [P] Add French localization content and labels in `src/index.html` and `src/main.js`

---

## Phase 3: User Story 1 - Créer et Organiser des Albums par Date (Priority: P1) 🎯 MVP

**Goal**: Permettre la création d'albums et le regroupement automatique par date.

**Independent Test**: Créer un album et vérifier que les albums sont listés selon leur date et persistés localement.

### Tests

- [ ] T013 [P] [US1] Add unit tests for album creation and date grouping in `tests/unit/album-store.test.js`
- [ ] T014 [P] [US1] Add unit tests for photo metadata parsing in `tests/unit/photo-model.test.js`

### Implementation

- [ ] T015 [US1] Implement `saveAlbum()` and `getAlbums()` in `src/lib/album-store.js`
- [ ] T016 [US1] Implement album grouping and ordering logic in `src/lib/album-store.js`
- [ ] T017 [US1] Implement `savePhoto()` and `getPhotos(albumId)` in `src/lib/photo-model.js`
- [ ] T018 [US1] Add album creation form and data binding in `src/ui/album-list.js`
- [ ] T019 [US1] Load albums from SQLite on startup in `src/main.js`
- [ ] T020 [US1] Persist album order and metadata locally via `src/lib/sqlite-adapter.js`

---

## Phase 4: User Story 2 - Réorganiser les Albums par Glisser-Déposer (Priority: P2)

**Goal**: Permettre le réordonnancement des albums sur la page principale par glisser-déposer.

**Independent Test**: Déplacer un album, vérifier l'ordre visuel, recharger la page et confirmer que l'ordre persiste.

### Tests

- [ ] T021 [P] [US2] Add unit tests for reorder persistence in `tests/unit/album-store.test.js`
- [ ] T022 [P] [US2] Add unit tests for drag-and-drop event handling in `tests/unit/drag-drop.test.js`

### Implementation

- [ ] T023 [US2] Implement `dragstart`, `dragover`, and `drop` handlers in `src/ui/drag-drop.js`
- [ ] T024 [US2] Wire album reorder updates from `src/ui/album-list.js` to `src/lib/album-store.js`
- [ ] T025 [US2] Persist new album order in SQLite using `src/lib/album-store.js`
- [ ] T026 [US2] Update `src/main.js` to re-render albums after reorder
- [ ] T027 [US2] Ensure drag-and-drop remains responsive for 50+ albums in `src/ui/drag-drop.js`

---

## Phase 5: User Story 3 - Visualiser les Photos en Tuiles dans un Album (Priority: P3)

**Goal**: Afficher les photos d'un album dans une interface en tuiles et permettre l'ouverture d'une photo en plein écran.

**Independent Test**: Ouvrir un album et vérifier l'affichage en tuiles plus l'ouverture d'une photo.

### Tests

- [ ] T028 [P] [US3] Add unit tests for tile rendering in `tests/unit/photo-tile-view.test.js`
- [ ] T029 [P] [US3] Add unit tests for photo preview click events in `tests/unit/photo-tile-view.test.js`

### Implementation

- [ ] T030 [US3] Implement tile layout rendering in `src/ui/photo-tile-view.js`
- [ ] T031 [US3] Implement photo click preview behavior in `src/ui/photo-tile-view.js`
- [ ] T032 [US3] Load album photos and render tiles when an album is selected in `src/main.js`
- [ ] T033 [US3] Add local thumbnail handling and metadata display in `src/lib/photo-model.js`
- [ ] T034 [US3] Ensure photo preview is displayed en plein écran ou en modal dans `src/ui/photo-tile-view.js`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Améliorer l’expérience, stabiliser la persistance et vérifier la qualité globale.

- [ ] T035 [P] Optimize SQLite queries and caching in `src/lib/sqlite-adapter.js`
- [ ] T036 [P] Add French accessibility labels and interface text review in `src/index.html` and `src/styles.css`
- [ ] T037 [P] Fix UI responsiveness and performance for album list and photo grid in `src/styles.css` and `src/ui/*`
- [ ] T038 [P] Update `specs/001-organisateur-albums-photos/quickstart.md` with any implementation-specific instructions
- [ ] T039 [P] Run `npm test` and fix any failing tests in `tests/unit/` and `tests/integration/`
- [ ] T040 [P] Add a local-first security check in `src/lib/sqlite-adapter.js` to ensure no remote upload behavior is present

---

## Dependencies & Execution Order

- Phase 1 must complete before Phase 2.
- Phase 2 must complete before all user story phases.
- User Story phases can begin in parallel after Phase 2 but should remain independently testable.
- Phase 6 depends on the completion of all user story phases.

### User Story Dependencies

- **US1**: Base album creation, grouping, and persistence.
- **US2**: Depends on US1 foundation but remains testable once album store and UI are implemented.
- **US3**: Depends on album selection and photo storage from US1, but tile rendering can be developed once the photo model exists.

## Parallel Opportunities

- `T004`, `T011`, `T012`, `T013`, `T014`, `T021`, `T022`, `T028`, and `T029` are parallelizable work on independent files.
- `T006`, `T007`, `T008`, `T009`, and `T010` can be worked in parallel during foundational setup.
- Once Phase 2 is complete, US2 and US3 work packages can proceed in parallel with US1 validation.

## Implementation Strategy

1. Complete Phase 1 and Phase 2 to establish the local SQLite-backed library-first architecture.
2. Deliver US1 as the MVP increment and validate album creation/grouping independently.
3. Add US2 drag-and-drop reorder after US1 is stable.
4. Add US3 photo tile preview after the album and photo storage model is stable.
5. Use Phase 6 for performance, French UI polish, and security validation.
