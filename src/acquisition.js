import { Chart } from 'chart.js/auto';
import data from '../data.json'

function printBalance() {
  USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  
  var wallet = data.map(row => row.amount)
  var myBalance = 0;
  
  wallet.forEach(amount => {
    myBalance += amount;
  });

  myBalance = USDollar.format(myBalance);
  document.getElementById('myBalance').innerHTML = myBalance;
}

printBalance();

(async function() {
  const today = new Date().getDay()
  function checkDay(day) {
    const color = [];
    
    for (let x = 0; x < 7; x++) {
      color[x] = 'hsl(10, 79%, 65%)';

      if(day[x] == (today + 1)) {
        color[x] = 'hsl(186, 34%, 60%)';
      }
    }
    return color;
  }

  new Chart(
    document.getElementById('acquisitions'),
    {
      type: 'bar',
      options: {
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            ticks: {
              display: false
            },
            grid: {
              display: false
            }
          },

        },
        interaction: {
          mode: "x",
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                  let label = context.dataset.label || '';

                  if (label) {
                      label += ': ';
                  }
                  if (context.parsed.y !== null) {
                      label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                  }
                  return label;
              },
            }
          }
        }
      },
      data: {
        labels: data.map(row => row.day.name),
        datasets: [
          {
            label: 'Acquisitions by day',
            data: data.map(row => row.amount),
            backgroundColor: checkDay(data.map(row => row.day.number))
          }
        ]
      }
    }
  );
})();
