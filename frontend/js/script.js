document.getElementById('helloBtn').addEventListener('click', async () => {
  const res = await fetch('http://localhost:3000/hello');
  const data = await res.json();
  alert(data.message);
});
