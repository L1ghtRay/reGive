document.getElementById('helloBtn').addEventListener('click', async () => {
  const res = await fetch('/');
  const data = await res.json();
  alert(data.message);
});
