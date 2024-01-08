export function convertTimeFormat(timestamp) {
    const dtObject = new Date(timestamp);
  
    // Format the time in 12-hour clock format with AM/PM
    const formattedTime = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    }).format(dtObject);
  
    return formattedTime;
  }
  
  // Example usage
  const inputTimestamp = "2024-01-08T08:51:00.480165+00:00";
  const outputTime = convertTimeFormat(inputTimestamp);
  console.log(outputTime);
  