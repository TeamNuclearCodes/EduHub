const diffInDays = (endDate) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return Math.floor((endDate - currentDate) / (24 * 60 * 60 * 1000));
};

const genDeadline = (date) => {
    console.log(date.substr(0,10).split('-')[1])
    let deadline = date.substr(0, 10).split('-').reverse().join('-')
    return deadline
  }

export {diffInDays,genDeadline}