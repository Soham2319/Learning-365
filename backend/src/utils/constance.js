export const DB_NAME = "learningProtal";

export const options = {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const getLoggedUser = (req) => {
    return req.user?.email || null;
};
