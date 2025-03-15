export interface DisclosureSubmission {
  opportunityId: string;
  content: string;
}

// Simulate an API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Service for handling security disclosure submissions
 */
export const disclosureService = {
  /**
   * Submit a security disclosure
   * @param opportunityId ID of the opportunity the disclosure is for
   * @param content Markdown content of the disclosure
   * @returns Promise that resolves when submission is complete
   */
  async submitDisclosure(opportunityId: string, content: string): Promise<void> {    
    // Simulate API delay
    await delay(1500);
    
    // Create disclosure submission
    const submission: DisclosureSubmission = {
      opportunityId,
      content
    };
    
    // TODO: Send the data to the backend
    console.log('Disclosure submitted successfully:', submission);
  }
}; 
