/**
 * Utility function to simulate long requests for manual testing
 */
export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
