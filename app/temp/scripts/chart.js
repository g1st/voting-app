const listPolls = (data) => {
  const container = document.getElementById('polls-container');
  data.forEach((poll) => {
    console.log(poll);
  });
};

// const ctx = document.getElementById('pieChart');
// const ctx2 = document.getElementById('pieChart2');
axios.get('/polls/mine')
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

const pieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Red', 'Blue', 'Yellow'], // labels
    datasets: [{
      label: '# of Votes', // title
      data: [1, 2, 3], // data
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
    responsive: true,
    maintainAspectRatio: false,
  },
});
