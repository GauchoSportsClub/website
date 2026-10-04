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
    // alum
    "Bhavya",
    "Satvik",
    "Viraj",
    "Skanda",
    "Tanish",
];
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


























// WARNING: AI

const past_projects = [
    {
	type: "image",
	col: "left",
	src: "./resources/images/jackson_flora.jpg",
    },
    {
	type: "plaque",
	col: "center",
	title: "Project Showcase",
	subtitle: "Gaucho Sports Analytics"
    },
    {
	type: "image",
	col: "right",
	src: "./resources/images/basketball.jpg",
    },
    {
	type: "simple",
	col: "left",
	title: "Analysing Pitch Decay",
	author: "JOE GAUCHO",
	date: "May 2026",
	content: `We set out on this project with a goal of quantifying the concept of "Pitch Decay," where a pitcher's expected run prevention drops due to batter familiarity despite their pitch quality remaining constant. We conducted this study by analyzing college data to quantify the Time Through the Order Penalty (TTOP) and hitter familiarity with specific pitch types. In doing so, we discovered a twist, the pitch decay that pitchers suffer in professional baseball doesn't actually have a meaningful effect on the college game. We concluded this is likely due to college starters having shorter outings and facing a completely different competitive landscape.`
    },
    {
	type: "feature",
	col: "center",
	title: "Soccer Computer Vision Pipeline ",
	author: "JOE GAUCHO",
	date: "June 2026",
	content: `This project focused on adapting an existing soccer computer vision pipeline to work on UCSB game footage. We began with Roboflow's open-source sports repository, which provides components for player, ball, and pitch detection as well as player tracking, team classification, and a bird's-eye radar visualization.
<br/><br/>
Initial testing revealed that models trained on professional-style soccer footage did not transfer cleanly to our games. Player detections would sometimes disappear, tracking IDs could change as players crossed paths, and pitch keypoint detection was unreliable when field markings were blurry or partially visible. These issues became especially noticeable during fast camera movement and in clips with lower image quality.

We first tested and modified the existing pipeline to better understand where the failures occurred. One branch of the project focused on the complete Roboflow pipeline, including player detection, ByteTrack player tracking, team classification, pitch detection, and radar projection. For pitch detection, we added confidence filtering so that detected pitch keypoints below a 0.75 confidence threshold were discarded rather than being passed into later stages of the pipeline.

The main limitation, however, appeared to be the detection models themselves. To better match our footage, we created a custom dataset using frames from UCSB games against UC Irvine, UC Davis, Sacramento State, and Cal State Fullerton. More than 1,300 screenshots were extracted from the footage and divided among team members for annotation. We created separate datasets for player and pitch detection and used them to train models on footage much closer to our actual deployment setting.
<br/><br/>
For player detection, the original model achieved an 81.5% mAP@50, 88.5% precision, 78.3% recall, and 83.1% F1 score. After training on our complete annotated dataset, performance increased to 84.4% mAP@50, 90.9% precision, 79.0% recall, and 84.5% F1 score.

We also evaluated the custom player model on clips outside of its training data. Qualitatively, it was more robust than the original model during difficult camera movement: detections could still become unstable during fast pans, but players were less likely to disappear completely.

To improve temporal consistency, a separate player-processing pipeline was built around the custom Roboflow model. It sends frame-level detections through BoT-SORT, which assigns persistent tracker IDs, removes unconfirmed tracks, and then applies Roboflow Supervision's DetectionsSmoother before rendering the final video. The current repository uses version 3 of our Roboflow player model, trained on all of the annotated games.
<br/><br/>
Overall, the project showed how strongly sports computer vision models depend on the distribution of their training data. Rather than relying entirely on models trained on cleaner broadcast footage, we collected and annotated data representative of UCSB soccer games, retrained the underlying detectors, and tested different approaches for making player and pitch detections more stable over time.`
    },
    {
	type: "column",
	col: "right",
	title: "Transfer Player Evaluation",
	author: "JOE GAUCHO",
	date: "February 2026",
	content: `In our transfer player evaluation project, we set out to quantify lower-league hitters' "readiness" to transition to D1 baseball using the limited statistics available at the D2, D3, and JUCO levels. We built this tool by pulling and cleaning historical data on successfully transitioned players to train a Random Forest model. Doing so allowed us to project a transferring player's D1 xwOBA and output a 0-100 readiness score based on their production, discipline, and durability. We delivered an interactive dashboard that allows lesser-known players to be evaluated and filtered into division leaderboards.`
    },
    {
	type: "image",
	col: "left",
	src: "./resources/images/soccer_celebration.jpg",
    },
    {
	type: "image",
	col: "right",
	src: "./resources/images/baseball.jpg",
    },
    // {
	// type: "simple",
	// col: "left",
	// title: "Predicting The 2026 Pitch: A Monte Carlo Simulation",
	// author: "JOE GAUCHO",
	// date: "May 2026",
	// content: `Applying custom Elo ratings and regression models to international datasets provides a unique window into future tournament outcomes. By structuring a 45-to-60-minute interactive workshop, we established a pipeline utilizing Poisson distributions to simulate match frequencies and potential upsets. This statistical modeling allows us to run thousands of bracket permutations, identifying edge cases and mathematically probable underdogs long before the first whistle blows on the global stage.`
    // },
    // {
	// type: "image",
	// src: "./resources/images/soccer_celebration.jpg",
    // },
];
// shuffle(past_projects);

const clipping_templates = {
    feature: (project) => `
		<div class="news-headline">${project.title}</div>
		<!-- <div style="font-style: italic; margin-bottom: 10px;">by: ${project.author} - published: ${project.date}</div> -->
		<div class="news-body">${project.content}</div>
	    `,
    simple: (project) => `
		<div class="news-headline">${project.title}</div>
		<div class="news-body">${project.content}</div>
	    `,
    column: (project) => `
		<div class="news-headline">${project.title}</div>
		<div class="news-body">
		    ${project.content}
		</div>
	    `,
    image: (project) => `
		<img src=${project.src} class='news-image'  />
	    `,
    plaque: (project) => `
	<div class="plaque-border">
	    <div class="screw top-left"></div>
	    <div class="screw top-right"></div>
	    <div class="screw bottom-left"></div>
	    <div class="screw bottom-right"></div>
	    <h1 class="plaque-title">${project.title}</h1>
	    <h2 class="plaque-subtitle">${project.subtitle}</h2>
	</div>
    `,
};

function create_clipping_content(project)
{
    if (project.type in clipping_templates == false)
	return ``;

    const html_content = clipping_templates[project.type](project);

    // TODO: add stuff

    return html_content;
}

function render_clippings() {
    const board = $(".project-board");

    for (const project of past_projects) {
	const random_angle = random(-3, 3);
	const clipping = $("<div>", {
	    class: `news-clipping template-${project.type}`,
	    html: `<div class="clipping-inner" style="transform: rotate(${random_angle}deg)">
		       ${create_clipping_content(project)}
		   </div>`
	});
	board.find(`.col-${project.col}`).append(clipping);
    };
}

// Call the function to build the board
$(document).ready(function() {
    render_clippings();
});

