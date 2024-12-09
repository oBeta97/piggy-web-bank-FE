export const isoDateTimeToLocalString = (date: string): string => {
    return new Date(date).toLocaleDateString('it-IT', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}