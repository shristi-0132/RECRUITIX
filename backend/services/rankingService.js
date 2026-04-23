// services/rankingService.js

/**
 * Calculates a score for a student against a job
 * Pure function — no DB calls
 */
function calculateScore(student, job) {
  let score = 0;

  // 1. CGPA match (weight: 40)
  const cgpaWeight = 40;
  const cgpaScore = Math.min(student.cgpa / job.minCgpa, 1) * cgpaWeight;
  score += cgpaScore;

  // 2. Skill overlap (weight: 40)
  const skillWeight = 40;
  const studentSkills = new Set(student.skills.map(s => s.toLowerCase()));
  const jobSkills = job.requiredSkills.map(s => s.toLowerCase());

  let matchCount = 0;
  jobSkills.forEach(skill => {
    if (studentSkills.has(skill)) matchCount++;
  });

  const skillScore = (matchCount / jobSkills.length) * skillWeight;
  score += skillScore;

  // 3. Achievements (weight: 20)
  const achievementWeight = 20;
  const achievementScore = Math.min(student.achievements.length, 5) / 5 * achievementWeight;
  score += achievementScore;

  return score;
}

/**
 * Ranks all candidates for a given job
 */
function rankCandidates(students, job) {
  return students
    .map(student => ({
      ...student,
      score: calculateScore(student, job)
    }))
    .sort((a, b) => b.score - a.score);
}

module.exports = {
  calculateScore,
  rankCandidates
};
