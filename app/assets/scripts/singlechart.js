// console.log(poll);
// console.log(poll);
// console.log(poll);
const ctx = document.getElementById(poll._id);

const pieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: poll.data.map(obj => obj.label), // labels
    datasets: [{
      label: poll.title, // title
      data: poll.data.map(obj => obj.count), // data
      borderColor: 'rgba(0, 0, 0, 0.4)',
      backgroundColor: [
        'rgba(255,99,132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(60, 180, 75, 1)',
        'rgba(128, 128, 0, 1)',
        'rgba(230, 190, 255, 1)',
        'rgba(128, 0, 0, 1)',
        'rgba(70, 240, 240, 1)',
        'rgba(255, 215, 180, 1)',
        'rgba(0, 128, 128, 1)',
        'rgba(170, 110, 40, 1)',
        'rgba(245, 130, 48, 1)',
        'rgba(0, 130, 200, 1)',
        'rgba(128, 128, 128, 1)',
        'rgba(255, 250, 200, 1)',
      ],
      borderWidth: 1,
    }],
  },
  options: {
    responsive: false,
    maintainAspectRatio: false,
  },
});
