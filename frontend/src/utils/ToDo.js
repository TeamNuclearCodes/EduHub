const diffInDays = (endDate) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return Math.floor((endDate - currentDate) / (24 * 60 * 60 * 1000));
};

export {diffInDays}