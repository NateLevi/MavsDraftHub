// Calculate age from player's birth date
export function calculateAge(birthDateString) {
  if (!birthDateString) return null;
  const birthDate = new Date(birthDateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// Format height from inches to feet-inches string
export function formatHeight(inches) {
  if (inches == null || isNaN(inches)) {
    return 'N/A'; // Or however you want to display missing/invalid height
  }
  const feet = Math.floor(inches / 12);
  const remainingInches = inches % 12;
  return `${feet}' ${remainingInches}"`;
}

// Convert nationality to country code for ReactCountryFlag
const nationalityToCountryCode = {
USA: 'US',
Bahamas: 'BS',
Lithuania: 'LT',
'South Sudan': 'SS',
Russia: 'RU',
France: 'FR',
Spain: 'ES',
Israel: 'IL',
Canada: 'CA',
Mali: 'ML',
Australia: 'AU',
Croatia: 'HR',
Germany: 'DE',
Senegal: 'SN',
'Dominican Republic': 'DO',
'Trinidad and Tobago': 'TT',
Serbia: 'RS', 
Georgia: 'GE', 
Nigeria: 'NG', 
Slovenia: 'SI',  
};

export function getCountryCode(nationality) {
if (!nationality) return null;
return nationalityToCountryCode[nationality] || null; 
}

// Format season display (e.g., 2024 → "2023-24")
export const formatSeasonDisplay = (seasonValue) => {
if (typeof seasonValue === 'number') {
  return `${seasonValue - 1}-${seasonValue.toString().slice(-2)}`;
}
return seasonValue;
};

// Format stat values
export const formatStatValue = (value) => {
if (value === undefined || value === null || value === 'NaN%') return 'N/A';
return value;
}