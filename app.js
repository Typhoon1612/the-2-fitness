/*
  OUR FITNESS — RENDERING
  Builds the page from FITNESS_CONTENT (data.js). Content changes belong in
  data.js; this file only changes when the page structure changes.
*/

(() => {
  "use strict";

  const EXERCISE_CATEGORIES = new Set(["cardio", "strength", "core"]);
  const EXERCISE_FIELDS = ["name", "category", "sets", "reps", "focus", "note"];
  const PLAN_A_FIELDS = ["summary", "durationMinutes"];
  const PLAN_B_FIELDS = ["summary", "activity", "durationMinutes", "guidance"];
  const SCHEDULE_FIELDS = ["day", "activity"];

  // Separates mistakes in data.js (shown to the reader verbatim) from bugs in this file.
  class ContentError extends Error {
    constructor(message) {
      super(message);
      this.name = "ContentError";
    }
  }

  /* ---------- Validation: fail fast with a message that points at data.js ---------- */

  function isNonEmptyString(value) {
    return typeof value === "string" && value.trim() !== "";
  }

  function assertObject(value, label) {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
      throw new ContentError(`data.js: ${label} is missing or is not an { ... } object.`);
    }
  }

  function assertTextFields(record, fields, label) {
    assertObject(record, label);
    const missingField = fields.find((field) => !isNonEmptyString(record[field]));
    if (missingField) {
      throw new ContentError(`data.js: ${label} needs a text value for "${missingField}".`);
    }
  }

  function assertNonEmptyList(value, label) {
    if (!Array.isArray(value) || value.length === 0) {
      throw new ContentError(`data.js: ${label} must be a [ ... ] list with at least one entry.`);
    }
  }

  function validateExercise(exercise, index) {
    const label = `Plan A exercise #${index + 1}`;
    assertTextFields(exercise, EXERCISE_FIELDS, label);
    if (!EXERCISE_CATEGORIES.has(exercise.category)) {
      const allowed = [...EXERCISE_CATEGORIES].join(", ");
      throw new ContentError(
        `data.js: ${label} ("${exercise.name}") has category "${exercise.category}". Use one of: ${allowed}.`,
      );
    }
  }

  function validateContent(content) {
    assertObject(content, "FITNESS_CONTENT");
    assertTextFields(content.planA, PLAN_A_FIELDS, "planA");
    assertNonEmptyList(content.planA.exercises, "planA.exercises");
    content.planA.exercises.forEach(validateExercise);
    assertTextFields(content.planB, PLAN_B_FIELDS, "planB");
    assertNonEmptyList(content.weeklySchedule, "weeklySchedule");
    content.weeklySchedule.forEach((entry, index) => {
      assertTextFields(entry, SCHEDULE_FIELDS, `weeklySchedule entry #${index + 1}`);
    });
  }

  /* ---------- DOM helpers: textContent only, so content can never inject HTML ---------- */

  function createElement(tagName, { className, text } = {}, children = []) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    element.append(...children);
    return element;
  }

  function getElement(id) {
    const element = document.getElementById(id);
    if (!element) {
      throw new Error(`index.html is missing the element with id="${id}".`);
    }
    return element;
  }

  function pluralize(count, singular, plural) {
    return count === 1 ? singular : plural;
  }

  function countByCategory(exercises) {
    const counts = new Map();
    exercises.forEach(({ category }) => counts.set(category, (counts.get(category) ?? 0) + 1));
    return counts;
  }

  /* ---------- Components ---------- */

  function createTag(text) {
    return createElement("span", { className: "tag", text });
  }

  function createStat(value, label) {
    return createElement("div", { className: "stat" }, [
      createElement("b", { text: String(value) }),
      createElement("span", { text: label }),
    ]);
  }

  function createCountStat(count, singular, plural) {
    return createStat(count, pluralize(count, singular, plural));
  }

  function createListRow(start, end) {
    return createElement("div", { className: "list-row" }, [start, end]);
  }

  function createExerciseRow(exercise, index) {
    return createElement("tr", {}, [
      createElement("td", { text: String(index + 1) }),
      createElement("td", {}, [createElement("strong", { text: exercise.name })]),
      createElement("td", { text: exercise.sets }),
      createElement("td", { text: exercise.reps }),
      createElement("td", {}, [createTag(exercise.focus)]),
    ]);
  }

  function createExerciseCard(exercise) {
    return createElement("article", { className: "exercise" }, [
      createElement("h3", { text: exercise.name }),
      createTag(exercise.focus),
      createElement("p", { text: exercise.note }),
    ]);
  }

  /* ---------- Sections ---------- */

  function renderPlanA({ summary, durationMinutes, exercises }) {
    const counts = countByCategory(exercises);

    getElement("planASummary").textContent = `${summary} · Approximately ${durationMinutes} minutes`;
    getElement("planAStats").replaceChildren(
      createStat(durationMinutes, "minutes"),
      createCountStat(counts.get("strength") ?? 0, "strength movement", "strength movements"),
      createCountStat(counts.get("core") ?? 0, "core exercise", "core exercises"),
    );
    getElement("workoutRows").replaceChildren(...exercises.map(createExerciseRow));
    getElement("exerciseNotes").replaceChildren(...exercises.map(createExerciseCard));
  }

  function renderPlanB({ summary, activity, durationMinutes, guidance }) {
    getElement("planBSummary").textContent = summary;
    getElement("planBDuration").textContent = `${durationMinutes} minutes`;
    getElement("planBDetails").replaceChildren(
      createListRow(createElement("span", { text: "Activity" }), createElement("strong", { text: activity })),
      createListRow(
        createElement("span", { text: "Duration" }),
        createElement("strong", { text: `${durationMinutes} min` }),
      ),
    );
    getElement("planBGuidance").textContent = guidance;
  }

  function renderWeeklySchedule(schedule) {
    const rows = schedule.map(({ day, activity }) =>
      createListRow(createElement("strong", { text: day }), createElement("span", { text: activity })),
    );
    getElement("weeklySchedule").replaceChildren(...rows);
  }

  /* ---------- Entry point ---------- */

  function showLoadError(error) {
    const message =
      error instanceof ContentError
        ? error.message
        : "Something went wrong while building the page. Open the browser console (F12) for details.";
    const banner = getElement("loadError");
    banner.textContent = message;
    banner.hidden = false;
  }

  function loadContent() {
    // A typo in data.js stops that file from running, which leaves FITNESS_CONTENT undefined.
    if (typeof FITNESS_CONTENT === "undefined") {
      throw new ContentError(
        "data.js did not load. Check that it sits next to index.html and has no typing mistakes, such as a missing comma, bracket or quotation mark.",
      );
    }
    validateContent(FITNESS_CONTENT);
    return FITNESS_CONTENT;
  }

  function init() {
    try {
      const content = loadContent();
      renderPlanA(content.planA);
      renderPlanB(content.planB);
      renderWeeklySchedule(content.weeklySchedule);
    } catch (error) {
      console.error(error);
      showLoadError(error);
    }
  }

  init();
})();
