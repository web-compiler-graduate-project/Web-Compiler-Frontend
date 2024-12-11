export const compileCode = async (code) => {
  try {

    const response = await fetch(`${process.env.REACT_APP_HOST}:3001/compile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ file: code }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error during compilation:', error);
    throw error;
  }
};
