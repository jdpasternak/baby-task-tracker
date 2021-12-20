const tableHeaders = {
  yAxis: [
    "Feed Baby",
    "Take Meds",
    "Diaper (Pee)",
    "Diaper (Poop)",
    "Alcohol Umbilical",
    "Circ Dressing",
    "Drink Water",
    "Take Vitamins",
  ],
  xAxis: [
    "12 AM",
    "1 AM",
    "2 AM",
    "3 AM",
    "4 AM",
    "5 AM",
    "6 AM",
    "7 AM",
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
    "10 PM",
    "11 PM",
  ],
};

const generateTable = () => {
  let html = [`<table class="responsive-table">`];

  // Generate Y-Axis
  html.push(`<thead class="hide-on-med-and-down"><tr><th></th>`);

  for (const x of tableHeaders.xAxis) {
    html.push(`<th>${x}</th>`);
  }

  html.push(`</tr>`);

  //Generate X-Axis
  html.push(`<tbody>`);

  for (const y of tableHeaders.yAxis) {
    html.push(`
            <tr>
                <th>${y}</th>
        `);
    for (const x of tableHeaders.xAxis) {
      html.push(`
                    <td>
                        <label>
                            <input type="checkbox" />
                            <span><span class="hide-on-large-only">${x}</span></span>
                        </label>
                    </td>
            `);
    }
    html.push(`</tr>`);
  }

  html.push(`</tbody></table>`);

  // Join and return
  return html.join("");
};

export { generateTable };
