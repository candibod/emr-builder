import { PDFWorker } from "pdfjs-dist";

export default function getFormattedTime(time: string): string {
  if (!time || time.length == 0) {
    return "";
  }

  let strArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let utcDate = time;
  let localDate = new Date(utcDate);
  let hr = localDate.getHours();
  let zone = "am";

  if (hr > 12) {
    hr -= 12;
    zone = "pm";
  }

  let formattedString = localDate.getDate() + "-" + strArray[localDate.getMonth()] + "-" + localDate.getFullYear() + " " + hr + ":" + localDate.getMinutes() + zone;

  return formattedString;
}

export const extractTextFromPDF = async (file: any): Promise<any> => {
  const pdfJS = await import("pdfjs-dist");

  pdfJS.GlobalWorkerOptions.workerSrc = window.location.origin + "/workers/pdf.worker.min.mjs";

  // Create a blob URL for the PDF file
  const blobUrl = URL.createObjectURL(file);

  // Load the PDF file
  const loadingTask = pdfJS.getDocument(blobUrl);

  let extractedText = "";
  let hadParsingError = false;
  try {
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;

    // Iterate through each page and extract text
    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => ("str" in item ? item.str : "")).join(" ");
      extractedText += pageText;
    }
  } catch (error) {
    hadParsingError = true;
    console.error("Error extracting text from PDF:", error);
  }

  // Clean up the blob URL
  URL.revokeObjectURL(blobUrl);

  // Free memory from loading task
  loadingTask.destroy();

  if (!hadParsingError) {
    return extractedText;
  }
};
