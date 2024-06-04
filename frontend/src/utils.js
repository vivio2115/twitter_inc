// src/utils.js
export const verifiedUsers = [
    "665f35adf243be6874dd2550",
    "665f350f5047cc8a5ab262a1",
    "665f8a4afc9b39657ec73d92",
];

export const isVerified = (userId) => verifiedUsers.includes(userId);
