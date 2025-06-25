export function convertDate(d: string) {
    const isoString: string = d;
    const date: Date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = {
      weekday:'long',  
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate: string = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }
