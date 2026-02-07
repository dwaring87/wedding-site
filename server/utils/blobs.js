const toBase64 = async (blob) => {
  try {
    const arrayBuffer = await blob.arrayBuffer();
 
    // Step 3: Convert ArrayBuffer to Buffer
    const buffer = Buffer.from(arrayBuffer);
 
    // Step 4: Convert Buffer to Base64 string
    const base64String = buffer.toString('base64');
 
    return base64String;
  } catch (error) {
    console.error('Error converting Blob to Base64:', error);
    throw error;
  }
}

export { toBase64 }