/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
function scorePassword(pass) {
  let score = 0;
  if (!pass) return score;

  // award every unique letter until 5 repetitions
  const letters = {};

  for (let i = 0; i < pass.length; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1;
    score += 5.0 / letters[pass[i]];
  }

  // bonus points for mixing it up
  const variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass),
  };

  let variationCount = 0;
  for (const check in variations) {
    variationCount += variations[check] == true ? 1 : 0;
  }

  score += (variationCount - 1) * 10;
  return parseInt(score, 10);
}

function checkPassStrength(pass) {
  const score = scorePassword(pass);
  if (score > 80) return { strength: 'قوية', color: '#00CD00' };
  if (score > 60) return { strength: 'متوسطة', color: 'orange' };
  if (score >= 30) return { strength: 'ضعيفة', color: 'red' };

  return '';
}
export default checkPassStrength;
