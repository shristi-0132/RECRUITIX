/**
 * services/rankingService.js
 * ─────────────────────────────────────────────
 * Ranks a list of student applicants against a
 * specific job's requirements.
 *
 * Called by: applicationController (future)
 * ─────────────────────────────────────────────
 */

/**
 * calculateScore
 * @param {Object} student  - { cgpa, skills (CSV string) }
 * @param {Object} job      - { min_cgpa, skills (CSV string) }
 * @returns {number}        - score between 0 and 100
 */
const calculateScore = (student, job) => {
  let score = 0;

  // ── 1. CGPA component (max 50 points) ─────────────
  const cgpaScore = Math.min((student.cgpa / 10) * 50, 50);
  score += cgpaScore;

  // ── 2. Skill match component (max 50 points) ──────
  const jobSkills     = (job.skills     || '').toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
  const studentSkills = (student.skills || '').toLowerCase().split(',').map(s => s.trim()).filter(Boolean);

  if (jobSkills.length > 0) {
    const matched = studentSkills.filter(skill => jobSkills.includes(skill)).length;
    const skillScore = (matched / jobSkills.length) * 50;
    score += skillScore;
  } else {
    // No skill criteria set — give full skill points
    score += 50;
  }

  return parseFloat(score.toFixed(2));
};

/**
 * rankCandidates
 * @param {Array} applicants  - array of { student_id, cgpa, skills, application_id, ... }
 * @param {Object} job        - { min_cgpa, skills }
 * @returns {Array}           - sorted array with rankingScore added, highest first
 */
const rankCandidates = (applicants, job) => {
  const scored = applicants
    .filter(a => a.cgpa >= (job.min_cgpa || 0))   // eligibility gate
    .map(a => ({
      ...a,
      ranking_score: calculateScore(a, job),
    }));

  // Sort descending by score
  scored.sort((a, b) => b.ranking_score - a.ranking_score);

  // Attach rank position
  scored.forEach((a, i) => { a.ranking_order = i + 1; });

  return scored;
};

module.exports = { calculateScore, rankCandidates };