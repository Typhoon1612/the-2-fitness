/*
  OUR FITNESS — CONTENT
  This is the only file you need to edit to change what the website shows.
  Save it, then refresh index.html in the browser.

  Every exercise needs a "category" of "cardio", "strength" or "core".
  The Plan A stats (strength movements, core exercises) are counted from it,
  so they never need to be updated by hand.
*/

const FITNESS_CONTENT = {
  planA: {
    summary: "Strength + cardio",
    durationMinutes: "45–60",
    exercises: [
      { name: "Incline Treadmill", category: "cardio", sets: "—", reps: "30 min", focus: "Cardio · warm-up", note: "Walk at a moderate, sustainable incline. Adjust speed and incline to your fitness level." },
      { name: "Goblet Squat", category: "strength", sets: "3", reps: "10 reps", focus: "Thighs · glutes", note: "Hold one dumbbell close to your chest. Keep your feet stable and knees tracking in line with your toes." },
      { name: "Deadlift", category: "strength", sets: "3", reps: "10 reps", focus: "Glutes · hamstrings · back", note: "Brace your trunk, hinge at the hips and keep the weight close to your body. Learn the technique with light weight first." },
      { name: "Lat Pulldown", category: "strength", sets: "2", reps: "12 reps", focus: "Back · arms", note: "Pull the bar toward your upper chest without leaning far backwards." },
      { name: "Seated Row", category: "strength", sets: "2", reps: "12 reps", focus: "Mid-back", note: "Pull toward your torso. Avoid shrugging your shoulders or swinging your body." },
      { name: "Hollow Body Hold", category: "core", sets: "2", reps: "15 sec", focus: "Core · pelvic control", note: "Brace your abs and keep your lower back gently pressed into the mat. Bend your knees or raise your legs if your back arches." },
      { name: "Plank", category: "core", sets: "2", reps: "30 sec", focus: "Core stability", note: "Keep your head, shoulders, hips and heels aligned. Brace your core and breathe normally." }
    ]
  },

  planB: {
    summary: "Cardio only · Lighter session",
    activity: "Incline Treadmill",
    durationMinutes: "30",
    guidance: "Moderate intensity: you should be able to talk, but singing should be difficult. Adjust the incline and speed to your fitness level."
  },

  weeklySchedule: [
    { day: "Monday", activity: "Cardio/Gym" },
    { day: "Tuesday", activity: "Rest/Replacement" },
    { day: "Wednesday", activity: "Yoga" },
    { day: "Thursday", activity: "Rest/Replacement" },
    { day: "Friday", activity: "Rest/Replacement" },
    { day: "Saturday", activity: "Cardio/Gym" },
    { day: "Sunday", activity: "Cardio/Gym" }
  ]
};
