export const getCashChange = async (totalPrice: string, cashPaid: string, currency: string) => {
  try {
    const response = await fetch('http://localhost:8080/api/cash-change', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ totalPrice, cashPaidAmount: cashPaid, cashPaidCurrency: currency }),
    });

    return response.json();
  } catch (error) {
    console.error('Error getting cash change:', error);
    return null;
  }
};
