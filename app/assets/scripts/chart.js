const container = document.getElementById('polls-container');

const listPolls = (data, callback) => {
  data.forEach((poll) => {
    // container.innerHTML += '<canvas id="' + poll._id +  '" width="420" height="420"></canvas><div id="view' + poll._id + '" class="poll_view"><a href="/polls/' + poll._id + '">View</a></div>';
    container.innerHTML += '<div class="flex-container__list"><div class="chart__title">' + poll.title + '</div><canvas id="' + poll._id +  '" width="420" height="420"></canvas><div id="view' + poll._id + '" class="chart__view"><a href="/polls/' + poll._id + '">View</a></div>';
  });
  callback(data);
};

const beautiful = (poll) => {
  const labels = [];
  const data = [];
  poll.data.forEach((obj) => {
    labels.push(obj.label);
    data.push(obj.count);
  });
  return {
    title: poll.title,
    labels,
    data,
  };
};

const populateChart = (data) => {
  data.forEach((poll) => {
    const ctx = document.getElementById(poll._id);
    const pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: beautiful(poll).labels, // labels
        datasets: [{
          label: beautiful(poll).title, // title
          data: beautiful(poll).data, // data
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

  });
};

axios.get('/polls/api/mine')
  .then((res) => {
    listPolls(res.data, populateChart);
  })
  .catch((err) => {
    console.log(err);
  });
