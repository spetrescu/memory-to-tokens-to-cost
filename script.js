document.getElementById('memoryInput').addEventListener('input', updateEstimates);
document.getElementById('memoryUnit').addEventListener('change', updateEstimates);

function updateEstimates() {
  const memoryValue = parseFloat(document.getElementById('memoryInput').value);
  const memoryUnit = document.getElementById('memoryUnit').value;

  if (isNaN(memoryValue) || memoryValue <= 0) {
    clearResults();
    return;
  }

  // Convert memory to bytes based on the unit selected
  const memoryInBytes = convertToBytes(memoryValue, memoryUnit);

  // Estimate token count (assuming each token is 2 bytes)
  const bytesPerToken = 2;
  const estimatedTokens = Math.floor(memoryInBytes / bytesPerToken);

  // Estimate character count (assuming 4 characters per token)
  const charactersPerToken = 4;
  const estimatedCharacters = estimatedTokens * charactersPerToken;

  // Calculate the cost (1M tokens = $2.50)
  const costPerMillionTokens = 2.50;
  const estimatedCost = (estimatedTokens / 1e6) * costPerMillionTokens;

  // Generate a small sample text (just a few words) for display
  const sampleText = "Sample text...";

  // Format the token count, character count, and estimated cost for better readability
  const formattedTokens = formatNumber(estimatedTokens);
  const formattedCharacters = formatNumber(estimatedCharacters);
  const formattedCost = formatNumber(estimatedCost);

  // Update the display with estimated values
  document.getElementById('tokenCount').textContent = formattedTokens;
  document.getElementById('characterCount').textContent = formattedCharacters;
  document.getElementById('sampleText').textContent = sampleText;
  document.getElementById('estimatedCost').textContent = formattedCost;
}

// Helper function to convert memory value to bytes based on the selected unit
function convertToBytes(value, unit) {
  switch (unit) {
    case 'MB':
      return value * 1048576;
    case 'GB':
      return value * 1073741824;
    case 'TB':
      return value * 1099511627776;
    default:
      return value;
  }
}

// Helper function to format large numbers with K, M, B suffixes
function formatNumber(value) {
  if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + 'B';
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(2) + 'M';
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(2) + 'K';
  } else {
    return value.toFixed(2); // Keeping two decimal places for small values
  }
}

// Clear results if the input is invalid
function clearResults() {
  document.getElementById('tokenCount').textContent = 0;
  document.getElementById('characterCount').textContent = 0;
  document.getElementById('sampleText').textContent = 'Sample text...';
  document.getElementById('estimatedCost').textContent = '0.00';
}
