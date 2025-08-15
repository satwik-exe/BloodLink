
export const isEligibleToDonate = ({ age, lastDonationDate, medicalHistory }) => {
  if (age < 18 || age > 65) return { ok: false, reason: 'Age not within eligible range' };
  if (medicalHistory && medicalHistory.toLowerCase().includes('hepatitis')) return { ok: false, reason: 'Medical condition disqualifies' };
  if (lastDonationDate) {
    const last = new Date(lastDonationDate);
    const now = new Date();
    const ms = now - last;
    const days = ms / (1000 * 60 * 60 * 24);
    if (days < 56) return { ok: false, reason: 'Must wait 56 days between donations' };
  }
  return { ok: true };
};
