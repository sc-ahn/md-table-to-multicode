const copyToClipboard = async () => {
  const value = document.getElementById('output-textarea').value;
  if (!value) {
    // no value to copy
    return;
  }
  try{
    await navigator.clipboard.writeText(value);
    alert("Copied the text")
  } catch (error) {
    console.error("Error copying text: ", error);
  }
}