const resetHourUTC = 17;
const dayInMilliseconds = 86_400_000;

export const getMillisecondsUntilReset = () => {
    const now = new Date();
    const nowHourUTC = now.getUTCHours();
    if (nowHourUTC === resetHourUTC) {
        return dayInMilliseconds;
    } else if (nowHourUTC < resetHourUTC) {
        const todayReset = new Date(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            resetHourUTC
        );
        return todayReset.getTime() - now.getTime();
    } else if (nowHourUTC > resetHourUTC) {
        const tomorrowReset = new Date(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() + 1,
            resetHourUTC
        );
        return tomorrowReset.getTime() - now.getTime();
    }
};
