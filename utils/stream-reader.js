export async function readStreamToArray(stream) {
  const reader = stream.getReader();
  const result = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      if (value !== undefined && value !== null) {
        result.push(value);
      }
    }
  } finally {
    reader.releaseLock();
  }
  return result;
}
//# sourceMappingURL=stream-reader.js.map
