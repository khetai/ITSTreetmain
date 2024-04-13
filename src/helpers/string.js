function shortenString(inputString, maxLength) {
  if (typeof inputString !== 'string' || typeof maxLength !== 'number') {
    throw new Error(
      'Invalid input types. Please provide a string and a number.',
    )
  }

  if (inputString.length <= maxLength) {
    return inputString
  } else {
    return inputString.substring(0, maxLength) + '...'
  }
}

export { shortenString }
