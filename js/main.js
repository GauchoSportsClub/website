"use strict";

const bg_image = $(".bg-image").eq(0);
const bg_solid = $(".bg-solid");
const header = $(".header");
const hero = $(".hero")
const card = $(".card")
const card_middle_initial = card.offset().top + card.outerHeight() / 2
      - $(window).outerHeight() / 2;

// Fade background from image to solid
$(window).on("scroll", () => {
    const card_middle = card.offset().top + card.outerHeight() / 2
	  - $(window).outerHeight() / 2 - $(window).scrollTop();
    const opacity = 1 - card_middle / card_middle_initial;
    const ease = bezier(0.75, 0, 0.5, 1);
    const final_opacity = ease(clamp(opacity, 0, 1));
    // const final_opacity = 0.33 * (1 + ease(clamp(opacity, 0, 1)));
    bg_solid.css("opacity", final_opacity);
});

// Make header background solid on solid bg and transparent on image bg
$(window).on("scroll", () => {
    const card_middle = card.offset().top + card.outerHeight() / 2
	  - $(window).outerHeight() / 2 - $(window).scrollTop();
    if (card_middle <= 3) { // seems to be about 1.8
	header.css("background-color", "rgb(var(--background))");
    } else {
	header.css("background-color", "transparent");
    }
});

// Insert scorecard table with projects
const project_overviews = [
    {
	partner: "UCSB Baseball",
	quarters: "FWS",
	project: "Pitch Sequencing",
	status: "LIVE",
    },
    {
	partner: "Women's Basketball",
	quarters: "W",
	project: "Analytics Dashboard",
	status: "DONE",
    },
    {
	partner: "Men's Soccer",
	quarters: "WS",
	project: "ML Set Peice Analysis",
	status: "WIP",
    },
    {
	partner: "Men's Basketball",
	quarters: "W",
	project: "Analytics Dashboard",
	status: "DONE",
    },
    {
	partner: "KCSB 91.9 FM",
	quarters: "FW",
	project: "Live Broadcast Stats",
	status: "LIVE",
    },
    // {
    // 	partner: "",
    // 	quarters: "FWS",
    // 	project: "",
    // 	status: "",
    // },
];
for (const row of project_overviews) {
    $(".ledger").append(`
      <tr>
	<td class="team">${row.partner}</td>
	<td class="check">${row.quarters.indexOf("F") > -1 ? "#" : "-"}</td>
	<td class="check">${row.quarters.indexOf("W") > -1 ? "#" : "-"}</td>
	<td class="check">${row.quarters.indexOf("S") > -1 ? "#" : "-"}</td>
	<td>${row.project}</td>
	<td class="status">${row.status}</td>
      </tr>
    `);
}

// Insert current and past officers as lineup
const names = [
    "Quentin",
    "Diego",
    "Theresa",
    "Sid",
    "Jose",
    "Joey",
    "BK",
    "Quinn",
    "Aaron",
    "Prithvi",
    "Bhavya",
    "Satvik",
    "Viraj",
    "Skanda",
    "Tanish",
].sort();
const lineups = $(".lineups");
const num_cols = lineups.children().length;
const lineup_cols = [];
const names_per_col = Math.floor(names.length / num_cols);
const leftovers = names.length - num_cols * names_per_col;
let n = 0;
for (let i = 0; i < num_cols; ++i) {
    const col = lineups.children().eq(i);
    let num_names = names_per_col;
    if (i < leftovers - 1)
	++num_names;

    for (let j = 0; j < num_names; ++j) {
	$("<p/>", {
	    text: names[n++],
	}).appendTo(col);
    }
}
