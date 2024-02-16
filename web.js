const copyToClipboard = async () => {
  const text = document.getElementById('output-textarea').value;
  try{
    await navigator.clipboard.writeText(text);
    alert("Copied the text")
  } catch (error) {
    console.error("Error copying text: ", error);
  }
}