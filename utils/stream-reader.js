/**
 * 读取ReadableStream中的所有数据并返回数组
 * @param stream - 要读取的ReadableStream
 * @returns 包含所有数据的数组
 */
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
    }
    finally {
        reader.releaseLock();
    }
    return result;
}
//# sourceMappingURL=stream-reader.js.map